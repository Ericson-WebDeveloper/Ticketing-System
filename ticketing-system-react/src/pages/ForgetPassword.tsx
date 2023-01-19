import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { reset } from "../store/user/userActions";
import { useRef } from "react";
import TS from "../assets/img/TS-1.jpg";

type ForgetPasswordProps = {};

const ForgetPassword = (props: ForgetPasswordProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequestReset = async () => {
    try {
      setLoading(true);
      const datas = { email };
      let { data } = await reset(datas);
      toast.success(`${data.message}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setEmail("");
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

  if (loading) {
    return <Spinner crl="Blue" loading={true} />;
  }
  return (
    <div
      style={{ backgroundImage: `url(${TS})` }}
      className="h-screen flex justify-center items-center  bg-center bg-contain"
    >
      <div className="flex flex-col p-2 bg-white h-[600px] w-[270px] md:w-[550px] items-center mx-auto opacity-80">
        <h1 className="text-4xl font-mono font-semibold">FORGET PASSWORD</h1>
        <div className="p-2 space-y-4 w-[250px] md:w-[400px] mx-auto mt-14">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="username" className="text-2xl font-semibold">
              Username/Email
            </label>
            <input
              type="text"
              name="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={sendRequestReset}
            className="p-2 bg-green-400 text-white rounded-md w-full mt-4 
          hover:bg-green-600"
          >
            SEND REQUEST
          </button>
          <br />
          <span className="mt-2">
            <Link to="/">
              {" "}
              <p className="hover:text-lg hover:text-green-400">
                Already Have Account?
              </p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
