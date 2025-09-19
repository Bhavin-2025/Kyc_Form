import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Modal } from "antd"; // Import Modal
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Top_Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const kycDetails = useSelector((state) => state.kyc.basicDetails); // Fetch KYC details from Redux
  const [isModalVisible, setIsModalVisible] = React.useState(false); // State for modal visibility

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  const username = user?.user?.username || "User";

  // Modified/New Code - Show user details modal
  const showUserDetails = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-between items-center py-2.5 px-3 border-b border-gray-100">
      <div>
        <img src="/assets/ak-gem.png" alt="logo" />
      </div>

      <div className="flex justify-center items-center gap-9">
        <Popconfirm
          title="Are you sure you want to logout?"
          okText="Yes"
          cancelText="No"
          icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
          onConfirm={handleLogout}
        >
          <Button type="text" danger icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Popconfirm>

        <div className="flex gap-2" onClick={showUserDetails}>
          <img src="/assets/bank.png" className="w-5 h-5" alt="bank" />
          <p className="font-medium text-sm text-[#6B5DC7] cursor-pointer">
            Account
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>

      {/* Modal for User Details */}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div className="max-w-md mx-auto bg-purple-50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#6B5DC7] border-b pb-2 mb-4">
            User Details
          </h2>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-gray-900">{kycDetails?.role || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Username:</span>
            <span className="text-gray-900">
              {kycDetails?.username || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900">{kycDetails?.email || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Password:</span>
            <span className="text-gray-900">
              {kycDetails?.password || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Mobile Login:</span>
            <span className="text-gray-900">
              {kycDetails?.mobileLogin || "N/A"}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Top_Header;
