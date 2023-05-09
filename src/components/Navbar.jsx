import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) {
      nav("/login");
    }
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
