import React from "react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.authSlice.user);
  const token = useSelector((state) => state.authSlice.token);
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const logoutHandler = async () => {
    const data = await logout(token);
    console.log(data);
    nav("/login");
  };
  return (
    <div>
      <div className="p-7 flex justify-around items-center shadow-lg">
        <h2>MMS</h2>
        <div className="flex items-center gap-3">
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
