import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SET_LOGOUT } from "../store/user/userSlice";

const ProtectedComp = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { auth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!auth || !user) {
      dispatch(SET_LOGOUT());
      <Navigate to="/" state={{ from: location }} replace />;
    }
  }, [dispatch, location, auth, user]);

  if (user && auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedComp;
