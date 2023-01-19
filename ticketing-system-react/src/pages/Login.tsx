import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/user/userActions";
import {
  SET_AUTH,
  SET_ERROR,
  SET_ERRORS,
  SET_RESET_ERROR,
  SET_USER_LOADING,
} from "../store/user/userSlice";
import Spinner from "../components/Spinner";
import { redirectByRole } from "../middleware/roleDirect";
import { toast } from "react-toastify";
import TS from "../assets/img/TS-1_auto_x2.jpg";
import { useAppSelector } from "../store/store";

type LoginProps = {};

const Login = (props: LoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading, userError, userErrors } = useAppSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const { email, password } = formData;

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(SET_USER_LOADING(true));
      dispatch(SET_RESET_ERROR());
      let response = await login(formData);
      dispatch(SET_AUTH(response.data.user));
      dispatch(SET_USER_LOADING(false));
      navigate(`${redirectByRole(response.data.user.roles)}`);
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(SET_ERRORS(error.response.data.errors));
      } else {
        dispatch(SET_ERROR(error.response.data.error));
      }
      dispatch(SET_USER_LOADING(false));
    }
  };

  useEffect(() => {
    if (userError) {
      let errorMsg = userError;
      dispatch(SET_ERROR(null));
      toast.error(`${errorMsg}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [dispatch, userError]);

  if (userLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div
      style={{ backgroundImage: `url(${TS})` }}
      className={`h-screen flex justify-center items-center  bg-center bg-contain`}
    >
      <div className="flex flex-col p-2 bg-white h-[600px] w-[270px] md:w-[550px] items-center mx-auto rounded-xl opacity-80">
        <h1 className="text-4xl font-mono font-semibold">LOGIN</h1>
        <form
          onSubmit={onSignIn}
          className="p-2 space-y-4 w-[250px] md:w-[400px] mx-auto mt-14"
        >
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="email" className="text-2xl font-semibold">
              Username/Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
              value={email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {userErrors?.email && (
              <span className="text-red-600 font-serif">
                {userErrors?.email}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="password" className="text-2xl font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
              value={password}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            {userErrors?.password && (
              <span className="text-red-600 font-serif">
                {userErrors?.password}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="p-2 bg-green-400 text-white rounded-md w-full mt-4 
          hover:bg-green-600"
          >
            LOGIN
          </button>
          <br />
          <span className="mt-2">
            <Link to="/forget-password">
              {" "}
              <p className="hover:text-lg hover:text-green-400">
                Forget Password?
              </p>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
