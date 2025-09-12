// import React from "react";
// import SelectField from "../components/SelectField";
// import Form from "antd/es/form/Form";
// import { Button, DatePicker, Input } from "antd";
// import InputField from "../components/InputField";
// import TextArea from "antd/es/input/TextArea";

// const Step1BasicDetail = () => {
//   const [form] = Form.useForm();
//   const variant = Form.useWatch("variant", form);

//   return (
//     <div className=" main-container">
//       <Form
//         form={form}
//         variant={variant || "outlined"}
//         initialValues={{ variant: "outlined" }}
//         layout="vertical"
//       >
//         {/* Category Details */}
//         <div className="flex border-b border-[#D9D9D9]  mt-5">
//           <div className="w-full max-w-[210px]">
//             <p className="font-semibold text-xl">Category Details</p>
//             <div className="flex item-center gap-2 mt-1">
//               <p className="flex items-center text-xs font-medium">
//                 Party Code
//               </p>
//               <span className=" bg-[#6B5DC7] text-white font-medium px-2.5 py-1.5 rounded-lg text-sm">
//                 P123456
//               </span>
//             </div>
//           </div>
//           <div className="w-full">
//             <div className="grid grid-cols-4 gap-6">
//               <Form.Item
//                 label="Category"
//                 name="category"
//                 rules={[{ required: true, message: "Please select category!" }]}
//               >
//                 <SelectField placeholder="Select Category" />
//               </Form.Item>

//               <Form.Item
//                 label="Company/Individual"
//                 name="companyIndividual"
//                 rules={[
//                   { required: true, message: "Please enter name!" },
//                   { min: 3, message: "Must be at least 3 characters" },
//                   {
//                     pattern: /^[a-zA-Z\s]+$/,
//                     message: "Only letters and spaces allowed",
//                   },
//                 ]}
//               >
//                 <InputField placeholder="Enter Name" />
//               </Form.Item>

//               <Form.Item
//                 label="Business Type"
//                 name="business"
//                 rules={[
//                   { required: true, message: "Please select business type!" },
//                 ]}
//               >
//                 <SelectField placeholder="Select Business Type" />
//               </Form.Item>

//               <Form.Item
//                 label="GST No"
//                 name="gst"
//                 rules={[
//                   { required: true, message: "Please enter GST No" },
//                   {
//                     pattern:
//                       /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
//                     message: "Enter a valid GSTIN (15 characters)",
//                   },
//                 ]}
//               >
//                 <InputField placeholder="Enter GST No" />
//               </Form.Item>
//             </div>
//           </div>
//         </div>

//         {/* Contact Details */}
//         <div className="flex mt-5 border-b border-[#D9D9D9]">
//           <div className="w-full max-w-[210px]">
//             <p className="font-semibold text-xl">Contact Details</p>
//           </div>
//           <div className="w-full">
//             <div className="grid grid-cols-4 gap-6">
//               <Form.Item
//                 label="Primary Contact"
//                 name="primaryContact"
//                 rules={[
//                   { required: true, message: "Please enter primary contact!" },
//                   { min: 3, message: "Must be at least 3 characters" },
//                   {
//                     pattern: /^[a-zA-Z\s]+$/,
//                     message: "Only letters and spaces allowed",
//                   },
//                 ]}
//               >
//                 <InputField placeholder="Enter Primary Contact" />
//               </Form.Item>

//               <Form.Item
//                 label="Primary Email"
//                 name="primaryEmail"
//                 rules={[
//                   { required: true, message: "Please enter email!" },
//                   { type: "email", message: "Enter valid email address" },
//                 ]}
//               >
//                 <InputField placeholder="Enter Primary Email" type="email" />
//               </Form.Item>

//               <Form.Item
//                 label="Secondary Email"
//                 name="secondaryEmail"
//                 rules={[
//                   { type: "email", message: "Enter valid email address" },
//                 ]}
//               >
//                 <InputField placeholder="Enter Secondary Email" type="email" />
//               </Form.Item>

//               <Form.Item
//                 label="Birth Date"
//                 name="birthDate"
//                 rules={[
//                   { required: true, message: "Please select Birth Date" },
//                 ]}
//               >
//                 <DatePicker placeholder="Select Birth Date" size="large" />
//               </Form.Item>
//             </div>

//             <div className="grid grid-cols-4 gap-6">
//               <Form.Item
//                 label="Country"
//                 name="country"
//                 rules={[{ required: true, message: "Please select country!" }]}
//               >
//                 <SelectField placeholder="Select Country" />
//               </Form.Item>

//               <Form.Item
//                 label="Mobile Number"
//                 name="mobile"
//                 rules={[
//                   { required: true, message: "Please enter mobile number!" },
//                   {
//                     pattern: /^[6-9]\d{9}$/,
//                     message: "Enter a valid 10-digit Indian mobile number",
//                   },
//                 ]}
//               >
//                 <InputField
//                   addonBefore="+91"
//                   placeholder="Enter Mobile Number"
//                   maxLength={10}
//                   size="large"
//                   type="number"
//                   className="w-full rounded-md border-gray-300  no-spinner"
//                 />
//               </Form.Item>

//               {/* 📞 Phone No. (Mandatory) */}
//               <Form.Item label="Phone No." required>
//                 <Input.Group compact className="flex gap-2">
//                   <Form.Item
//                     name={["phone", "cc"]}
//                     noStyle
//                     rules={[
//                       { required: true, message: "Country Code is required" },
//                       {
//                         pattern: /^\d{1,4}$/,
//                         message: "Country Code must be 1–4 digits",
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="!max-w-[46px] no-spinner"
//                       placeholder="CC"
//                       type="number"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name={["phone", "ndc"]}
//                     noStyle
//                     rules={[
//                       { required: true, message: "NDC is required" },
//                       {
//                         pattern: /^\d{1,5}$/,
//                         message: "NDC must be 1–5 digits",
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="!max-w-[60px] no-spinner"
//                       placeholder="NDC"
//                       type="number"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name={["phone", "number"]}
//                     noStyle
//                     rules={[
//                       { required: true, message: "Phone number is required" },
//                       {
//                         pattern: /^\d{10}$/,
//                         message: "Number must be 10 digits",
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="max-w-[150px] no-spinner"
//                       placeholder="12345678"
//                       type="number"
//                     />
//                   </Form.Item>
//                 </Input.Group>
//               </Form.Item>

//               {/* 📠 Fax No. (Optional, but strict if filled) */}
//               <Form.Item label="Fax No.">
//                 <Input.Group compact className="flex gap-2">
//                   <Form.Item
//                     name={["fax", "cc"]}
//                     noStyle
//                     rules={[
//                       {
//                         validator: (_, value) => {
//                           if (!value) return Promise.resolve();
//                           if (!/^\d{1,4}$/.test(value)) {
//                             return Promise.reject(
//                               "Country Code must be 1–4 digits"
//                             );
//                           }
//                           return Promise.resolve();
//                         },
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="!max-w-[46px] no-spinner"
//                       placeholder="CC"
//                       type="number"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name={["fax", "ndc"]}
//                     noStyle
//                     rules={[
//                       {
//                         validator: (_, value) => {
//                           if (!value) return Promise.resolve();
//                           if (!/^\d{1,5}$/.test(value)) {
//                             return Promise.reject("NDC must be 1–5 digits");
//                           }
//                           return Promise.resolve();
//                         },
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="!max-w-[60px] no-spinner"
//                       placeholder="NDC"
//                       type="number"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     name={["fax", "number"]}
//                     noStyle
//                     rules={[
//                       {
//                         validator: (_, value) => {
//                           if (!value) return Promise.resolve();
//                           if (!/^\d{10}$/.test(value)) {
//                             return Promise.reject("Number must be 10 digits");
//                           }
//                           return Promise.resolve();
//                         },
//                       },
//                     ]}
//                   >
//                     <Input
//                       className="max-w-[150px] no-spinner"
//                       placeholder="12345678"
//                       type="number"
//                     />
//                   </Form.Item>
//                 </Input.Group>
//               </Form.Item>
//             </div>
//           </div>
//         </div>

//         {/* Other Details */}
//         <div className="flex mt-5 border-[#D9D9D9]">
//           <div className="w-full max-w-[210px]">
//             <p className="font-semibold text-xl">Other Details</p>
//           </div>
//           <div className="w-full">
//             <div className="grid grid-cols-4 gap-6">
//               <Form.Item
//                 label="Sales Person/Country"
//                 name="salesPersonCountry"
//                 rules={[{ required: true, message: "Please select Employee!" }]}
//               >
//                 <SelectField placeholder="Select Employee" />
//               </Form.Item>

//               <Form.Item
//                 label="Assistant Sales Person"
//                 name="assistantSalesPerson"
//               >
//                 <SelectField placeholder="Select Assistant Sales Person" />
//               </Form.Item>

//               <Form.Item
//                 label="Remark"
//                 name="remark"
//                 rules={[{ required: true, message: "Please enter remark!" }]}
//               >
//                 <TextArea className="!h-[40px]" placeholder="Enter Remarks" />
//               </Form.Item>

//               <Form.Item
//                 label="Registration Date"
//                 name="registrationDate"
//                 rules={[{ required: true, message: "Please select date!" }]}
//               >
//                 <DatePicker placeholder="Select Date" size="large" />
//               </Form.Item>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <Form.Item
//                 label="Department"
//                 name="department"
//                 rules={[
//                   { required: true, message: "Please select department!" },
//                 ]}
//               >
//                 <SelectField
//                   className="!max-w-[580px]"
//                   placeholder="Select Department"
//                 />
//               </Form.Item>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-5 justify-end items-center">
//           <Form.Item>
//             <Button
//               className="!bg-[#6B5DC7] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
//               htmlType="submit"
//             >
//               Save & Next
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button
//               className="!bg-[#BEBEBE] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
//               htmlType="submit"
//             >
//               Save
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button
//               className="!bg-[#696774] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
//               htmlType="reset"
//             >
//               Reset
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button
//               className="!bg-[#E2E2E2] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
//               htmlType="button"
//             >
//               Close
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default Step1BasicDetail;

import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import SelectField from "../components/SelectField";
import Form from "antd/es/form/Form";
import { Button, DatePicker, Input, message } from "antd";
import InputField from "../components/InputField";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Step1BasicDetail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const variant = Form.useWatch("variant", form);
  const [categories, setCategories] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [salesPerson, setSalesPerson] = useState([]);
  const [assistantSalesPerson, setAssistantSalesPerson] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoryRes = await axiosInstance.get("/master/category");
        setCategories(categoryRes.data);

        const businessRes = await axiosInstance.get("/master/businessType");
        setBusinessTypes(businessRes.data);
        const countryRes = await axiosInstance.get("/master/country");
        setCountries(countryRes.data);

        const deptRes = await axiosInstance.get("/master/department");
        setDepartments(deptRes.data);
        const salesPerRes = await axiosInstance.get("/master/salesPerson");
        setSalesPerson(salesPerRes.data);
        const assistantSalesPerRes = await axiosInstance.get(
          "/master/assistantSalesPerson"
        );
        setAssistantSalesPerson(assistantSalesPerRes.data);
      } catch (err) {
        console.error("Error fetching options", err);
      }
    };
    fetchOptions();
  }, []);

  const onFinish = async (values) => {
    try {
      // transform mobile if user used simple mobile input (string)
      let payload = { ...values };

      // MOBILE: if mobile is string (old UI) -> convert to object
      if (
        typeof values.mobile === "string" ||
        typeof values.mobile === "number"
      ) {
        payload.mobile = {
          countryCode: "+91", // UI shows +91 fixed
          number: String(values.mobile).trim(),
        };
      } else if (!values.mobile) {
        payload.mobile = undefined;
      }

      // PHONE & FAX: AntD uses nested fields for phone/fax (if present)
      // Ensure we send objects with cc, ndc, number (if user filled parts separately)
      if (values.phone) {
        payload.phone = {
          cc: values.phone.cc ? String(values.phone.cc).trim() : undefined,
          ndc: values.phone.ndc ? String(values.phone.ndc).trim() : undefined,
          number: values.phone.number
            ? String(values.phone.number).trim()
            : undefined,
        };
      }

      if (values.fax) {
        payload.fax = {
          cc: values.fax.cc ? String(values.fax.cc).trim() : undefined,
          ndc: values.fax.ndc ? String(values.fax.ndc).trim() : undefined,
          number: values.fax.number
            ? String(values.fax.number).trim()
            : undefined,
        };
      }

      // If birthDate/registrationDate are Moment objects, convert to ISO strings
      if (values.birthDate && values.birthDate.toISOString) {
        payload.birthDate = values.birthDate.toISOString();
      }
      if (values.registrationDate && values.registrationDate.toISOString) {
        payload.registrationDate = values.registrationDate.toISOString();
      }

      // For now: generate a temporary username/password if not present (depends on your flow).
      // If your app has dedicated auth fields elsewhere, remove this. Here we add placeholders:
      if (!payload.username)
        payload.username = payload.companyIndividual || `user_${Date.now()}`;
      if (!payload.password)
        payload.password = Math.random().toString(36).slice(-8); // temp password

      // Dispatch register thunk
      const resultAction = await dispatch(registerUser(payload));
      if (registerUser.fulfilled.match(resultAction)) {
        message.success("Saved and synced with server");
        // optionally redirect or move next
      } else {
        const err = resultAction.payload || resultAction.error?.message;
        message.error(`Save failed: ${err}`);
      }
    } catch (err) {
      console.error("onFinish error", err);
      message.error("Unexpected error. Check console.");
    }
  };

  const onFinishFailed = (err) => {
    console.log("Validation Failed:", err);
    message.error("Please correct the errors before submitting.");
  };

  return (
    <div className=" main-container">
      <Form
        form={form}
        variant={variant || "outlined"}
        initialValues={{ variant: "outlined" }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Category Details */}
        <div className="flex border-b border-[#D9D9D9]  mt-5">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Category Details</p>
            <div className="flex item-center gap-2 mt-1">
              <p className="flex items-center text-xs font-medium">
                Party Code
              </p>
              <span className=" bg-[#6B5DC7] text-white font-medium px-2.5 py-1.5 rounded-lg text-sm">
                P123456
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <SelectField
                  placeholder="Select Category"
                  options={categories.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Company/Individual"
                name="companyIndividual"
                rules={[
                  { required: true, message: "Please enter name!" },
                  { min: 3, message: "Must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Only letters and spaces allowed",
                  },
                ]}
              >
                <InputField placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                label="Business Type"
                name="business"
                rules={[
                  { required: true, message: "Please select business type!" },
                ]}
              >
                <SelectField
                  placeholder="Select Business Type"
                  options={businessTypes.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="GST No"
                name="gst"
                rules={[
                  { required: true, message: "Please enter GST No" },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Enter a valid GSTIN (15 characters)",
                  },
                ]}
              >
                <InputField placeholder="Enter GST No" />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex mt-5 border-b border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Contact Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Primary Contact"
                name="primaryContact"
                rules={[
                  { required: true, message: "Please enter primary contact!" },
                  { min: 3, message: "Must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z\s]+$/,
                    message: "Only letters and spaces allowed",
                  },
                ]}
              >
                <InputField placeholder="Enter Primary Contact" />
              </Form.Item>

              <Form.Item
                label="Primary Email"
                name="primaryEmail"
                rules={[
                  { required: true, message: "Please enter email!" },
                  { type: "email", message: "Enter valid email address" },
                ]}
              >
                <InputField placeholder="Enter Primary Email" type="email" />
              </Form.Item>

              <Form.Item
                label="Secondary Email"
                name="secondaryEmail"
                rules={[
                  { type: "email", message: "Enter valid email address" },
                ]}
              >
                <InputField placeholder="Enter Secondary Email" type="email" />
              </Form.Item>

              <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[
                  { required: true, message: "Please select Birth Date" },
                ]}
              >
                <DatePicker placeholder="Select Birth Date" size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please select country!" }]}
              >
                <SelectField
                  placeholder="Select Country"
                  options={countries.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="mobile" // keep UI same (string). onFinish we transform to object
                rules={[
                  { required: true, message: "Please enter mobile number!" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit Indian mobile number",
                  },
                ]}
              >
                <InputField
                  addonBefore="+91"
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  size="large"
                  type="number"
                  className="w-full rounded-md border-gray-300  no-spinner"
                />
              </Form.Item>

              {/* Phone No. (split fields) */}
              <Form.Item label="Phone No." required>
                <Input.Group compact className="flex gap-2">
                  <Form.Item
                    name={["phone", "cc"]}
                    noStyle
                    rules={[
                      { required: true, message: "Country Code is required" },
                      {
                        pattern: /^\d{1,4}$/,
                        message: "Country Code must be 1–4 digits",
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[46px] no-spinner"
                      placeholder="CC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["phone", "ndc"]}
                    noStyle
                    rules={[
                      { required: true, message: "NDC is required" },
                      {
                        pattern: /^\d{1,5}$/,
                        message: "NDC must be 1–5 digits",
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[60px] no-spinner"
                      placeholder="NDC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["phone", "number"]}
                    noStyle
                    rules={[
                      { required: true, message: "Phone number is required" },
                      {
                        pattern: /^\d{10}$/,
                        message: "Number must be 10 digits",
                      },
                    ]}
                  >
                    <Input
                      className="max-w-[150px] no-spinner"
                      placeholder="12345678"
                      type="number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              {/* Fax */}
              <Form.Item label="Fax No.">
                <Input.Group compact className="flex gap-2">
                  <Form.Item
                    name={["fax", "cc"]}
                    noStyle
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          if (!/^\d{1,4}$/.test(String(value))) {
                            return Promise.reject(
                              "Country Code must be 1–4 digits"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[46px] no-spinner"
                      placeholder="CC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["fax", "ndc"]}
                    noStyle
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          if (!/^\d{1,5}$/.test(String(value))) {
                            return Promise.reject("NDC must be 1–5 digits");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="!max-w-[60px] no-spinner"
                      placeholder="NDC"
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name={["fax", "number"]}
                    noStyle
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          if (!/^\d{10}$/.test(String(value))) {
                            return Promise.reject("Number must be 10 digits");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="max-w-[150px] no-spinner"
                      placeholder="12345678"
                      type="number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Other Details */}
        <div className="flex mt-5 border-[#D9D9D9]">
          <div className="w-full max-w-[210px]">
            <p className="font-semibold text-xl">Other Details</p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-6">
              <Form.Item
                label="Sales Person/Country"
                name="salesPersonCountry"
                rules={[{ required: true, message: "Please select Employee!" }]}
              >
                <SelectField
                  placeholder="Select Employee"
                  options={salesPerson.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Assistant Sales Person"
                name="assistantSalesPerson"
              >
                <SelectField
                  placeholder="Select Assistant Sales Person"
                  options={assistantSalesPerson.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ required: true, message: "Please enter remark!" }]}
              >
                <TextArea className="!h-[40px]" placeholder="Enter Remarks" />
              </Form.Item>

              <Form.Item
                label="Registration Date"
                name="registrationDate"
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <DatePicker placeholder="Select Date" size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select department!" },
                ]}
              >
                <SelectField
                  className="!max-w-[580px]"
                  placeholder="Select Department"
                  options={departments.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end items-center mt-6">
          <Form.Item>
            <Button
              className="!bg-[#6B5DC7] !font-semibold !w-[124px] !px-5 !py-3 !rounded-[10px] !text-white"
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
              htmlType="reset"
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="!bg-[#E2E2E2] !font-semibold !w-[124px] !px-5 !py-4 !rounded-[10px] !text-black"
              htmlType="button"
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
