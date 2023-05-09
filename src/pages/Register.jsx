import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) => (value ? null : "Name must have at least 2 letters"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8 ? null : "Password must have at least 8",
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data } = await register(values);
          if (data?.success) {
            nav("/login");
          }
          console.log(data);
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold">Register</h2>
        <TextInput
          placeholder="Enter your Name..."
          {...form.getInputProps("name")}
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your Email..."
        />
        <PasswordInput
          placeholder="Enter your Password..."
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Confirm Password"
          {...form.getInputProps("password_confirmation")}
        />
        <div className="text-gray-700 font-medium flex items-center gap-3">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className=" cursor-pointer">Login</p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader color="white" size="sm" className="mx-auto" />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
