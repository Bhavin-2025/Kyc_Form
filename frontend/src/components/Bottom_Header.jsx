// src/components/Bottom_Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Bottom_Header = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[#6B5DC7] text-xs font-medium underline underline-offset-[10px] underline decoration-1"
      : "text-[#696774] text-xs font-normal";

  return (
    <div>
      <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8] ">
        <NavLink to="/kyc/step1" className={linkClass}>
          Basic Details
        </NavLink>
        <NavLink to="/kyc/step2" className={linkClass}>
          Terms Details
        </NavLink>
        <NavLink to="/kyc/step3" className={linkClass}>
          User Details
        </NavLink>
        <NavLink to="/kyc/step4" className={linkClass}>
          Address Details
        </NavLink>
      </div>
    </div>
  );
};

export default Bottom_Header;
