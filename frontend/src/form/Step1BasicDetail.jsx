import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Space } from "antd";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import {
  saveKyc,
  fetchKycData,
  resetBasicDetails,
  handleChangeCurrentPanel,
} from "../features/kyc/kycSlice";
import moment from "moment";

const Step1BasicDetail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const variant = Form.useWatch("variant", form);

  // Master data state
  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [salesPerson, setSalesPerson] = useState([]);
  const [assistantSalesPerson, setAssistantSalesPerson] = useState([]);

  // Track if all master data is loaded
  const [masterDataLoaded, setMasterDataLoaded] = useState(false);

  // Get user ID and KYC data from Redux
  const userId = useSelector((state) => state.auth.user.user._id);
  const { basicDetails, loading } = useSelector((state) => state.kyc);

  // Fetch master data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Use Promise.all to fetch all data in parallel
        const [
          categoryRes,
          businessRes,
          countryRes,
          deptRes,
          salesPerRes,
          assistantSalesPerRes,
        ] = await Promise.all([
          axiosInstance.get("/master/category"),
          axiosInstance.get("/master/businessType"),
          axiosInstance.get("/master/country"),
          axiosInstance.get("/master/department"),
          axiosInstance.get("/master/salesPerson"),
          axiosInstance.get("/master/assistantSalesPerson"),
        ]);

        setCategories(categoryRes.data);
        setBusinessTypes(businessRes.data);
        setCountries(countryRes.data);
        setDepartments(deptRes.data);
        setSalesPerson(salesPerRes.data);
        setAssistantSalesPerson(assistantSalesPerRes.data);

        // Set flag when all master data is loaded
        setMasterDataLoaded(true);
      } catch (err) {
        console.error("Error fetching options", err);
        message.error("Failed to load master data");
      }
    };
    fetchOptions();
  }, []);

  // Fetch KYC data if not in Redux

  // Submit handler
  const onFinish = async (values) => {
    try {
      let payload = { ...values, userId };

      // Transform mobile
      if (
        typeof values.mobile === "string" ||
        typeof values.mobile === "number"
      ) {
        payload.mobile = {
          countryCode: "+91",
          number: String(values.mobile).trim(),
        };
      }

      // Transform phone
      if (values.phone) {
        payload.phone = {
          cc: values.phone.cc || undefined,
          ndc: values.phone.ndc || undefined,
          number: values.phone.number || undefined,
        };
      }

      // Transform fax
      if (values.fax) {
        payload.fax = {
          cc: values.fax.cc || undefined,
          ndc: values.fax.ndc || undefined,
          number: values.fax.number || undefined,
        };
      }

      // Transform dates
      if (values.birthDate?.toISOString) {
        payload.birthDate = values.birthDate.toISOString();
      }
      if (values.registrationDate?.toISOString) {
        payload.registrationDate = values.registrationDate.toISOString();
      }

      // Modified/New Code - Use Redux thunk to save data
      const resultAction = await dispatch(saveKyc(payload));

      if (saveKyc.fulfilled.match(resultAction)) {
        message.success("KYC Saved Successfully");
        // Navigate to next step if "Save & Next" was clicked
        if (values.nextStep) {
          dispatch(handleChangeCurrentPanel(2)); // Adjust path as needed
        }
      } else {
        throw new Error(resultAction.error?.message || "Save failed");
      }
    } catch (err) {
      console.error("Save KYC Error:", err);
      message.error(
        err.response?.data?.message || err.message || "Save failed"
      );
    }
  };

  const onFinishFailed = (err) => {
    console.log("Validation Failed:", err);
    message.error("Please correct the errors before submitting.");
  };

  // Modified/New Code
  // Handle reset button
  const handleReset = () => {
    form.resetFields();
    dispatch(resetBasicDetails());
    message.success("Form has been reset");
  };

  // Modified/New Code
  // Handle Save & Next button
  const handleSaveAndNext = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish({ ...values, nextStep: true });
      })
      .catch((err) => {
        onFinishFailed(err);
      });
  };

  // Modified/New Code
  // Handle Save button
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((err) => {
        onFinishFailed(err);
      });
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchKycData(userId))
        .unwrap()
        .catch((error) => {
          // Only show error message for non-404 errors
          if (error !== "Not Found") {
            message.error(`Failed to load KYC data: ${error}`);
          }
        });
    }
  }, [dispatch, userId]);

  // Populate form with data from Redux when available
  // Modified/New Code - Wait for master data to be loaded before setting form values
  useEffect(() => {
    if (basicDetails && masterDataLoaded) {
      console.log("Setting form values with:", basicDetails);

      // Transform dates from ISO strings to moment objects for DatePicker
      const formData = {
        ...basicDetails,
        birthDate: basicDetails.birthDate
          ? moment(basicDetails.birthDate)
          : undefined,
        registrationDate: basicDetails.registrationDate
          ? moment(basicDetails.registrationDate)
          : undefined,
        // Transform phone and fax from objects to form structure
        phone: basicDetails.phone
          ? {
              cc: basicDetails.phone.cc,
              ndc: basicDetails.phone.ndc,
              number: basicDetails.phone.number,
            }
          : undefined,
        fax: basicDetails.fax
          ? {
              cc: basicDetails.fax.cc,
              ndc: basicDetails.fax.ndc,
              number: basicDetails.fax.number,
            }
          : undefined,
        // Transform mobile from object to string for the form
        mobile: basicDetails.mobile?.number || basicDetails.mobile,
      };

      // Set form values after a short delay to ensure select options are loaded
      setTimeout(() => {
        form.setFieldsValue(formData);
      }, 200);
    }
  }, [basicDetails, form, masterDataLoaded]);

  return (
    <div className="px-6">
      <Form
        form={form}
        variant={variant || "outlined"}
        // initialValues={formData}
        layout="vertical"
      >
        {/* Category Details */}
        <div className="flex border-b border-[#D9D9D9]  mt-5">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Category Details</p>
            <div className="flex item-center gap-2 mt-1">
              <p className="flex items-center text-xs font-medium">
                Party Code
              </p>
              <span className=" bg-[#6B5DC7] text-white font-medium px-2.5 py-1.5 rounded-lg text-sm">
                P123456
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <SelectField
                  placeholder="Select Category"
                  options={categories.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                  // Modified/New Code - Add loading state
                  loading={!masterDataLoaded}
                />
              </Form.Item>

              <Form.Item
                label="Company/Individual"
                name="companyIndividual"
                rules={[
                  { required: true, message: "Please enter name!" },
                  { min: 3, message: "Must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Only letters and spaces allowed",
                  },
                ]}
              >
                <InputField placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                label="Business Type"
                name="business"
                rules={[
                  { required: true, message: "Please select business type!" },
                ]}
              >
                <SelectField
                  placeholder="Select Business Type"
                  options={businessTypes.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="GST No"
                name="gst"
                rules={[
                  { required: true, message: "Please enter GST No" },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Enter a valid GSTIN (15 characters)",
                  },
                ]}
              >
                <InputField placeholder="Enter GST No" />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex mt-5 border-b border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Contact Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Primary Contact"
                name="primaryContact"
                rules={[
                  { required: true, message: "Please enter primary contact!" },
                  { min: 3, message: "Must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Only letters and spaces allowed",
                  },
                ]}
              >
                <InputField placeholder="Enter Primary Contact" />
              </Form.Item>

              <Form.Item
                label="Primary Email"
                name="primaryEmail"
                rules={[
                  { required: true, message: "Please enter email!" },
                  { type: "email", message: "Enter valid email address" },
                ]}
              >
                <InputField placeholder="Enter Primary Email" type="email" />
              </Form.Item>

              <Form.Item
                label="Secondary Email"
                name="secondaryEmail"
                rules={[
                  { type: "email", message: "Enter valid email address" },
                ]}
              >
                <InputField placeholder="Enter Secondary Email" type="email" />
              </Form.Item>

              <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[
                  { required: true, message: "Please select Birth Date" },
                ]}
              >
                <DatePicker placeholder="Select Birth Date" size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please select country!" }]}
              >
                <SelectField
                  placeholder="Select Country"
                  options={countries.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  { required: true, message: "Please enter mobile number!" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit Indian mobile number",
                  },
                ]}
              >
                <InputField
                  addonBefore="+91"
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  size="large"
                  type="number"
                  className="w-full rounded-md border-gray-300  no-spinner"
                />
              </Form.Item>

              {/* Phone */}
              <Form.Item label="Phone No." required>
                <Space.Compact className="flex gap-2">
                  <Form.Item
                    name={["phone", "cc"]}
                    noStyle
                    rules={[
                      { required: true, message: "Country Code is required" },
                      {
                        pattern: /^\d{1,4}$/,
                        message: "Country Code must be 1–4 digits",
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[46px] no-spinner"
                      placeholder="CC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["phone", "ndc"]}
                    noStyle
                    rules={[
                      { required: true, message: "NDC is required" },
                      {
                        pattern: /^\d{1,5}$/,
                        message: "NDC must be 1–5 digits",
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[60px] no-spinner"
                      placeholder="NDC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["phone", "number"]}
                    noStyle
                    rules={[
                      { required: true, message: "Phone number is required" },
                      {
                        pattern: /^\d{10}$/,
                        message: "Number must be 10 digits",
                      },
                    ]}
                  >
                    <Input
                      className="!w-full !max-w-[150px] no-spinner"
                      placeholder="12345678"
                      type="number"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>

              {/* Fax */}
              <Form.Item label="Fax No.">
                <Space.Compact className="flex gap-2">
                  <Form.Item name={["fax", "cc"]} noStyle>
                    <Input
                      className="!max-w-[46px] no-spinner"
                      placeholder="CC"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item name={["fax", "ndc"]} noStyle>
                    <Input
                      className="!max-w-[60px] no-spinner"
                      placeholder="NDC"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item name={["fax", "number"]} noStyle>
                    <Input
                      className="!w-full !max-w-[150px]  no-spinner"
                      placeholder="12345678"
                      type="number"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Other Details */}
        <div className="flex mt-5 border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Other Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Sales Person/Country"
                name="salesPersonCountry"
                rules={[{ required: true, message: "Please select Employee!" }]}
              >
                <SelectField
                  placeholder="Select Employee"
                  options={salesPerson.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Assistant Sales Person"
                name="assistantSalesPerson"
              >
                <SelectField
                  placeholder="Select Assistant Sales Person"
                  options={assistantSalesPerson.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ required: true, message: "Please enter remark!" }]}
              >
                <TextArea className="!h-[40px]" placeholder="Enter Remarks" />
              </Form.Item>

              <Form.Item
                label="Registration Date"
                name="registrationDate"
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <DatePicker placeholder="Select Date" size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-6 ">
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select department!" },
                ]}
              >
                <SelectField
                  className="!max-w-[580px]"
                  placeholder="Select Department"
                  options={departments.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end items-center mt-6">
          <Button
            className="!bg-[#6B5DC7] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleSaveAndNext}
            loading={loading}
            disabled={!masterDataLoaded}
          >
            Save & Next
          </Button>
          <Button
            className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={handleSave}
            loading={loading}
            disabled={!masterDataLoaded}
          >
            Save
          </Button>
          <Button
            className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleReset}
          >
            Reset
          </Button>
          {/* <Button
            className="!bg-[#E2E2E2] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={() => navigate(-1)} // Go back to previous page
          >
            Close
          </Button> */}
        </div>
      </Form>
    </div>
  );
};

export default Step1BasicDetail;
