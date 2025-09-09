// CustomSelect.jsx
import { Select } from "antd";

const SelectField = ({
  options = [],
  mode = "single", // 'single' or 'multiple'
  placeholder = "Please select",
  defaultValue = [],
  disabled = false,
  onChange,
  style = { width: "100%" },
}) => {
  return (
    <Select
      mode={mode}
      allowClear
      style={style}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      options={options}
    />
  );
};

export default SelectField;
