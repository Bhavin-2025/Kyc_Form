import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import InputField from "../components/InputField";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/kyc");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="main-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-1 mt-45"
      >
        <h3 className="text-2xl mb-2.5 font-bold">
          Welcome back to Login Page
        </h3>
        <div>
          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Username"
                placeholder="Enter a username"
                error={errors.username}
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
                type="password"
                placeholder="Enter a password"
                error={errors.password}
              />
            )}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#6B5DC7] text-white rounded-2xl px-6 py-1.5 cursor-pointer mt-4 hover:bg-[#493d93] disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
