import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice"; // make sure you have this action

const Top_Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear localStorage
    localStorage.clear();

    // optional: reset redux state
    dispatch(logout());

    // redirect to login
    navigate("/login");
  };
  const user = useSelector((state) => state.auth.user);
  console.log(user.user.username, "user");

  return (
    <div className="flex justify-between items-center py-2.5 px-3 border-b border-gray-100">
      <div>
        <img src="/assets/ak-gem.png" alt="logo" />
      </div>

      <div className="flex justify-center items-center gap-9">
        {/* ✅ Logout with Confirmation */}
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

        <div className="flex gap-2">
          <img src="/assets/bank.png" className="w-5 h-5" alt="bank" />
          <p className="font-medium text-sm text-[#6B5DC7]">Account</p>
        </div>

        <div className="flex items-center gap-3">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>
            <p className="text-sm font-semibold">{user?.user?.username}</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top_Header;
