import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8" : null,
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data } = await login(values);
          dispatch(addUser({ user: data?.user, token: data?.token }));
          if (data?.success) {
            nav("/");
          }
          console.log(data);
        })}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold">Login</h2>

        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your Email..."
        />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder="Enter your Password..."
        />
        <div className="text-gray-700 font-medium flex items-center gap-3">
          <p>Don't have an account?</p>
          <Link to={"/register"}>
            <p className=" cursor-pointer">register</p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1"
        >
          {isLoading ? (
            <Loader color="white" className="mx-auto" size="sm" />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
