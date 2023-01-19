import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { RoleInterface } from "../models/Role";

type RoleProtectCompProps = {
  allowedRoles: string[];
  allowedJobs: string[] | null;
};

const RoleProtectComp = ({
  allowedRoles,
  allowedJobs = null,
}: RoleProtectCompProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  return user?.roles?.find((role: RoleInterface) =>
    allowedRoles?.includes(role.name)
  ) ? (
    <Outlet />
  ) : allowedJobs && allowedJobs?.includes(user?.job?.name!) ? (
    <Outlet />
  ) : (
    <Navigate to="/backend/unauthorized" state={{ from: location }} replace />
  );
};

export default RoleProtectComp;
