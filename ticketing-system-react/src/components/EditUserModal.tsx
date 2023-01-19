import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers, updateUser } from "../store/user/userActions";
import {
  SET_ERROR,
  SET_ERRORS,
  SET_U_LOAIDNG,
  SET_U_SUCCESS,
} from "../store/user/userSlice";

import { JobInterface } from "../models/Job";
import { RoleInterface } from "../models/Role";
import { UserInterface } from "../models/User";
import { useAppDispatch } from "../store/store";

type EditUserModalProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  user: UserInterface | null;
  jobs: JobInterface[];
  roles: RoleInterface[];
  page: URLSearchParams;
};

export interface UpdateUserFormInterface {
  name: string;
  nickname: string;
  email: string;
  password: string;
  employee_no: string;
  role_id: number;
  job_id: number;
}

const EditUserModal = ({
  show,
  setModal,
  title,
  user,
  jobs,
  roles,
  page,
}: EditUserModalProps) => {
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    nickname: user?.detail?.nickname || "",
    email: user?.email || "",
    password: "",
    employee_no: user?.detail?.employee_no || "",
  });
  const { name, email, nickname, password, employee_no } = editForm;
  const [role, setRole] = useState(user?.roles?.[0].id);
  const [job, setJob] = useState(user?.job_id);

  const userUpdating = async () => {
    const data: UpdateUserFormInterface = {
      name,
      nickname: nickname || "",
      email,
      password,
      employee_no: employee_no || "",
      role_id: role ? role : 0,
      job_id: job ? job : 0,
    };
    let pageNumber = page.get("page") ? parseInt(page.get("page")!) : 1;
    try {
      dispatch(SET_U_LOAIDNG(true));
      await dispatch(updateUser(data, user?.id!));
      await dispatch(getUsers(pageNumber));
      dispatch(SET_U_SUCCESS("User Updated!"));
      setModal("");
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(SET_ERRORS(error.response.data.errors));
        return;
      } else if (error.response.status === 400) {
        dispatch(SET_ERROR(error.response.data.error));
        return;
      } else {
        dispatch(SET_ERROR("Error"));
        return;
      }
    } finally {
      dispatch(SET_U_LOAIDNG(false));
    }
  };

  return (
    <div
      id="ViewUsertModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
    fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title ? title : "Modal Form"}
            </h3>
            <button
              onClick={() => setModal("")}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 
                              10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {user ? (
            <>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-2 rounded-lg focus:outline-none"
                  value={name}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Nick Name
                </label>
                <input
                  type="text"
                  name="nickname"
                  className="p-2 rounded-lg focus:outline-none"
                  value={nickname}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Employee No
                </label>
                <input
                  type="text"
                  name="employee_no"
                  className="p-2 rounded-lg focus:outline-none"
                  value={employee_no}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="p-2 rounded-lg focus:outline-none"
                  value={email}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="p-2 rounded-lg focus:outline-none"
                  value={password}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Job
                </label>
                <select
                  name=""
                  id=""
                  value={job}
                  onChange={(e) => setJob(parseInt(e.target.value))}
                  className="p-2 rounded-lg focus:outline-none"
                >
                  {/* <option value={null} disabled selected>Select Job</option> */}
                  {jobs?.map((job, index) => {
                    return (
                      <option key={index} value={job.id}>
                        {job.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-white text-lg">
                  Role
                </label>
                <select
                  name=""
                  id=""
                  value={role}
                  onChange={(e) => setRole(parseInt(e.target.value))}
                  className="p-2 rounded-lg focus:outline-none"
                >
                  {/* <option value={null} disabled selected>Select Role</option> */}
                  {roles?.map((role, index) => {
                    return (
                      <option key={index} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <div className="px-6 py-3 flex flex-col space-y-2">
                            <label htmlFor="" className='text-white text-lg'>Image</label>
                            <input type="file" name='' className='p-2 rounded-lg bg-white focus:outline-none' />
                        </div> */}
            </>
          ) : (
            <h1>User Not Found</h1>
          )}

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            {user && (
              <button
                onClick={userUpdating}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                     focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800"
              >
                Submit
              </button>
            )}

            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm 
                      font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                      dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setModal("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditUserModal);
