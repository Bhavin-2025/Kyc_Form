// frontend/src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { Table, Button, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import {
  handleChangeCurrentPanel,
  handlesetDefaultNavigation,
} from "../features/kyc/kycSlice";
import { fetchKycData } from "../features/kyc/kycSlice";

const AdminDashboard = () => {
  const [kycData, setKycData] = useState([]);
  console.log(kycData);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user.user);

  useEffect(() => {
    // Check if user is admin
    if (role !== "admin") {
      message.error("Unauthorized access");
      navigate("/kyc");
      return;
    }

    // Fetch all KYC data
    const fetchAllKycData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/kyc/all");
        setKycData(response.data.kycData);
      } catch (error) {
        message.error("Failed to load KYC data");
        console.error("Error fetching KYC data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllKycData();
  }, [navigate, role]);

  const handleViewEdit = (userId) => {
    // Fetch the specific user's KYC data
    dispatch(handlesetDefaultNavigation(true));
    dispatch(fetchKycData(userId))
      .unwrap()
      .then(() => {
        console.log("MDMDMDMDM");

        // Store the userId being edited in localStorage
        localStorage.setItem("editingUserId", userId);
        // Reset to first panel
        dispatch(handleChangeCurrentPanel(1));
        console.log("abcdddd");

        // Navigate to KYC form
        navigate("/kyc");
      })
      .catch((error) => {
        message.error(`Failed to load user data: ${error}`);
      });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => text || "N/A",
    },
    {
      title: "Business",
      dataIndex: "business",
      key: "business",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => text || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleViewEdit(record.userId)}
            className="!bg-[#6B5DC7]"
          >
            View/Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#6B5DC7]">
        Admin Dashboard
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={kycData}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
