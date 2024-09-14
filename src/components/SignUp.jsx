import React, { useState } from "react";
import authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    try {
      setError("");
      const userData = await authservice.createAccount(data);
      if (userData) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(create)}>
      <div>
        <div className="flex justify-center">
          <Logo width="100px" />
        </div>
        <Input
          label="Name"
          placeholder="Enter your name"
          type="text"
          {...register("name", { required: true })}
          error={errors.name?.message}
        />
      </div>
      <div>
        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
          error={errors.email?.message}
        />
      </div>
      <div>
        <Input
          label="Password"
          type="password"
          {...register("password", { required: true })}
          error={errors.password?.message}
        />
      </div>
      <div>
        <Button type="submit">Create Account</Button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;

