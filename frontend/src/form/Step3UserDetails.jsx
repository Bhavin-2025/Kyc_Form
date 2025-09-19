import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Space } from "antd";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import TextArea from "antd/es/input/TextArea";
import axiosInstance from "../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import {
  saveKyc,
  fetchKycData,
  resetBasicDetails,
  handleChangeCurrentPanel,
} from "../features/kyc/kycSlice";

const Step3UserDetail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const variant = Form.useWatch("variant", form);
  const mobileLogin = Form.useWatch("mobile", form);
  console.log(mobileLogin, "Mobile");

  // Add state to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Master data state
  const [terms, setTerms] = useState([]);
  const [roles, setRoles] = useState([]);
  const [locations, setLocations] = useState([]);

  // Track if all master data is loaded
  const [masterDataLoaded, setMasterDataLoaded] = useState(false);

  // Get user ID and KYC data from Redux
  const userId = useSelector((state) => state.auth.user.user._id);
  const { basicDetails, loading, currentSelectedPanel } = useSelector(
    (state) => state.kyc
  );

  // Fetch master data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Use Promise.all to fetch all data in parallel
        const [termRes, rolesRes, locationRes] = await Promise.all([
          axiosInstance.get("master/terms"),
          axiosInstance.get("master/roles"),
          axiosInstance.get("/master/locations"),
        ]);

        setTerms(termRes.data);
        setRoles(rolesRes.data);
        setLocations(locationRes.data);

        // Set flag when all master data is loaded
        setMasterDataLoaded(true);
      } catch (err) {
        console.error("Error fetching options", err);
        message.error("Failed to load master data");
      }
    };
    fetchOptions();
  }, []);

  // Check if passwords match whenever password or confirmPassword changes
  const watchPassword = Form.useWatch("password", form);
  const watchConfirmPassword = Form.useWatch("confirmPassword", form);

  useEffect(() => {
    if (watchPassword && watchConfirmPassword) {
      setPasswordsMatch(watchPassword === watchConfirmPassword);
    }
  }, [watchPassword, watchConfirmPassword]);

  // Submit handler
  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);

      // Check if passwords match before submission
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match");
        setIsSubmitting(false);
        return;
      }

      // Format the data to match the backend schema
      const formattedData = {
        ...values,
        mobileLogin: values.mobileLogin
          ? String(values.mobileLogin)
          : undefined,
        confirmPassword: values.confirmPassword,
        userId,
      };

      // Use Redux thunk to save data
      const resultAction = await dispatch(saveKyc(formattedData));

      if (saveKyc.fulfilled.match(resultAction)) {
        message.success("KYC Saved Successfully");

        // Modified/New Code - Update Redux store with new KYC details
        dispatch(fetchKycData(userId));

        // Navigate to next step if "Save & Next" was clicked
        if (values.nextStep) {
          dispatch(handleChangeCurrentPanel(4)); // Adjust path as needed
        }
      } else {
        throw new Error(resultAction.error?.message || "Save failed");
      }
    } catch (err) {
      console.error("Save KYC Error:", err);
      message.error(
        err.response?.data?.message || err.message || "Save failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinishFailed = (err) => {
    console.log("Validation Failed:", err);
    message.error("Please correct the errors before submitting.");
  };

  // Handle reset button
  const handleReset = () => {
    form.resetFields();
    dispatch(resetBasicDetails());
    message.success("Form has been reset");
  };

  // Handle Save & Next button
  const handleSaveAndNext = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish({ ...values, nextStep: true });
      })
      .catch((err) => {
        onFinishFailed(err);
      });
  };

  // Handle Save button
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((err) => {
        onFinishFailed(err);
      });
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchKycData(userId))
        .unwrap()
        .catch((error) => {
          // Only show error message for non-404 errors
          if (error !== "Not Found") {
            message.error(`Failed to load KYC data: ${error}`);
          }
        });
    }
  }, [dispatch, userId]);

  // Populate form with data from Redux when available
  useEffect(() => {
    if (basicDetails && masterDataLoaded) {
      console.log("Setting form values with:", basicDetails);

      // Transform dates from ISO strings to moment objects for DatePicker
      const formData = {
        ...basicDetails,
        confirmPassword: basicDetails.password,
        mobileLogin: basicDetails.mobileLogin || "",
      };

      // Set form values after a short delay to ensure select options are loaded
      setTimeout(() => {
        form.setFieldsValue(formData);
      }, 500);
    }
  }, [basicDetails, form, masterDataLoaded]);

  // Function to determine validation status for password fields
  const getPasswordValidationStatus = (field) => {
    if (field === "password") {
      if (!watchPassword) return "";
      if (watchPassword.length < 8) return "error";
      if (watchConfirmPassword && !passwordsMatch) return "error";
      if (watchPassword.length >= 8) return "success";
      return "";
    } else if (field === "confirmPassword") {
      if (!watchConfirmPassword) return "";
      if (watchPassword && watchConfirmPassword && passwordsMatch)
        return "success";
      if (watchPassword && watchConfirmPassword && !passwordsMatch)
        return "error";
      return "";
    }
    return "";
  };

  return (
    <div className="px-3">
      <Form
        form={form}
        variant={variant || "outlined"}
        layout="vertical"
        onValuesChange={(_, allValues) => {
          // Real-time password matching check
          if (allValues.password && allValues.confirmPassword) {
            setPasswordsMatch(allValues.password === allValues.confirmPassword);
          }
        }}
      >
        {/* Login Details */}
        <div className="flex mt-5 gap-4 border-b border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Login Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Terms"
                name="term"
                rules={[{ required: true, message: "Please select Terms!" }]}
              >
                <SelectField
                  placeholder="Select Terms"
                  options={terms.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select Role!" }]}
              >
                <SelectField
                  placeholder="Select Day Role"
                  options={roles.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Username is required",
                  },
                  {
                    min: 3,
                    message: "Username must be at least 3 characters",
                  },
                ]}
              >
                <InputField placeholder="Enter User Name" type="text" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <InputField placeholder="Enter Email" type="email" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 8, message: "Password must be at least 8 characters" },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character",
                  },
                ]}
                validateStatus={getPasswordValidationStatus("password")}
                hasFeedback
              >
                <InputField placeholder="Enter Password" type="password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                validateStatus={getPasswordValidationStatus("confirmPassword")}
                help={
                  watchPassword && watchConfirmPassword && !passwordsMatch
                    ? "Passwords do not match"
                    : ""
                }
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <InputField
                  placeholder="Enter Confirm Password"
                  type="password"
                />
              </Form.Item>

              <Form.Item
                label="Mobile No"
                name="mobileLogin"
                type="text"
                rules={[
                  { required: true, message: "Mobile number is required" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                ]}
              >
                <InputField placeholder="Enter Mobile no" type="number" />
              </Form.Item>
            </div>

            <div className="flex">
              {/* Password match warning */}
              {watchPassword && watchConfirmPassword && !passwordsMatch && (
                <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded mb-4">
                  <p>
                    Please ensure both password fields contain the same value.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please select Location!" }]}
                className="col-span-1"
              >
                <SelectField
                  placeholder="Select Location"
                  options={locations.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Additional Discounts */}
        <div className="flex mt-5 gap-4 border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Additional Discount</p>
            <p className="font-normal text-[10px] text-[#696774]">
              Kindly apply an additional discount specifically to the
              inventories at the designated location.
            </p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Mumbai"
                  name="mumbai"
                  rules={[
                    {
                      pattern: /^([0-9]|[1-9][0-9]|100)$/,
                      message: "Enter a valid percentage (0-100)",
                    },
                  ]}
                >
                  <InputField placeholder="Enter %" type="number" />
                </Form.Item>

                <Form.Item
                  label="Hong Kong"
                  name="hongkong"
                  rules={[
                    {
                      pattern: /^([0-9]|[1-9][0-9]|100)$/,
                      message: "Enter a valid percentage (0-100)",
                    },
                  ]}
                >
                  <InputField placeholder="Enter %" type="number" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="New York"
                  name="newyork"
                  rules={[
                    {
                      pattern: /^([0-9]|[1-9][0-9]|100)$/,
                      message: "Enter a valid percentage (0-100)",
                    },
                  ]}
                >
                  <InputField placeholder="Enter %" type="number" />
                </Form.Item>

                <Form.Item
                  label="Belgium"
                  name="belgium"
                  rules={[
                    {
                      pattern: /^([0-9]|[1-9][0-9]|100)$/,
                      message: "Enter a valid percentage (0-100)",
                    },
                  ]}
                >
                  <InputField placeholder="Enter %" type="number" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end items-center mt-6">
          <Button
            className="!bg-[#E2E2E2] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={() =>
              dispatch(handleChangeCurrentPanel(currentSelectedPanel - 1))
            }
          >
            Previous
          </Button>
          <Button
            className="!bg-[#6B5DC7] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleSaveAndNext}
            loading={loading || isSubmitting}
            disabled={
              !masterDataLoaded ||
              (watchPassword && watchConfirmPassword && !passwordsMatch)
            }
          >
            Save & Next
          </Button>
          <Button
            className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={handleSave}
            loading={loading || isSubmitting}
            disabled={
              !masterDataLoaded ||
              (watchPassword && watchConfirmPassword && !passwordsMatch)
            }
          >
            Save
          </Button>
          <Button
            className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3UserDetail;