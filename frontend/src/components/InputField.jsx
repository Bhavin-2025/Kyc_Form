import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const InputField = ({
  control,
  label,
  name,
  error,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              {...field}
              id={name}
              placeholder={placeholder}
              className={`${error ? "border-red-500" : "border-gray-300"}`}
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={`h-[38px] w-[278px] rounded-lg${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )
        }
      />

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
