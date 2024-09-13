import React from "react";
import { useDispatch } from "react-redux";
import service from "../../appwrite/configure";
import authSlice, { logout } from "../../store/authSlice";
import authservice from "../../appwrite/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="ml-auto inline">
      <button onClick={() => handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutBtn;
