import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import InputField from "../components/InputField";
import { Button, Alert, Card, Divider } from "antd";
import { handlesetDefaultNavigation } from "../features/kyc/kycSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showAdminHint, setShowAdminHint] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    // Special case for admin login (temporary solution until backend is updated)
    if (data.username === "admin" && data.password === "admin123") {
      // Create a mock admin user response
      const adminUser = {
        message: "Login successful",
        user: {
          _id: "admin123", // Mock ID
          username: "admin",
          role: "admin",
        },
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(adminUser));

      // Update Redux state
      dispatch({
        type: "auth/loginUser/fulfilled",
        payload: adminUser,
      });

      // Navigate to admin dashboard
      navigate("/admin");
      dispatch(handlesetDefaultNavigation(false));
      return;
    }

    // Regular login flow
    dispatch(loginUser(data));
    dispatch(handlesetDefaultNavigation(true));
  };

  const setAdminCredentials = () => {
    setValue("username", "admin");
    setValue("password", "admin123");
    setShowAdminHint(true);
  };

  const setEmployeeCredentials = () => {
    setValue("username", "Bhavin");
    setValue("password", "Bhavin");
    setShowAdminHint(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/kyc");
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h3 className="text-2xl mb-6 font-bold text-center text-[#6B5DC7]">
          Welcome to KYC Form Application
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Username"
                placeholder="Enter username"
                error={errors.username?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Password"
                placeholder="Enter password"
                type="password"
                error={errors.password?.message}
              />
            )}
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {showAdminHint && (
            <Alert
              message="Admin Login"
              description="You're using admin credentials. Click login to access the admin dashboard."
              type="info"
              showIcon
              className="mb-4"
            />
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full !bg-[#6B5DC7] !h-10"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Divider>Quick Login</Divider>

          <div className="flex justify-between mt-4">
            <Button
              type="link"
              onClick={setAdminCredentials}
              className="text-[#6B5DC7]"
            >
              Use Admin Login
            </Button>
            <Button
              type="link"
              onClick={setEmployeeCredentials}
              className="text-[#6B5DC7]"
            >
              Use Employee Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
