import React from "react";
import { Link } from "react-router-dom";
import { UserInterface } from "../models/User";
import {
  ActionCreatorWithPayload,
  AnyAction,
  Dispatch,
  ThunkDispatch,
} from "@reduxjs/toolkit";

type SideBarLinkProps = {
  user: UserInterface | null;
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>;
  SET_PAGE: ActionCreatorWithPayload<string, string>;
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
};

const SideBarLink = ({
  user,
  dispatch,
  SET_PAGE,
  setCollapseShow,
}: SideBarLinkProps) => {
  return user?.roles?.find(({ name }) =>
    ["Admin", "Super Admin"].includes(name)
  ) ? (
    <>
      <li
        className="items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend"
          onClick={() => {
            setCollapseShow("hidden");
            dispatch(SET_PAGE("DashBoard"));
          }}
        >
          Dashboard
        </Link>
      </li>
      <li
        className="items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/tickets"
          onClick={() => {
            setCollapseShow("hidden");
            dispatch(SET_PAGE("All Ticket's"));
          }}
        >
          Tickets
        </Link>
      </li>
      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/open-tickets"
          onClick={() => {
            dispatch(SET_PAGE("All Open Ticket's"));
            setCollapseShow("hidden");
          }}
        >
          Open Tickets
        </Link>
      </li>
      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/users"
          onClick={() => {
            dispatch(SET_PAGE("All User's"));
            setCollapseShow("hidden");
          }}
        >
          Users
        </Link>
      </li>
      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/profile"
          onClick={() => {
            dispatch(SET_PAGE("My Profile"));
            setCollapseShow("hidden");
          }}
        >
          Profile
        </Link>
      </li>
    </>
  ) : (
    <>
      {/* user */}
      <li
        className="items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/user"
          onClick={() => {
            dispatch(SET_PAGE("DashBoard"));
            setCollapseShow("hidden");
          }}
        >
          Dashboard
        </Link>
      </li>
      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/user/tickets-list/all"
          onClick={() => {
            dispatch(SET_PAGE("My Open Ticket's"));
            setCollapseShow("hidden");
          }}
        >
          Tickets All
        </Link>
      </li>
      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/user/tickets"
          onClick={() => {
            dispatch(SET_PAGE("My All Ticket's"));
            setCollapseShow("hidden");
          }}
        >
          Tickets
        </Link>
      </li>
      {user?.job?.name === "Q.A" && (
        <li
          className="items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
      transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
        >
          <Link
            to="/backend/user/qa-tickets"
            onClick={() => {
              dispatch(SET_PAGE("My All Ticket's for QA"));
              setCollapseShow("hidden");
            }}
          >
            QA Tickets
          </Link>
        </li>
      )}
      {(["Admin", "Super Admin"].includes(user?.roles?.[0]?.name!) ||
        user?.job?.name === "Q.A") && (
        <li
          className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
        transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
        >
          <Link
            to="/backend/open-tickets"
            onClick={() => {
              dispatch(SET_PAGE("My Open Ticket's"));
              setCollapseShow("hidden");
            }}
          >
            Open Tickets
          </Link>
        </li>
      )}

      <li
        className=" items-center text-sm md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link
          to="/backend/user/profile"
          onClick={() => {
            dispatch(SET_PAGE("My Open Profile"));
            setCollapseShow("hidden");
          }}
        >
          Profile
        </Link>
      </li>
    </>
  );
};

export default SideBarLink;
