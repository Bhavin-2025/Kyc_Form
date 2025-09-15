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
  label,
  value,
}) => {
  return (
    <div>
      <span>{label}</span>
      <Select
        mode={mode}
        allowClear
        style={style}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        options={options}
        size="large"
        value={value ?? null}
      />
    </div>
  );
};

export default SelectField;
