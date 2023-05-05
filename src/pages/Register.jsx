import { PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [register] = useRegisterMutation();
  const nav = useNavigate();
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { name, email, password, password_confirmation };
      const { data } = await register(user);
      if (data?.success) {
        nav("/login");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={registerHandler}
        className=" w-96 p-7 flex flex-col shadow-lg gap-10"
      >
        <h2 className="text-2xl text-gray-500 font-semibold">Register</h2>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name..."
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email..."
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password..."
        />
        <PasswordInput
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
        />
        <div className="text-gray-700 font-medium flex items-center gap-3">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p className=" cursor-pointer">Login</p>
          </Link>
        </div>
        <button type="submit" className=" bg-blue-700 text-white px-4 py-1">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
