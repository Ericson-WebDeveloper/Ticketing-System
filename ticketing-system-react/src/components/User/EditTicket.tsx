import React, { useState } from "react";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type EditTicketProps = {
  title: string;
  show1: string;
  showModal2: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface;
  ticket: TicketInterface<UserInterface>;
};

const EditTicket = ({
  title,
  show1,
  showModal2,
  user,
  ticket,
}: EditTicketProps) => {
  const [tabPanel, setTabPanel] = useState("details");
  return (
    <div
      id="EditTicketModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show1 ? "hidden" : show1} 
      fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title ? title : "Modal Form"}
            </h3>
            <button
              onClick={() => showModal2("")}
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

          <div className="flex w-full justify-center items-center">
            <button
              className="py-4 px-6 bg-gray-200 text-black border-[1px] border-black rounded-lg text-lg"
              onClick={() => setTabPanel("details")}
            >
              Details
            </button>
            <button
              className="py-4 px-6 bg-gray-200 text-black border-[1px] border-black rounded-lg text-lg"
              onClick={() => setTabPanel("remarks")}
            >
              Remarks
            </button>
            <button
              className="py-4 px-6 bg-gray-200 text-black border-[1px] border-black rounded-lg text-lg"
              onClick={() => setTabPanel("logs")}
            >
              Logs
            </button>
          </div>
          {tabPanel === "details" && (
            <>
              <div className="py-2 px-4 flex w-full">
                <div className="flex flex-col w-full">
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Ticket Title:{" "}
                    </label>
                    <input
                      type="text"
                      name=""
                      className="p-2 w-full focus:outline-none rounded-md"
                      placeholder="Ticket TItle"
                    />
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Control No#:{" "}
                    </label>
                    <input
                      type="text"
                      name=""
                      className="p-2 w-full focus:outline-none rounded-md"
                      placeholder="Control No#"
                    />
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Status:{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      <option value="">Pending</option>
                    </select>
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Type:{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      <option value="">Pending</option>
                    </select>
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Environment:{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      <option value="">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Description:{" "}
                    </label>
                    <textarea
                      name=""
                      rows={5}
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Root Cause:{" "}
                    </label>
                    <textarea
                      name=""
                      rows={5}
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      {" "}
                    </textarea>
                  </div>
                  <div className="px-6 py-3 flex flex-col space-y-2">
                    <label htmlFor="" className="text-xl text-white">
                      Solution:{" "}
                    </label>
                    <textarea
                      name=""
                      rows={5}
                      className="p-2 w-full focus:outline-none rounded-md"
                    >
                      {" "}
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                      dark:focus:ring-blue-800 ${
                        user?.job?.name === "Q.A" ? "disabled" : ""
                      }`}
                >
                  Submit
                </button>
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 
                          focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm 
                          font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                          dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => showModal2("")}
                >
                  Close
                </button>
              </div>
            </>
          )}

          {tabPanel === "remarks" && (
            <>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Remarks:{" "}
                </label>
                <textarea
                  name=""
                  rows={5}
                  className="p-2 w-full focus:outline-none rounded-md"
                >
                  {" "}
                </textarea>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
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
                  className="text-gray-500 bg-white hover:bg-gray-100 
                          focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm 
                          font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                          dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => showModal2("")}
                >
                  Close
                </button>
              </div>
            </>
          )}

          {tabPanel === "logs" && <div className="py-2 px-4">Logs</div>}
        </div>
      </div>
    </div>
  );
};

export default EditTicket;
