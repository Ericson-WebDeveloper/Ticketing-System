import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { signOutUser } from "../store/user/userActions";
import { SET_LOGOUT } from "../store/user/userSlice";

type NavBarProps = {
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar = ({ setCollapseShow }: NavBarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { page } = useAppSelector((state) => state.index);
  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      await signOutUser();
      dispatch(SET_LOGOUT());
    } catch (error) {
      dispatch(SET_LOGOUT());
    }
    navigate(`/`);
  };

  return (
    <>
      <div className="fixed w-full bg-gray-100">
        <div className="flex  items-center justify-between md:justify-end p-4 md:mr-72 relative">
          <h1 className="hidden md:block mr-auto font-bold font-serif">
            {page !== "" ? page : "Page Name"}
          </h1>
          <span
            className="ml-6 text-black block md:hidden cursor-pointer"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
          <span className="flex items-center">
            <form action="" className="hidden md:block mr-4">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Page"
                className="p-2 w-[230px] rounded-lg border-2 border-gray-400 focus:outline-none"
              />
            </form>

            <div className="relative inline-block text-left">
              <div>
                <img
                  src={
                    user?.detail?.profile_img ??
                    "https://via.placeholder.com/15"
                  }
                  onClick={() =>
                    document
                      .getElementById("profileDrawer")
                      ?.classList.toggle("hidden")
                  }
                  className="w-[45px] h-[40px] rounded-full cursor-pointer"
                  alt=""
                />
              </div>

              <div
                id="profileDrawer"
                className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 
                    ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <a
                  href="#pablo"
                  onClick={onSignOut}
                  className="text-sm py-2 px-4 font-normal block w-full 
                    whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100"
                >
                  Sign Out
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 
                    hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 "
                >
                  Setting
                </a>
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
