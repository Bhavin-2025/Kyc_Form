// frontend/src/form/SummaryView.jsx

import React, { useEffect, useState } from "react";
import { Button, Descriptions, Card, Divider, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchKycData,
  handleChangeCurrentPanel,
} from "../features/kyc/kycSlice";
import axiosInstance from "../api/axiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SummaryView = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.user._id);
  const { basicDetails, loading } = useSelector((state) => state.kyc);
  const [masterData, setMasterData] = useState({});

  useEffect(() => {
    if (!basicDetails && userId) {
      dispatch(fetchKycData(userId))
        .unwrap()
        .catch((error) => {
          if (error !== "Not Found") {
            message.error(`Failed to load KYC data: ${error}`);
          }
        });
    }

    const fetchMasterData = async () => {
      try {
        const [
          categoryRes,
          businessTypeRes,
          countryRes,
          departmentRes,
          termRes,
          roleRes,
          addressTypeRes,
          countryAddressRes,
        ] = await Promise.all([
          axiosInstance.get("master/category"),
          axiosInstance.get("master/businessType"),
          axiosInstance.get("master/country"),
          axiosInstance.get("master/department"),
          axiosInstance.get("master/terms"),
          axiosInstance.get("master/roles"),
          axiosInstance.get("master/addressTypes"),
          axiosInstance.get("master/countryAddress"),
        ]);

        const masterDataMap = {};

        [
          { data: categoryRes.data, key: "category" },
          { data: businessTypeRes.data, key: "businessType" },
          { data: countryRes.data, key: "country" },
          { data: departmentRes.data, key: "department" },
          { data: termRes.data, key: "term" },
          { data: roleRes.data, key: "role" },
          { data: addressTypeRes.data, key: "addressType" },
          { data: countryAddressRes.data, key: "countryAddress" },
        ].forEach(({ data, key }) => {
          masterDataMap[key] = {};
          data.forEach((item) => {
            masterDataMap[key][item.value] = item.label;
          });
        });

        setMasterData(masterDataMap);
      } catch (err) {
        console.error("Error fetching master data:", err);
        message.error("Failed to load reference data");
      }
    };

    fetchMasterData();
  }, [dispatch, userId, basicDetails]);

  const getLabel = (type, value) => {
    if (!value) return "N/A";
    return masterData[type]?.[value] || value;
  };

  const downloadPdf = async () => {
    const doc = new jsPDF();

    try {
      const logo = "/assets/ak-gem.png";
      const img = new Image();
      img.src = logo;
      await new Promise((res) => (img.onload = res));
      doc.addImage(img, "PNG", 14, 8, 10, 10);
    } catch (e) {
      console.warn("Logo not loaded", e);
    }

    // Title
    doc.setFontSize(18);
    doc.text("KYC Summary Report", 60, 20);
    doc.setFontSize(12);

    // Section 1: Basic Details
    autoTable(doc, {
      startY: 30,
      head: [["Category Details", "Value"]],
      body: [
        ["Category", getLabel("category", basicDetails.category)],
        ["Company/Individual", basicDetails.companyIndividual || "N/A"],
        ["Business", getLabel("businessType", basicDetails.business)],
        ["GST", basicDetails.gst || "N/A"],
        // [
        //   "Birth Date",
        //   basicDetails.birthDate
        //     ? new Date(basicDetails.birthDate).toLocaleDateString()
        //     : "N/A",
        // ],
        [
          "Registration Date",
          basicDetails.registrationDate
            ? new Date(basicDetails.registrationDate).toLocaleDateString()
            : "N/A",
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [107, 93, 199] }, // purple
    });

    // Section 2: Contact Info
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Contact Detail", "Value"]],
      body: [
        ["Primary Contact", basicDetails.primaryContact || "N/A"],
        ["Primary Email", basicDetails.primaryEmail || "N/A"],
        ["Secondary Email", basicDetails.secondaryEmail || "N/A"],
        [
          "Birth Date",
          basicDetails.birthDate
            ? new Date(basicDetails.birthDate).toLocaleDateString()
            : "N/A",
        ],
        [
          "Mobile",
          `${basicDetails.mobile?.countryCode || ""} ${
            basicDetails.mobile?.number || "N/A"
          }`,
        ],
        [
          "Phone",
          [
            basicDetails.phone?.cc,
            basicDetails.phone?.ndc,
            basicDetails.phone?.number,
          ]
            .filter(Boolean)
            .join("-") || "N/A",
        ],
        [
          "Fax",
          [
            basicDetails.fax?.cc,
            basicDetails.fax?.ndc,
            basicDetails.fax?.number,
          ]
            .filter(Boolean)
            .join("-") || "N/A",
        ],
        ["Sales Person Country", basicDetails.salesPersonCountry || "N/A"],
        ["Assistant Sales Person", basicDetails.assistantSalesPerson || "N/A"],
        ["Remark", basicDetails.remark || "N/A"],
        ["Department", getLabel("department", basicDetails.department)],
      ],
      theme: "striped",
      headStyles: { fillColor: [52, 152, 219] }, // blue
    });

    // Section 3: Terms Details
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Term Details", "Value"]],
      body: [
        ["Currency", basicDetails.currency || "N/A"],
        ["Day Term", basicDetails.dayTerm || "N/A"],
        ["Term Name", basicDetails.termName || "N/A"],
        ["Ext %", basicDetails.ext || "N/A"],
        ["Rap %", basicDetails.rap || "N/A"],
        ["Extra %", basicDetails.extra || "N/A"],
        ["Party", basicDetails.party || "N/A"],
        ["Credit Limit", basicDetails.creditLimit || "N/A"],
        ["Memo Limit", basicDetails.memoLimit || "N/A"],
        ["Broker", basicDetails.broker || "N/A"],
      ],
      theme: "striped",
      headStyles: { fillColor: [39, 174, 96] }, // green
    });

    // Section 4: User Details
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["User Details", "Value"]],
      body: [
        ["Term", getLabel("term", basicDetails.term)],
        ["Role", getLabel("role", basicDetails.role)],
        ["Username", basicDetails.username || "N/A"],
        ["Email", basicDetails.email || "N/A"],
        ["Mobile Login", basicDetails.mobileLogin || "N/A"],
        ["Location", basicDetails.location || "N/A"],
      ],
      theme: "striped",
      headStyles: { fillColor: [231, 76, 60] }, // red
    });

    // Section 5: Locations
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Disounts in Offices", "Value"]],
      body: [
        ["Mumbai", basicDetails.mumbai || "N/A"],
        ["Hong Kong", basicDetails.hongkong || "N/A"],
        ["New York", basicDetails.newyork || "N/A"],
        ["Belgium", basicDetails.belgium || "N/A"],
      ],
      theme: "striped",
      headStyles: { fillColor: [155, 89, 182] }, // violet
    });

    // Section 6: Addresses
    if (basicDetails.addresses && basicDetails.addresses.length > 0) {
      basicDetails.addresses.forEach((addr, i) => {
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 10,
          head: [[`Address ${i + 1}`, ""]],
          body: [
            ["Address Type", getLabel("addressType", addr.addressType)],
            ["Company Name", addr.companyName || "N/A"],
            ["Contact No", addr.contactNo || "N/A"],
            ["Unit", addr.unit || "N/A"],
            ["Building", addr.building || "N/A"],
            ["Street", addr.street || "N/A"],
            ["Landmark", addr.landmark || "N/A"],
            ["Area", addr.area || "N/A"],
            ["City", addr.city || "N/A"],
            ["State", addr.state || "N/A"],
            ["Country", getLabel("countryAddress", addr.countryAddress)],
            ["Postal Code", addr.postalCode || "N/A"],
          ],
          theme: "striped",
          headStyles: { fillColor: [243, 156, 18] }, // orange
        });
      });
    }

    // Footer
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save("KYC_Summary.pdf");
  };

  if (loading) {
    return <div className="p-8 text-center">Loading KYC data...</div>;
  }

  if (!basicDetails) {
    return <div className="p-8 text-center">No KYC data available</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-center text-[#6B5DC7]">
        KYC Summary
      </h1>

      {/* Basic Details */}
      <Card
        title={<span className="font-semibold text-lg">📋 Basic Details</span>}
        className="mb-6 shadow-md rounded-lg"
      >
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Category">
            {getLabel("category", basicDetails.category)}
          </Descriptions.Item>
          <Descriptions.Item label="Business Type">
            {getLabel("businessType", basicDetails.business)}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {getLabel("country", basicDetails.country)}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {getLabel("department", basicDetails.department)}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile">
            {basicDetails.mobile?.number || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {basicDetails.email || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Terms Details */}
      <Card
        title={<span className="font-semibold text-lg">💰 Terms Details</span>}
        className="mb-6 shadow-md rounded-lg"
      >
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Currency">
            {basicDetails.currency || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Day Term">
            {basicDetails.dayTerm || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Party">
            {basicDetails.party || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Broker">
            {basicDetails.broker || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* User Details */}
      <Card
        title={<span className="font-semibold text-lg">👤 User Details</span>}
        className="mb-6 shadow-md rounded-lg"
      >
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Term">
            {getLabel("term", basicDetails.term)}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {getLabel("role", basicDetails.role)}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {basicDetails.username || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {basicDetails.email || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Address Details */}
      {basicDetails.addresses && basicDetails.addresses.length > 0 && (
        <Card
          title={
            <span className="font-semibold text-lg">🏠 Address Details</span>
          }
          className="mb-6 shadow-md rounded-lg"
        >
          <Descriptions bordered column={2} size="middle">
            <Descriptions.Item label="Address Type">
              {getLabel("addressType", basicDetails.addresses[0].addressType)}
            </Descriptions.Item>
            <Descriptions.Item label="Company Name">
              {basicDetails.addresses[0].companyName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {getLabel(
                "countryAddress",
                basicDetails.addresses[0].countryAddress
              )}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {basicDetails.addresses[0].state || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {basicDetails.addresses[0].city || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Postal Code">
              {basicDetails.addresses[0].postalCode || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <Divider />

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          type="primary"
          className="!bg-[#6B5DC7] !hover:bg-[#5746b8] !transition !duration-300 !font-semibold !w-[150px] !py-3 !rounded-lg !text-white shadow-md"
          onClick={downloadPdf}
        >
          Download PDF
        </Button>

        <Button
          className="!bg-[#F5F5F5] !hover:bg-[#E2E2E2] !transition !duration-300 !font-semibold !w-[150px] !py-3 !rounded-lg !text-gray-700 shadow-sm"
          onClick={() => dispatch(handleChangeCurrentPanel(1))}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SummaryView;
