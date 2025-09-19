// frontend\src\components\Bottom_Header.jsx

import React from "react";
import { panels } from "../utils/constants";
import { handleChangeCurrentPanel } from "../features/kyc/kycSlice";
import { useDispatch, useSelector } from "react-redux";

const Bottom_Header = () => {
  const dispatch = useDispatch();
  // Modified/New Code
  const currentSelectedPanel = useSelector(
    (state) => state.kyc.currentSelectedPanel
  );

  return (
    <div>
      <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8]">
        {panels.map((details) => {
          // Modified/New Code - Check if this panel is the active one
          const isActive = currentSelectedPanel === details.value;

          return (
            <button
              key={details?.value}
              // onClick={() => dispatch(handleChangeCurrentPanel(details?.value))}
              // Modified/New Code - Add conditional classes for active state
              className={`${
                isActive
                  ? " text-[#6B5DC7] underline underline-offset-12  decoration-2"
                  : "text-gray-600 font-medium text-sm "
              }`}
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
