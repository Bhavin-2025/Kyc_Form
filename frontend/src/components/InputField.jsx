import React from "react";
import { Input } from "antd";

const InputField = ({
  label,
  type = "text",
  placeholder,
  className,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}
      {type === "password" ? (
        <Input.Password
          placeholder={placeholder}
          className={`!w-full ${className}`}
          {...rest}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          className={`!w-full ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};

export default InputField;
