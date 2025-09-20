import React, { useEffect } from "react";
import Step1BasicDetail from "../form/Step1BasicDetail";
import Step2TermDetail from "../form/Step2TermDetail";
import Step3UserDetails from "../form/Step3UserDetails";
import Step4AddressDetails from "../form/Step4AddressDetails";
import SummaryView from "../form/SummaryView";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChangeCurrentPanel,
  handlesetDefaultNavigation,
} from "../features/kyc/kycSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const KycPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSelectedPanel } = useSelector((state) => state.kyc);
  const { role } = useSelector((state) => state.auth.user.user);

  // Check if in admin editing mode
  const isAdminEditing =
    localStorage.getItem("editingUserId") !== null && role === "admin";
  console.log("isAdminEditing", isAdminEditing);

  useEffect(() => {
    // Retrieve the current panel from localStorage on mount
    const storedPanel = localStorage.getItem("currentPanel");
    if (storedPanel) {
      dispatch(handleChangeCurrentPanel(Number(storedPanel)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Store the current panel in localStorage whenever it changes
    localStorage.setItem("currentPanel", currentSelectedPanel);
  }, [currentSelectedPanel]);

  // Function to return to admin dashboard
  const handleBackToAdmin = () => {
    // Clear the editing user ID
    localStorage.removeItem("editingUserId");
    // Navigate back to admin dashboard
    dispatch(handlesetDefaultNavigation(false));
    navigate("/admin");
  };

  return (
    <div>
      {/* Show back button if admin is editing someone's data */}
      {isAdminEditing && (
        <div className="flex justify-between items-center px-4">
          <div className="text-[#6B5DC7] font-semibold">Admin Editing Mode</div>
          <Button
            onClick={handleBackToAdmin}
            className="!bg-[#E2E2E2] !font-semibold mt-2 !p-2 !rounded-[10px] !text-black"
          >
            Back to Admin Dashboard
          </Button>
        </div>
      )}

      {currentSelectedPanel === 1 ? (
        <Step1BasicDetail />
      ) : currentSelectedPanel === 2 ? (
        <Step2TermDetail />
      ) : currentSelectedPanel === 3 ? (
        <Step3UserDetails />
      ) : currentSelectedPanel === 4 ? (
        <Step4AddressDetails />
      ) : (
        <SummaryView />
      )}
    </div>
  );
};

export default KycPage;
