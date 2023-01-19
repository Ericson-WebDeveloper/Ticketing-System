import React from "react";
import { DatasWPagesState } from "../models/DatawPages";
import { UserInterface } from "../models/User";
import TableDropdown from "./TableDropdown";

type TableProps = {
  color: string;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  setViewUserData: (id: number) => Promise<void>;
  setEditUser: (id: number) => Promise<void>;
  users: DatasWPagesState<UserInterface> | null;
};

const Table = ({
  color,
  title,
  setModal,
  setViewUserData,
  setEditUser,
  users,
}: TableProps) => {
  return (
    <>
      <div
        className={`font-semibold text-lg 
        ${color === "light" ? "text-gray-700" : "text-white"}`}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={`font-semibold text-lg 
                ${color === "light" ? "text-gray-700" : "text-white"}`}
              >
                {title} Tables{" "}
                <button
                  className="p-1 px-2 bg-green-600 text-white rounded-lg hover:bg-green-400"
                  onClick={() => setModal("block")}
                >
                  Add New User
                </button>
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                >
                  Role
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                >
                  Job
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                >
                  Photo
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                >
                  Employee No
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                    color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-blue-800 text-blue-300 border-blue-700"
                  }`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user: UserInterface, index: number) => {
                return (
                  <tr key={index} className=" items-center">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span
                        className={
                          "ml-3 font-bold " +
                          (color === "light" ? "text-gray-600" : "text-white")
                        }
                      >
                        {user?.name}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user?.roles?.[0].name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user?.job?.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex">
                        <img
                          src={
                            user?.detail?.profile_img ??
                            `https://via.placeholder.com/300/FF0000/FFFFFF?text=${
                              user?.name.split(" ")[0]
                            }`
                          }
                          alt="..."
                          className="w-24 h-24 rounded-full border-2 border-gray-50 shadow"
                        ></img>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        {user?.detail?.employee_no}
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown
                        setViewUserData={setViewUserData}
                        setEditUser={setEditUser}
                        userId={user?.id}
                        userEmail={user?.email}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
