import React, { useRef, useState } from "react";
import { addNewUser, getUsers } from "../../store/user/userActions";
import {
  SET_ERROR,
  SET_ERRORS,
  SET_RESET_ERROR,
  SET_U_LOAIDNG,
  SET_U_SUCCESS,
} from "../../store/user/userSlice";
import { JobInterface } from "../../models/Job";
import { RoleInterface } from "../../models/Role";
import { useAppDispatch } from "../../store/store";

type AddUserProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  jobs: JobInterface[];
  roles: RoleInterface[];
  success: boolean;
};

const AddUser = ({ setModal, jobs, roles, success }: AddUserProps) => {
  // const jobs = jobsMemoized();
  const dispatch = useAppDispatch();
  // useSelector(state => jobsMemoized(state))

  const [selectJob, setSelectJob] = useState(0);
  const [selectRole, setSelectRole] = useState(0);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    nickname: string;
    email: string;
    password: string;
    employee_no: string;
    profile_img: any | null;
  }>({
    name: "",
    nickname: "",
    email: "",
    password: "",
    employee_no: "",
    profile_img: null,
  });

  const { name, email, nickname, password, employee_no } = formData;

  const onCreateUser = async () => {
    const form = new FormData();
    form.append("job_id", String(selectJob));
    form.append("role_id", String(selectRole));
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("nickname", formData.nickname);
    form.append("password", formData.password);
    form.append("employee_no", formData.employee_no);
    form.append("image", formData.profile_img!);
    try {
      dispatch(SET_RESET_ERROR());
      dispatch(SET_U_LOAIDNG(true));
      await dispatch(addNewUser(form));
      // call fecth api call user all
      await dispatch(getUsers());
      dispatch(SET_U_SUCCESS("New User Added!"));
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

  const imageCapture = (e: React.ChangeEvent) => {
    // let imageFile = imageRef.current.files[0];
    let imageFile = imageRef.current?.files?.item(0);
    if (imageFile) setFormData((prev) => ({ ...prev, profile_img: imageFile }));
  };

  return (
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
            setFormData((prev) => ({
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
            setFormData((prev) => ({
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
            setFormData((prev) => ({
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
            setFormData((prev) => ({
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
            setFormData((prev) => ({
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
          value={selectJob}
          onChange={(e) => setSelectJob(parseInt(e.target.value))}
          className="p-2 rounded-lg focus:outline-none"
        >
          <option value={0} disabled>
            Select Job
          </option>
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
          value={selectRole}
          onChange={(e) => setSelectRole(parseInt(e.target.value))}
          className="p-2 rounded-lg focus:outline-none"
        >
          <option value={0} disabled>
            Select Role
          </option>
          {roles?.map((role, index) => {
            return (
              <option key={index} value={role.id}>
                {role.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="px-6 py-3 flex flex-col space-y-2">
        <label htmlFor="" className="text-white text-lg">
          Image
        </label>
        <input
          type="file"
          name=""
          className="p-2 rounded-lg bg-white focus:outline-none"
          ref={imageRef}
          onChange={(e) => imageCapture(e)}
        />
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          data-modal-toggle="defaultModal"
          onClick={onCreateUser}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          data-modal-toggle="defaultModal"
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 
              focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 
              focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 
              dark:focus:ring-gray-600"
          onClick={() => setModal("")}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default React.memo(AddUser);
