import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "../../components/Admin/ProfileForm";
import ModalForm from "../../components/ModalForm";
import Spinner from "../../components/Spinner";
import { updateProfile } from "../../store/user/userActions";
import {
  SET_ERROR,
  SET_ERRORS,
  SET_NEW_PROFILE,
  SET_RESET_ERROR,
  SET_U_LOAIDNG,
  SET_U_SUCCESS,
  userCrudError,
  userCrudErrors,
  userCrudSuccess,
  userLoading,
} from "../../store/user/userSlice";
// import ProfileImageModal from '../../components/ProfileImageModal'
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/store";

type ProfileProps = {};

export interface ProfileFormType {
  name: string;
  email: string;
  password: string;
  nickname: string;
  employee_no: string;
}

const Profile = (props: ProfileProps) => {
  const dispatch = useAppDispatch();
  const userCrudLoading = useSelector(userLoading);
  const userErrorCrud = useSelector(userCrudError);
  const userErrorCruds = useSelector(userCrudErrors);
  const userSuccessCrud = useSelector(userCrudSuccess);

  const [showImageModal, setImageModal] = useState<string>("");
  const user = useAppSelector((state) => state.user.user);
  const [editProfile, setEditProfile] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
    nickname: user?.detail?.nickname,
    employee_no: user?.detail?.employee_no,
  });

  const { name, email, password, nickname, employee_no } = editProfile;

  useEffect(() => {
    if (userErrorCrud) {
      let errorData = userErrorCrud;
      dispatch(SET_RESET_ERROR());
      toast.error(`${errorData}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    if (userErrorCruds) {
      let errors = userErrorCruds;
      dispatch(SET_RESET_ERROR());
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          // hideProgressBar: false,
          closeOnClick: true,
        });
      });
    }

    if (userSuccessCrud) {
      let successMessage = userSuccessCrud;
      dispatch(SET_U_SUCCESS(null));
      toast.success(`${successMessage}`, {
        theme: "dark",
        autoClose: 10000,
        // hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [dispatch, userErrorCrud, userErrorCruds, userSuccessCrud]);

  const onUpdateMyProfile = async () => {
    try {
      const data: ProfileFormType = {
        name: name || "",
        email: email || "",
        password: password || "",
        nickname: nickname || "",
        employee_no: employee_no || "",
      };
      dispatch(SET_U_LOAIDNG(true));
      let response = await updateProfile(data);
      dispatch(SET_NEW_PROFILE(response.data.user));
      dispatch(SET_U_SUCCESS("You Profile Updated!"));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(SET_ERRORS(error.response.data.errors));
        return;
      } else if (error.response.status === 400) {
        dispatch(SET_ERROR(error.response.data.error));
        return;
      } else {
        dispatch(SET_ERROR("Server Error. try again later."));
        return;
      }
    } finally {
      dispatch(SET_U_LOAIDNG(false));
    }
  };

  if (userCrudLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }
  return (
    <div className="h-screen w-full">
      <div className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[650px] flex mx-auto box-border">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            src={user?.detail?.profile_img ?? "https://via.placeholder.com/15"}
            onClick={() => setImageModal("block")}
            className="h-48 w-48 rounded-full cursor-pointer"
            alt=""
          />
          <div className="w-full flex flex-col mt-6">
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Password *optional"
                value={password}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Nick Name
              </label>
              <input
                type="text"
                name="nickname"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Nick Name"
                value={nickname}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Employee No
              </label>
              <input
                type="text"
                name="employee_no"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Employee No"
                value={employee_no}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <button
              type="button"
              onClick={onUpdateMyProfile}
              className="w-full md:w-[50%] mt-4 p-2 bg-green-600 mx-auto text-lg text-gray-100 font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ModalForm
        show={showImageModal}
        setModal={setImageModal}
        title="Image Profile Update"
      >
        <ProfileForm setModal={setImageModal} />
      </ModalForm>
    </div>
  );
};

export default Profile;
