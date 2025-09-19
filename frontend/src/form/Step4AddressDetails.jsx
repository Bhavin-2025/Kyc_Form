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

const Step4AddressDetail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const variant = Form.useWatch("variant", form);

  // Watch for country and state changes to trigger cascading dropdowns
  const selectedCountry = Form.useWatch("countryAddress", form);
  const selectedState = Form.useWatch("state", form);

  // Master data state
  const [addressTypes, setAddressTypes] = useState([]);
  const [countryAddress, setCountryAddress] = useState([]);

  // States and cities for cascading dropdowns
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Track if all master data is loaded
  const [masterDataLoaded, setMasterDataLoaded] = useState(false);
  // Track form submission
  const [submitting, setSubmitting] = useState(false);

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
        const [addressRes, countryAddressRes] = await Promise.all([
          axiosInstance.get("master/addressTypes"),
          axiosInstance.get("/master/countryAddress"),
        ]);

        setAddressTypes(addressRes.data);
        setCountryAddress(countryAddressRes.data);

        // Set flag when all master data is loaded
        setMasterDataLoaded(true);
      } catch (err) {
        console.error("Error fetching options", err);
        message.error("Failed to load master data");
      }
    };
    fetchOptions();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          // Reset state and city selections when country changes
          if (!form.getFieldValue("isInitialLoad")) {
            form.setFieldsValue({ state: undefined, city: undefined });
            setCities([]);
          }

          const response = await axiosInstance.get(
            `/master/states/${selectedCountry}`
          );
          setStates(response.data);
        } catch (err) {
          console.error("Error fetching states:", err);
          message.error("Failed to load states for the selected country");
          setStates([]);
        }
      };

      fetchStates();
    } else {
      // Clear states when no country is selected
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, form]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          // Reset city when state changes
          if (!form.getFieldValue("isInitialLoad")) {
            form.setFieldsValue({ city: undefined });
          }

          const response = await axiosInstance.get(
            `/master/cities/${selectedState}`
          );
          setCities(response.data);

          // Remove the initial load flag after first load
          if (form.getFieldValue("isInitialLoad")) {
            setTimeout(() => {
              form.setFieldsValue({ isInitialLoad: undefined });
            }, 1000);
          }
        } catch (err) {
          console.error("Error fetching cities:", err);
          message.error("Failed to load cities for the selected state");
          setCities([]);
        }
      };

      fetchCities();
    } else {
      // Clear cities when no state is selected
      setCities([]);
    }
  }, [selectedState, form]);

  // Submit handler
  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      // Remove the isInitialLoad flag before submitting
      const { isInitialLoad, ...submitValues } = values;

      // Validate required fields
      if (
        !submitValues.addressType ||
        !submitValues.countryAddress ||
        !submitValues.state ||
        !submitValues.city
      ) {
        message.error("Please fill all required fields");
        setSubmitting(false);
        return;
      }

      // Format contact number if needed
      if (submitValues.contactNo) {
        // Ensure it's a string for consistency
        submitValues.contactNo = String(submitValues.contactNo);
      }

      // Format postal code if needed
      if (submitValues.postalCode) {
        submitValues.postalCode = String(submitValues.postalCode);
      }

      // Prepare payload with userId
      let payload = { ...submitValues, userId };

      // Create a complete address object for the addresses array
      const addressObject = {
        addressType: submitValues.addressType,
        companyName: submitValues.companyName,
        contactNo: submitValues.contactNo,
        unit: submitValues.unit,
        building: submitValues.building,
        street: submitValues.street,
        landmark: submitValues.landmark,
        area: submitValues.area,
        countryAddress: submitValues.countryAddress,
        state: submitValues.state,
        city: submitValues.city,
        postalCode: submitValues.postalCode,
      };

      // Add the address object to the payload
      payload.addresses = [addressObject];

      const resultAction = await dispatch(saveKyc(payload));

      if (saveKyc.fulfilled.match(resultAction)) {
        message.success("Address details saved successfully");
        // Navigate to next step if "Save & Next" was clicked
        if (submitValues.nextStep) {
          dispatch(handleChangeCurrentPanel(1)); // Go back to first step after completing all steps
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
      setSubmitting(false);
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

      // Extract address data from the first address in the addresses array if available
      let formData = { ...basicDetails };

      // Add a flag to prevent clearing state/city during initial load
      formData.isInitialLoad = true;

      // Check if we have addresses array with data
      if (basicDetails.addresses && basicDetails.addresses.length > 0) {
        console.log("Found addresses in data:", basicDetails.addresses);
        // Get the first address (or we could implement address selection logic here)
        const addressData = basicDetails.addresses[0];

        // Merge the address data with the form data
        formData = {
          ...formData,
          addressType: addressData.addressType,
          companyName: addressData.companyName,
          contactNo: addressData.contactNo,
          unit: addressData.unit,
          building: addressData.building,
          street: addressData.street,
          landmark: addressData.landmark,
          area: addressData.area,
          countryAddress: addressData.countryAddress,
          state: addressData.state,
          city: addressData.city,
          postalCode: addressData.postalCode,
        };

        console.log("Extracted address data:", addressData);
      }

      // Set form values after a short delay to ensure select options are loaded
      setTimeout(() => {
        form.setFieldsValue(formData);

        // If country and state are already selected, fetch their dependent data
        if (formData.countryAddress) {
          axiosInstance
            .get(`/master/states/${formData.countryAddress}`)
            .then((response) => {
              setStates(response.data);
              console.log(
                "Loaded states for country:",
                formData.countryAddress,
                response.data
              );

              if (formData.state) {
                axiosInstance
                  .get(`/master/cities/${formData.state}`)
                  .then((cityResponse) => {
                    setCities(cityResponse.data);
                    console.log(
                      "Loaded cities for state:",
                      formData.state,
                      cityResponse.data
                    );
                  })
                  .catch((err) =>
                    console.error(
                      "Error loading cities for existing data:",
                      err
                    )
                  );
              }
            })
            .catch((err) =>
              console.error("Error loading states for existing data:", err)
            );
        }
      }, 500);
    }
  }, [basicDetails, form, masterDataLoaded]);

  return (
    <div className="px-6">
      <Form form={form} variant={variant || "outlined"} layout="vertical">
        {/* Hidden field for initial load flag */}
        <Form.Item name="isInitialLoad" hidden>
          <Input />
        </Form.Item>

        {/* Address Details */}
        <div className="flex mt-5 gap-4 border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Address Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Address Type"
                name="addressType"
                rules={[
                  { required: true, message: "Please select Address Type!" },
                ]}
              >
                <SelectField
                  placeholder="Select Address Type"
                  options={addressTypes.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[
                  { required: false, message: "Enter Company Name" },
                  {
                    pattern: /^[a-zA-Z0-9\s\-&.,()]+$/,
                    message: "Company name contains invalid characters",
                  },
                ]}
              >
                <InputField placeholder="Enter Company Name" type="text" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Contact No."
                  name="contactNo"
                  rules={[
                    { required: false, message: "Enter Contact No." },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit number",
                    },
                  ]}
                >
                  <InputField placeholder="Enter Contact No." type="number" />
                </Form.Item>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[
                    { required: false, message: "Enter Unit" },
                    {
                      max: 20,
                      message: "Unit cannot exceed 20 characters",
                    },
                  ]}
                >
                  <InputField placeholder="Enter Unit" type="text" />
                </Form.Item>
              </div>
              <Form.Item
                label="Building"
                name="building"
                rules={[
                  { required: false, message: "Enter Building" },
                  {
                    max: 100,
                    message: "Building name cannot exceed 100 characters",
                  },
                ]}
              >
                <InputField placeholder="Enter Building" type="text" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Street"
                name="street"
                rules={[
                  { required: false, message: "Enter street" },
                  {
                    max: 100,
                    message: "Street name cannot exceed 100 characters",
                  },
                ]}
              >
                <InputField placeholder="Enter street" type="text" />
              </Form.Item>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Landmark"
                  name="landmark"
                  rules={[
                    { required: false, message: "Enter landmark" },
                    {
                      max: 100,
                      message: "Landmark cannot exceed 100 characters",
                    },
                  ]}
                >
                  <InputField placeholder="Enter Landmark" type="text" />
                </Form.Item>

                <Form.Item
                  label="Area"
                  name="area"
                  rules={[
                    { required: false, message: "Enter area" },
                    {
                      max: 100,
                      message: "Area cannot exceed 100 characters",
                    },
                  ]}
                >
                  <InputField placeholder="Enter area" type="text" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Country"
                  name="countryAddress"
                  rules={[
                    { required: true, message: "Please select Country!" },
                  ]}
                >
                  <SelectField
                    placeholder="Select Country"
                    options={countryAddress.map((c) => ({
                      label: c.label,
                      value: c.value,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Please select State!" }]}
                >
                  <SelectField
                    placeholder="Select State"
                    options={states.map((c) => ({
                      label: c.label,
                      value: c.value,
                    }))}
                    disabled={!selectedCountry} // Disable if no country selected
                  />
                </Form.Item>
              </div>

              {/* Add city dropdown */}
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Please select City!" }]}
                >
                  <SelectField
                    placeholder="Select City"
                    options={cities.map((c) => ({
                      label: c.label,
                      value: c.value,
                    }))}
                    disabled={!selectedState} // Disable if no state selected
                  />
                </Form.Item>
                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  rules={[
                    { required: false, message: "Please enter Postal Code!" },
                    {
                      pattern: /^[0-9]{5,10}$/,
                      message: "Please enter a valid postal code (5-10 digits)",
                    },
                  ]}
                >
                  <InputField placeholder="Enter Postal Code" type="text" />
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
            loading={loading || submitting}
            disabled={!masterDataLoaded || submitting}
          >
            Save & Next
          </Button>
          <Button
            className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
            onClick={handleSave}
            loading={loading || submitting}
            disabled={!masterDataLoaded || submitting}
          >
            Save
          </Button>
          <Button
            className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step4AddressDetail;
