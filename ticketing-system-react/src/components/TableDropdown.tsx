import React, { useState } from "react";
import { Link } from "react-router-dom";

type TableDropdownProps = {
  setViewUserData: (id: number) => Promise<void>;
  setEditUser: (id: number) => Promise<void>;
  userId: number;
  userEmail: string;
};

const TableDropdown = ({
  setViewUserData,
  setEditUser,
  userId,
  userEmail,
}: TableDropdownProps) => {
  const [show, setShow] = useState("hidden");

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  return (
    <>
      <span
        className="text-gray-500 py-1 px-3 cursor-pointer"
        onClick={clickCollapse}
      >
        <i className="fas fa-ellipsis-v" onClick={clickCollapse}></i>
      </span>
      <div
        className={
          "bg-white absolute text-base mr-10 right-0.5 list-none text-left rounded shadow-lg w-60 " +
          show
        }
      >
        <span
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
          }
          onClick={() => {
            setViewUserData(userId);
            clickCollapse();
          }}
        >
          View
        </span>
        <span
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
          }
          onClick={(e) => {
            setEditUser(userId);
            clickCollapse();
          }}
        >
          Edit
        </span>
        <Link
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
          }
          to={`/backend/user-tickets/view/${userEmail}`}
        >
          View Ticket's
        </Link>
        <span
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
          }
          onClick={(e) => e.preventDefault()}
        >
          Activate/Deactivate
        </span>
      </div>
    </>
  );
};

export default TableDropdown;
