import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Top_Header = () => {
  return (
    <div className="flex justify-between items-center py-2.5 px-3 border-b border-gray-100">
      <div>
        <img src="/assets/ak-gem.png" alt="" />
      </div>

      <div className="flex justify-center items-center gap-9">
        <div className="flex gap-2">
          <img src="/assets/bank.png" className="w-5 h-5" alt="" />
          <p className="font-medium text-sm text-[#6B5DC7]">Account</p>
        </div>

        <div className="flex gap-2.5">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>
            <p className="text-sm font-semibold">Bhavin Giniya</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top_Header;
