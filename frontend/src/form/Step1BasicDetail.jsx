import React from "react";
import SelectField from "../components/SelectField";
import Form from "antd/es/form/Form";
import { DatePicker, Input, Segmented } from "antd";
import InputField from "../components/InputField";

const Step1BasicDetail = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  return (
    <div className=" main-container">
      <Form
        form={form}
        variant={variant || "outlined"}
        initialValues={{ variant: "outlined" }}
        layout="vertical"
      >
        {/* Category Details */}
        <div className="flex border-b border-[#D9D9D9]  mt-5  ">
          <div className="w-full max-w-[210px]">
            <div>
              <p className="font-semibold text-xl">Category Details</p>
            </div>
            <div className="flex item-center gap-2 mt-1">
              <p className="flex items-center text-xs font-medium ">
                Party Code
              </p>
              <span className=" bg-[#6B5DC7] text-white font-medium px-2.5 py-1.5 rounded-lg  text-sm">
                P123456
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <Form.Item
                  label="Category"
                  name="category"
                  className
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <SelectField placeholder="Select Category" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Company/Individual"
                  name="companyIndividual"
                  className
                  rules={[
                    {
                      required: true,
                      message: "Please Select Company/Individual!",
                    },
                  ]}
                >
                  <InputField placeholder="Enter Name" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Business Type"
                  name="business"
                  className
                  rules={[{ message: "Please input!" }]}
                >
                  <SelectField placeholder="Select Business Type" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="GST No"
                  name="gst"
                  className
                  rules={[
                    {
                      required: true,
                      message: "Please Enter GST No",
                    },
                  ]}
                >
                  <InputField placeholder="Enter GST No" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Details */}
        <div className="flex mt-5 border-b  border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <div>
              <p className="font-semibold text-xl">Contact Details</p>
            </div>
          </div>

          <div className="w-full ">
            <div className="w-full">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Form.Item
                    label="Primary Contact"
                    name="primaryContact"
                    className
                    rules={[
                      {
                        message: "Please Select Primary Contact!",
                      },
                    ]}
                  >
                    <InputField placeholder="Enter Primary Contact" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Primary Email"
                    name="primaryEmail"
                    className
                    rules={[
                      {
                        message: "Please Select Primary Email!",
                      },
                    ]}
                  >
                    <InputField
                      placeholder="Enter Primary Email"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Secondary Email"
                    name="SecondaryEmail"
                    className
                    rules={[
                      {
                        message: "Please Select Secondary Email!",
                      },
                    ]}
                  >
                    <InputField
                      placeholder="Enter Secondary Email"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Birth Date"
                    name="birthDate"
                    rules={[{ message: "Please insert Birth Date" }]}
                  >
                    <DatePicker placeholder="Select Birth Date" size="large" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Form.Item
                    label="Country"
                    name="country"
                    className
                    rules={[
                      { required: true, message: "Please Select Country !" },
                    ]}
                  >
                    <SelectField placeholder="Select Category" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number!",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Mobile number must be 10 digits!",
                      },
                    ]}
                  >
                    <InputField
                      addonBefore="+91"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      size="small"
                      className="custom_Input"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Business Type"
                    name="business"
                    className
                    rules={[{ message: "Please input!" }]}
                  >
                    <SelectField placeholder="Select Business Type" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="GST No"
                    name="gst"
                    className
                    rules={[
                      {
                        required: true,
                        message: "Please Enter GST No",
                      },
                    ]}
                  >
                    <InputField placeholder="Enter GST No" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-5 border-b  border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <div>
              <p className="font-semibold text-xl">Contact Details</p>
            </div>
          </div>

          <div className="w-full ">
            <div className="w-full">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Form.Item
                    label="Primary Contact"
                    name="primaryContact"
                    className
                    rules={[
                      {
                        message: "Please Select Primary Contact!",
                      },
                    ]}
                  >
                    <InputField placeholder="Enter Primary Contact" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Primary Email"
                    name="primaryEmail"
                    className
                    rules={[
                      {
                        message: "Please Select Primary Email!",
                      },
                    ]}
                  >
                    <InputField
                      placeholder="Enter Primary Email"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Secondary Email"
                    name="SecondaryEmail"
                    className
                    rules={[
                      {
                        message: "Please Select Secondary Email!",
                      },
                    ]}
                  >
                    <InputField
                      placeholder="Enter Secondary Email"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Birth Date"
                    name="birthDate"
                    rules={[{ message: "Please insert Birth Date" }]}
                  >
                    <DatePicker placeholder="Select Birth Date" size="large" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Form.Item
                    label="Country"
                    name="country"
                    className
                    rules={[
                      { required: true, message: "Please Select Country !" },
                    ]}
                  >
                    <SelectField placeholder="Select Category" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Step1BasicDetail;
