import React, { useEffect, useState } from "react";
import { getType } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnv,
  getOpenTickets,
  getStatus,
  submitNewTicket,
} from "../store/ticket/ticketActions";
import { toast } from "react-toastify";
import { SET_TICKETS_ERROR } from "../store/ticket/ticketSlice";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { CKEditor } from "@ckeditor/ckeditor5-react"; // not ypescript support need to declare module in react-app-env.d.ts
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  SET_TICKETS_REQUEST,
  SET_ERROR_RESET,
  SET_SUCCESS,
} from "../store/ticket/ticketSlice";

import {
  TicketENVInterface,
  TicketStatusInterface,
  TicketTypeInterface,
} from "../models/Ticket";
import { useAppDispatch } from "../store/store";

type AddNewTicketProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  env: TicketENVInterface[];
  status: TicketStatusInterface[];
  type: TicketTypeInterface[];
};

export interface AddNewTicketInterface {
  status_id: number;
  environment_id: number;
  type_id: number;
  description: string;
  root_cause: string;
  ticket_name: string;
  control_no: string;
}

const AddNewTicket = ({
  show,
  setModal,
  title,
  env,
  status,
  type,
}: AddNewTicketProps) => {
  const dispatch = useAppDispatch();

  const [selectStatus, setselectStatus] = useState([...new Set(status)]);
  const [selectedStatus, setSelected] = useState(0);

  const [selectENV, setENV] = useState([...new Set(env)]);
  const [selectedENV, setSelectedENV] = useState(0);

  const [selectType, setType] = useState([...new Set(type)]);
  const [selectedType, setSelectedType] = useState(0);

  const [description, setDescription] = useState("");
  const [rootCause, setRooCause] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [controlNo, setControlNo] = useState("");

  const onSubmitNewTicket = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedStatus === 0 || selectedENV === 0 || selectedType === 0) {
      return false;
    }
    const data: AddNewTicketInterface = {
      status_id: selectedStatus,
      environment_id: selectedENV,
      type_id: selectedType,
      description,
      root_cause: rootCause,
      ticket_name: ticketName,
      control_no: controlNo,
    };

    try {
      dispatch(SET_TICKETS_REQUEST(true));
      await submitNewTicket(data);
      await dispatch(getOpenTickets());
      dispatch(SET_SUCCESS("New Open Ticket Added!"));
      setModal("");
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_TICKETS_ERROR({ error: null, errors: error.response.data.errors })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_TICKETS_ERROR({ error: error.response.data.error, errors: null })
        );
        return;
      } else {
        dispatch(SET_TICKETS_ERROR({ error: "Error", errors: null }));
        return;
      }
    } finally {
      dispatch(SET_TICKETS_REQUEST(false));
    }
  };

  return (
    <div
      id="ViewUsertModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
    fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out overflow-y-scroll`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title ? title : "Modal Form"}
            </h3>

            <button
              onClick={() => setModal("")}
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
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Ticket Title:{" "}
            </label>
            <input
              type="text"
              name=""
              className="p-2 w-full focus:outline-none rounded-md"
              placeholder="Ticket TItle"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
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
              value={controlNo}
              onChange={(e) => setControlNo(e.target.value)}
            />
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Status:{" "}
            </label>
            {/* <select name="" id="" value={null} onChange={(e) => setStatus(e)} className='p-2 w-full focus:outline-none rounded-md'> */}
            <select
              name=""
              id=""
              value={selectedStatus}
              onChange={(e) => setSelected(parseInt(e.target.value))}
              className="p-2 w-full focus:outline-none rounded-md"
            >
              <option value={0} disabled>
                Select Status
              </option>
              {selectStatus?.map((stat, index) => {
                return (
                  <option key={index} value={stat.id}>
                    {stat.status_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Type:{" "}
            </label>
            {/* <select name="" id="" className='p-2 w-full focus:outline-none rounded-md' value={null} onChange={(e) => setTyped(e)}> */}
            <select
              name=""
              id=""
              className="p-2 w-full focus:outline-none rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(parseInt(e.target.value))}
            >
              <option value={0} disabled>
                Select Type
              </option>
              {selectType?.map((type, index) => {
                return (
                  <option key={index} value={type.id}>
                    {type.type_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Environment:{" "}
            </label>
            <select
              name=""
              id=""
              value={selectedENV}
              onChange={(e) => setSelectedENV(parseInt(e.target.value))}
              className="p-2 w-full focus:outline-none rounded-md"
            >
              <option value={0} disabled>
                Select Environment
              </option>
              {selectENV?.map((environ, index) => {
                return (
                  <option key={index} value={environ.id}>
                    {environ.environment_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Description:{" "}
            </label>
            <CKEditor
              className="p-2 w-full focus:outline-none rounded-md"
              style={{ height: "55px" }}
              height={200}
              editor={ClassicEditor}
              data="<p>Description</p>"
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
            {/* <textarea type="text" name='description' rows='5' className='p-2 w-full focus:outline-none rounded-md' value={description} 
                        onChange={(e) => setDescription(e.target.value)} /> */}
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Root Cause:{" "}
            </label>
            <CKEditor
              className="p-2 w-full focus:outline-none rounded-md"
              style={{ height: "55px" }}
              height={200}
              editor={ClassicEditor}
              data="<p>Root Cause</p>"
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                // console.log( { event, editor, data });
                setRooCause(data);
              }}
            />
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800"
              onClick={onSubmitNewTicket}
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
              onClick={() => setModal("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTicket;
