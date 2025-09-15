// src/components/Bottom_Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { panels } from "../utils/constants";
import { handleChangeCurrentPanel } from "../features/kyc/kycSlice";
import { useDispatch } from "react-redux";

const Bottom_Header = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8] ">
        {panels.map((details) => {
          return (
            <button
              key={details?.value}
              onClick={() => dispatch(handleChangeCurrentPanel(details?.value))}
            >
              {details?.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Bottom_Header;
