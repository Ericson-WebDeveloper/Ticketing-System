import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { checkToken, updatePassForget } from "../store/user/userActions";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TS from "../assets/img/TS-1.jpg";
import axs from "../axios/axios";

type ResetPassProps = {};

const ResetPass = (props: ResetPassProps) => {
  const [password, setPassword] = useState<string>("");
  const [password_confirm, setPasswordConfirm] = useState<string>("");
  const params = useParams();
  const [search, setserach] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const shouldLog = useRef(true);

  const checking = async () => {
    try {
      setLoading(true);
      const data = {
        email: search.get("email")!,
        token: params.token!,
      };
      await checkToken(data);
    } catch (error: any) {
      toast.error(`${error.response.data.error}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // verify email 7 Token
    const checkingData = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;
        await checking();
      }
    };
    checkingData();
  }, []);

  const updatePass = async () => {
    try {
      setLoading(true);
      const data = {
        email: search.get("email")!,
        token: params.token!,
        password,
        password_confirm,
      };
      await updatePassForget(data);
      toast.success(`Password Reset Success`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setPassword("");
      setPasswordConfirm("");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      if (error.response.status === 422) {
        let keys = Object.keys(error.response.data.errors);
        keys.forEach((key) => {
          toast.error(`${error.response.data.errors[key]}`, {
            theme: "dark",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
          });
        });
      } else {
        toast.error(`${error.response.data.error}`, {
          theme: "dark",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Spinner crl="Blue" loading={true} />;
  }
  return (
    <div
      style={{ backgroundImage: `url(${TS})` }}
      className="h-screen flex justify-center items-center bg-center bg-contain"
    >
      <div className="flex flex-col p-2 bg-white h-[600px] w-[270px] md:w-[550px] items-center mx-auto opacity-80">
        <h1 className="text-4xl font-mono font-semibold">RESET PASSWORD</h1>
        <div className="p-2 space-y-4 w-[250px] md:w-[400px] mx-auto mt-14">
          {/* <div className='flex flex-col space-y-2 w-full'>
            <label htmlFor="username" className='text-2xl font-semibold'>Username/Email</label>
            <input type="text" name='username' id='username' className='border-2 border-gray-300 rounded-lg p-2 focus:outline-none' />
          </div> */}
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="password" className="text-2xl font-semibold">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="password_confirm"
              className="text-2xl font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirm"
              id="password_confirm"
              value={password_confirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 
            focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={updatePass}
            className="p-2 bg-green-400 text-white rounded-md w-full mt-4 
          hover:bg-green-600"
          >
            RESET
          </button>
          <br />
          <span className="mt-2">
            <Link to="/">
              {" "}
              <p className="hover:text-lg hover:text-green-400">
                Already Have Account
              </p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
