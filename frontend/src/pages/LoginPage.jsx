import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    register,
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
    dispatch(loginUser(data)); // dispatch thunk instead of console.log
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/kyc");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-1"
      >
        <h3 className="text-2xl mb-2.5 font-bold">
          Welcome back to Login Page
        </h3>

        <InputField
          label="Username"
          name="username"
          placeholder="Enter a username"
          register={register}
          error={errors.username}
          control={control}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter a password"
          register={register}
          error={errors.password}
          control={control}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
