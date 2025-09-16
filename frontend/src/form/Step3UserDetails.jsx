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
import { useNavigate } from "react-router-dom";
const Step3UserDetail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variant = Form.useWatch("variant", form);
  // const party = Form.useWatch("dayTerm", form);
  // console.log("Current party value:", party);

  // Master data state
  const [terms, setTerms] = useState([]);
  const [roles, setRoles] = useState([]);
  const [parties, setParties] = useState([]);
  const [brokers, setBrokers] = useState([]);

  // Track if all master data is loaded
  const [masterDataLoaded, setMasterDataLoaded] = useState(false);

  // Get user ID and KYC data from Redux
  const userId = useSelector((state) => state.auth.user.user._id);
  const { basicDetails, loading } = useSelector((state) => state.kyc);

  // Fetch master data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Use Promise.all to fetch all data in parallel
        const [termRes, rolesRes, partiesRes, brokerRes] = await Promise.all([
          axiosInstance.get("master/terms"),
          axiosInstance.get("master/roles"),
          axiosInstance.get("/master/parties"),
          axiosInstance.get("/master/brokers"),
        ]);

        console.log("parties", parties);

        setTerms(termRes.data);
        setRoles(rolesRes.data);
        setParties(partiesRes.data);
        setBrokers(brokerRes.data);

        // Set flag when all master data is loaded
        setMasterDataLoaded(true);
      } catch (err) {
        console.error("Error fetching options", err);
        message.error("Failed to load master data");
      }
    };
    fetchOptions();
  }, []);

  // Fetch KYC data if not in Redux

  // Submit handler
  const onFinish = async (values) => {
    try {
      let payload = { ...values, userId };

      // Modified/New Code - Use Redux thunk to save data
      const resultAction = await dispatch(saveKyc(payload));

      if (saveKyc.fulfilled.match(resultAction)) {
        message.success("KYC Saved Successfully");
        // Navigate to next step if "Save & Next" was clicked
        if (values.nextStep) {
          dispatch(handleChangeCurrentPanel(3)); // Adjust path as needed
        }
      } else {
        throw new Error(resultAction.error?.message || "Save failed");
      }
    } catch (err) {
      console.error("Save KYC Error:", err);
      message.error(
        err.response?.data?.message || err.message || "Save failed"
      );
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

  // Modified/New Code
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
  // Modified/New Code - Wait for master data to be loaded before setting form values
  useEffect(() => {
    if (basicDetails && masterDataLoaded) {
      console.log("Setting form values with:", basicDetails);

      // Transform dates from ISO strings to moment objects for DatePicker
      const formData = {
        ...basicDetails,
      };

      // Set form values after a short delay to ensure select options are loaded
      setTimeout(() => {
        form.setFieldsValue(formData);
      }, 500);
    }
  }, [basicDetails, form, masterDataLoaded]);
  console.log("FormValue", Form.useWatch());

  return (
    <div className="px-3">
      <Form
        form={form}
        variant={variant || "outlined"}
        // initialValues={formData}
        layout="vertical"
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
                    required: "true",
                    type: "text",
                    message: "Enter User Name",
                  },
                ]}
              >
                <InputField placeholder="Enter User Name" type="text" />
              </Form.Item>
              <Form.Item
                label="Term Name"
                name="termName"
                rules={[{ type: "text", message: "Enter Term Name" }]}
              >
                <InputField placeholder="Enter Term Name" type="text" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Ext %"
                name="ext"
                rules={[{ type: "text", message: "Enter Ext %" }]}
              >
                <InputField placeholder="Enter Ext %" type="number" />
              </Form.Item>

              <Form.Item
                label="Rap %"
                name="rap"
                rules={[{ type: "text", message: "Enter Rap %" }]}
              >
                <InputField placeholder="Enter Rap %" type="number" />
              </Form.Item>

              <Form.Item
                label="Extra $"
                name="extra"
                rules={[{ type: "text", message: "Enter Extra $" }]}
              >
                <InputField placeholder="0.00" type="number" />
              </Form.Item>

              <Form.Item
                label="Credit Limit"
                name="creditLimit"
                rules={[{ type: "text", message: "Enter Credit Limit" }]}
              >
                <InputField placeholder="Enter Credit Limit" type="number" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Credit Limit"
                name="creditLimit"
                rules={[{ type: "text", message: "Enter Credit Limit" }]}
                className="col-span-2"
              >
                <InputField placeholder="Enter Credit Limit" type="number" />
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
                  label="Credit Limit"
                  name="creditLimit"
                  rules={[{ type: "text", message: "Enter Credit Limit" }]}
                >
                  <InputField placeholder="Enter Credit Limit" type="number" />
                </Form.Item>

                <Form.Item
                  label="Credit Limit"
                  name="creditLimit"
                  rules={[{ type: "text", message: "Enter Credit Limit" }]}
                >
                  <InputField placeholder="Enter Credit Limit" type="number" />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Credit Limit"
                  name="creditLimit"
                  rules={[{ type: "text", message: "Enter Credit Limit" }]}
                >
                  <InputField placeholder="Enter Credit Limit" type="number" />
                </Form.Item>

                <Form.Item
                  label="Credit Limit"
                  name="creditLimit"
                  rules={[{ type: "text", message: "Enter Credit Limit" }]}
                >
                  <InputField placeholder="Enter Credit Limit" type="number" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end items-center mt-6">
          <Button
            className="!bg-[#6B5DC7] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleSaveAndNext}
            loading={loading}
            disabled={!masterDataLoaded}
          >
            Save & Next
          </Button>
          <Button
            className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={handleSave}
            loading={loading}
            disabled={!masterDataLoaded}
          >
            Save
          </Button>
          <Button
            className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="!bg-[#E2E2E2] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={() => navigate(-1)} // Go back to previous page
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3UserDetail;
