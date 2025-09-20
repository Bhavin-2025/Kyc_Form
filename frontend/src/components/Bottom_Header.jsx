// frontend\src\components\Bottom_Header.jsx

import React from "react";
import { panels } from "../utils/constants";
import { handleChangeCurrentPanel } from "../features/kyc/kycSlice";
import { useDispatch, useSelector } from "react-redux";

const Bottom_Header = () => {
  const dispatch = useDispatch();
  const currentSelectedPanel = useSelector(
    (state) => state.kyc.currentSelectedPanel
  );

  const DefaultOff = useSelector((state) => state.kyc.setDefaultNavigation);
  console.log("Def", DefaultOff);

  // Modified/New Code - Check if we're in the summary view
  const isInSummaryView = currentSelectedPanel === 5;

  // If in summary view, don't show the regular panels
  if (isInSummaryView) {
    return (
      <div>
        <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8]">
          <button className="text-[#6B5DC7] underline underline-offset-12 decoration-2">
            Summary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {DefaultOff && (
        <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8]">
          {panels
            .filter((panel) => !panel.isHidden) // Filter out hidden panels
            .map((details) => {
              const isActive = currentSelectedPanel === details.value;

              return (
                <button
                  key={details?.value}
                  className={`${
                    isActive
                      ? "text-[#6B5DC7] underline underline-offset-12 decoration-2"
                      : "text-gray-600 font-medium text-sm"
                  }`}
                >
                  {details?.label}
                </button>
              );
            })}
        </div>
      )}
      {/* <div className="flex px-5 py-3 gap-9 bg-[#F3F2F8]">
        {panels
          .filter((panel) => !panel.isHidden) // Filter out hidden panels
          .map((details) => {
            const isActive = currentSelectedPanel === details.value;

            return (
              <button
                key={details?.value}
                className={`${
                  isActive
                    ? "text-[#6B5DC7] underline underline-offset-12 decoration-2"
                    : "text-gray-600 font-medium text-sm"
                }`}
              >
                {details?.label}
              </button>
            );
          })}
      </div> */}
    </div>
  );
};

export default Bottom_Header;
