import React from "react";
import Step1BasicDetail from "../form/Step1BasicDetail";
import Step2TermDetail from "../form/Step2TermDetail";
import Step3UserDetails from "../form/Step3UserDetails";
import Step4AddressDetails from "../form/Step4AddressDetails";
import { useSelector } from "react-redux";

const KycPage = () => {
  const { currentSelectedPanel } = useSelector((state) => state.kyc);
  console.log("currentSelectedPanel", currentSelectedPanel);

  return (
    <div>
      {currentSelectedPanel === 1 ? (
        <Step1BasicDetail />
      ) : currentSelectedPanel === 2 ? (
        <Step2TermDetail />
      ) : currentSelectedPanel === 3 ? (
        <Step3UserDetails />
      ) : (
        <Step4AddressDetails />
      )}
    </div>
  );
};

export default KycPage;
