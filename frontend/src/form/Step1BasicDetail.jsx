import React from "react";
import SelectField from "../components/SelectField";
import Form from "antd/es/form/Form";
import { Button, DatePicker, Input, Segmented } from "antd";
import InputField from "../components/InputField";
import TextArea from "antd/es/input/TextArea";

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
                    <SelectField placeholder="Select Country" />
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
                    className="mb-4"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      addonBefore="+91"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      size="large"
                      className="w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </Form.Item>
                </div>

                <div className="flex ">
                  <Form.Item
                    label="Phone No."
                    name="phone"
                    rules={[
                      { required: true, message: "Please Select Phone no. !" },
                    ]}
                  >
                    <div className="flex gap-2">
                      <InputField
                        className="!max-w-[46px]"
                        placeholder="CC"
                        type="text"
                      />
                      <InputField
                        className="!max-w-[60px]"
                        placeholder="NDC"
                        type="text"
                      />
                      <InputField
                        className="max-w-[150px]"
                        placeholder="123 456 789"
                        type="number"
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className="flex ">
                  <Form.Item
                    label="Fax No."
                    name="fax"
                    rules={[
                      { required: true, message: "Please Select Phone no. !" },
                    ]}
                  >
                    <div className="flex gap-2">
                      <InputField
                        className="!max-w-[46px]"
                        placeholder="CC"
                        type="text"
                      />
                      <InputField
                        className="!max-w-[60px]"
                        placeholder="NDC"
                        type="text"
                      />
                      <InputField
                        className="max-w-[150px]"
                        placeholder="123 456 789"
                        type="number"
                      />
                    </div>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Other Details  */}
        <div className="flex mt-5  border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <div>
              <p className="font-semibold text-xl">Other Details</p>
            </div>
          </div>

          <div className="w-full ">
            <div className="w-full">
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Form.Item
                    label="Sales Person/Country"
                    name="salesPersonCountry"
                    className
                    rules={[{ message: "Please Select Employee !" }]}
                  >
                    <SelectField placeholder="Select Employee" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Assistant Sales Person"
                    name="assistantSalesPerson"
                    className
                    rules={[
                      {
                        message: "Please Select Assistant Sales Person !",
                      },
                    ]}
                  >
                    <SelectField placeholder="Select Assistant Sales Person" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Remark"
                    name="remark"
                    className
                    rules={[
                      {
                        message: "Please enter remark!",
                      },
                    ]}
                  >
                    <TextArea
                      className="!h-[40px] "
                      placeholder="Enter Remarks"
                      type="text"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Registration Date"
                    name="registrationDate"
                    rules={[{ message: "Please insert Birth Date" }]}
                  >
                    <DatePicker placeholder="Select Date" size="large" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Form.Item
                    label="Department"
                    name="department"
                    className
                    rules={[{ message: "Please Select Department !" }]}
                  >
                    <SelectField
                      className="!max-w-[580px]"
                      placeholder="Select Department"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-end items-center">
          <Form.Item>
            <Button
              className="!bg-[#6B5DC7] !font-semibold  !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
              htmlType="submit"
            >
              Save & Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
              htmlType="submit"
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="!bg-[#E2E2E2] !font-semibold  !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
              htmlType="submit"
            >
              Close
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Step1BasicDetail;
