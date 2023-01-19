import React from "react";
import { Link } from "react-router-dom";
import { SET_PAGE } from "../store/indexSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import SideBarLink from "./SideBarLink";

type SideBarProps = {
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
  collapseShow: string;
};

const SideBar = ({ setCollapseShow, collapseShow }: SideBarProps) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        id="sidebarRefApp"
        className="h-screen w-[250px] top-0 p-2 hidden md:block bg-gray-800"
      >
        <h1 className="text-2xl text-white text-center mt-8 mb-4">Menu List</h1>
        <ul className="p-1 space-y-4 ml-4 w-full">
          <SideBarLink
            user={user}
            dispatch={dispatch}
            SET_PAGE={SET_PAGE}
            setCollapseShow={setCollapseShow}
          />
        </ul>
      </div>

      <div
        className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:hidden md:mt-4 md:shadow-none shadow absolute top-0 
            left-0 right-0 z-40 
            overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded bg-gray-900 ${collapseShow}`}
      >
        {/* Collapse header */}
        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
          <div className="flex flex-wrap">
            <div className="w-6/12">
              <Link
                className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/"
              >
                Menu List
              </Link>
            </div>
            <div className="w-6/12 flex justify-end">
              <button
                type="button"
                className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 
                    text-xl leading-none bg-transparent rounded border border-solid border-transparent 
                    hover:bg-gray-300"
                onClick={() => setCollapseShow("hidden")}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Form */}
        <form className="mt-6 mb-4 md:hidden">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 h-12 border-2 border-solid 
                   border-gray-500 placeholder-gray-300 text-black bg-white 
                    text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal 
                   rounded-lg"
            />
          </div>
        </form>

        <hr className="my-4 md:min-w-full" />

        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <SideBarLink
            user={user}
            dispatch={dispatch}
            SET_PAGE={SET_PAGE}
            setCollapseShow={setCollapseShow}
          />
        </ul>
      </div>
    </>
  );
};

export default SideBar;
