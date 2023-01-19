import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
const JobProtectComp = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  return user?.job?.name === "Q.A" ? (
    <Outlet />
  ) : (
    <Navigate to="/backend/unauthorized" state={{ from: location }} replace />
  );
};

export default JobProtectComp;
