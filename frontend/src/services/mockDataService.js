// frontend/src/services/mockDataService.js

// Mock data for development when API is not available
export const getMockKycData = () => {
  return [
    {
      id: "kyc-1",
      userId: "user-1",
      username: "johndoe",
      category: "Individual",
      business: "Retail",
      email: "john.doe@example.com",
      mobile: "9876543210",
      role: "employee",
      createdAt: new Date().toISOString()
    },
    {
      id: "kyc-2",
      userId: "user-2",
      username: "janesmith",
      category: "Corporate",
      business: "Technology",
      email: "jane.smith@example.com",
      mobile: "9876543211",
      role: "employee",
      createdAt: new Date().toISOString()
    },
    {
      id: "kyc-3",
      userId: "user-3",
      username: "robertjohnson",
      category: "Individual",
      business: "Wholesale",
      email: "robert.johnson@example.com",
      mobile: "9876543212",
      role: "employee",
      createdAt: new Date().toISOString()
    }
  ];
};

export const getMockUserData = () => {
  return [
    {
      _id: "user-1",
      username: "johndoe",
      role: "employee",
      createdAt: new Date().toISOString()
    },
    {
      _id: "user-2",
      username: "janesmith",
      role: "employee",
      createdAt: new Date().toISOString()
    },
    {
      _id: "user-3",
      username: "robertjohnson",
      role: "employee",
      createdAt: new Date().toISOString()
    },
    {
      _id: "admin-1",
      username: "admin",
      role: "admin",
      createdAt: new Date().toISOString()
    }
  ];
};

export const getMockKycDetail = (userId) => {
  const mockKycData = getMockKycData();
  const kycRecord = mockKycData.find(kyc => kyc.userId === userId);
  
  if (!kycRecord) {
    return null;
  }
  
  // Create a more detailed record for the form
  return {
    _id: kycRecord.id,
    category: kycRecord.category,
    companyIndividual: kycRecord.username,
    business: kycRecord.business,
    gst: "29AADCB2230M1ZP",
    primaryContact: kycRecord.username,
    primaryEmail: kycRecord.email,
    secondaryEmail: `alt.${kycRecord.email}`,
    birthDate: new Date("1990-01-15").toISOString(),
    country: "india",
    mobile: {
      countryCode: "+91",
      number: kycRecord.mobile
    },
    phone: {
      cc: "91",
      ndc: "022",
      number: "28574839"
    },
    salesPersonCountry: "rajesh",
    assistantSalesPerson: "mike",
    remark: "Sample data for development",
    registrationDate: new Date().toISOString(),
    department: "finance",
    currency: "USD",
    dayTerm: 30,
    termName: "Net 30",
    ext: 5,
    rap: 3,
    extra: 2,
    creditLimit: 10000,
    memoLimit: 5000,
    party: "na",
    broker: "geojit",
    term: "full_consent",
    role: kycRecord.role,
    username: kycRecord.username,
    email: kycRecord.email,
    password: "securepass123",
    confirmPassword: "securepass123",
    mobileLogin: kycRecord.mobile,
    location: "mumbai",
    mumbai: 5,
    hongkong: 3,
    newyork: 2,
    belgium: 1,
    addresses: [{
      addressType: "office",
      companyName: "ABC Corp",
      contactNo: kycRecord.mobile,
      unit: "4B",
      building: "Tech Park",
      street: "Main Street",
      landmark: "Near City Mall",
      area: "Downtown",
      countryAddress: "india",
      state: "maharashtra",
      city: "mumbai",
      postalCode: "400001"
    }],
    createdBy: userId
  };
};

// Mock function to simulate saving KYC data
export const mockSaveKyc = (data) => {
  console.log("Mock saving KYC data:", data);
  return {
    success: true,
    message: "KYC data saved successfully",
    data: {
      ...data,
      _id: data._id || `mock-kyc-${Date.now()}`
    }
  };
};

## 6. Update the axiosInstance to use mock data when API fails

```javascript
// frontend/src/api/axiosInstance.js

import axios from "axios";
import { getMockKycData, getMockUserData, getMockKycDetail, mockSaveKyc } from "../services/mockDataService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle API failures with mock data
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development' || !import.meta.env.VITE_API_URL) {
      console.warn('API error, using mock data:', error.message);
      
      // Get the request URL and method
      const url = error.config.url;
      const method = error.config.method;
      
      // Mock responses based on the request
      if (url.includes('/kyc/all') && method === 'get') {
        return Promise.resolve({ data: { kycData: getMockKycData() } });
      }
      
      if (url.includes('/kyc/users') && method === 'get') {
        return Promise.resolve({ data: { users: getMockUserData() } });
      }
      
      if (url.match(/\/kyc\/basic-detail\/[^/]+$/) && method === 'get') {
        const userId = url.split('/').pop();
        const kycDetail = getMockKycDetail(userId);
        
        if (kycDetail) {
          return Promise.resolve({ data: { basicDetail: kycDetail } });
        }
        return Promise.reject({ response: { status: 404, data: { message: "No KYC data found" } } });
      }
      
      if (url.includes('/kyc/basic-detail') && method === 'post') {
        const result = mockSaveKyc(error.config.data);
        return Promise.resolve({ data: result });
      }
      
      // For master data endpoints, return empty arrays to prevent errors
      if (url.includes('/master/')) {
        return Promise.resolve({ data: [] });
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
