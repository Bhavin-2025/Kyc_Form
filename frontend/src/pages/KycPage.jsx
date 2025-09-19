import React, { useEffect } from "react";
import Step1BasicDetail from "../form/Step1BasicDetail";
import Step2TermDetail from "../form/Step2TermDetail";
import Step3UserDetails from "../form/Step3UserDetails";
import Step4AddressDetails from "../form/Step4AddressDetails";
import SummaryView from "../form/SummaryView";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeCurrentPanel } from "../features/kyc/kycSlice";

const KycPage = () => {
  const dispatch = useDispatch();
  const { currentSelectedPanel } = useSelector((state) => state.kyc);

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

  return (
    <div>
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