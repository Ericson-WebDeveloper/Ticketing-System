import React, { useRef, useState } from "react";
import {
  SET_ERROR,
  SET_ERRORS,
  SET_NEW_PROFILE,
  SET_U_LOAIDNG,
  SET_U_SUCCESS,
} from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { updateProfileImage } from "../../store/user/userActions";

type ProfileFormProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileForm = ({ setModal }: ProfileFormProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState<File | null>(null);

  const imageCapture = (e: React.ChangeEvent) => {
    e.preventDefault();
    let imageFile = imageRef.current?.files?.item(0);
    if (imageFile) setProfileImg(imageFile!);
  };

  const onUpdateProfileImage = async () => {
    const form = new FormData();
    form.append("image", profileImg!);
    try {
      dispatch(SET_U_LOAIDNG(true));
      let response = await updateProfileImage(form);
      dispatch(SET_NEW_PROFILE(response.data.user));
      dispatch(SET_U_SUCCESS("You Profile Image Updated!"));
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
    <>
      <div className="p-6 flex flex-col space-y-1">
        <label htmlFor="" className="text-2xl text-white ">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="rounded-lg text-white border-[1px] border-gray-200 p-2"
          ref={imageRef}
          onChange={(e) => imageCapture(e)}
        />
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={onUpdateProfileImage}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
        dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={() => setModal("")}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
