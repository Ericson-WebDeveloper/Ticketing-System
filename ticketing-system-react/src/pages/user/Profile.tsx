import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const [showImageModal, setImageModal] = useState("");
  return (
    <div className="h-screen w-full">
      <div className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[650px] flex mx-auto box-border">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            src="https://via.placeholder.com/15"
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
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Full Name"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Email
              </label>
              <input
                type="email"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Email Address"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Password
              </label>
              <input
                type="password"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Password *optional"
              />
            </div>

            <button className="w-full md:w-[50%] mt-4 p-2 bg-green-600 mx-auto text-lg text-gray-100 font-bold">
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
            />
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
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
              onClick={() => setImageModal("")}
            >
              Cancel
            </button>
          </div>
        </>
      </ModalForm>
    </div>
  );
};

export default Profile;
