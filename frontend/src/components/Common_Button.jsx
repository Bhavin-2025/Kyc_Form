import React from "react";
import { Button } from "antd";

const SolidButton = ({ label, color, className, ...rest }) => {
  return (
    <Button
      color={color}
      variant="solid"
      className={className}
      {...rest} // allow extra props like onClick, disabled etc.
    >
      {label}
    </Button>
  );
};

export default SolidButton;
