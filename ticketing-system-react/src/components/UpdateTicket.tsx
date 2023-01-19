import React, { useState } from "react";
import {
  getOpenTickets,
  OpenticketUpdate,
} from "../store/ticket/ticketActions";
import {
  SET_SUCCESS,
  SET_TICKETS_ERROR,
  SET_TICKETS_REQUEST,
} from "../store/ticket/ticketSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  TicketENVInterface,
  TicketInterface,
  TicketStatusInterface,
  TicketTypeInterface,
} from "../models/Ticket";
import { UserInterface } from "../models/User";
import { useAppDispatch } from "../store/store";

type UpdateTicketProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  env: TicketENVInterface[];
  status: TicketStatusInterface[];
  type: TicketTypeInterface[];
  ticket: TicketInterface<UserInterface> | null;
};

const UpdateTicket = ({
  show,
  setModal,
  title,
  env,
  status,
  type,
  ticket,
}: UpdateTicketProps) => {
  const dispatch = useAppDispatch();
  const [editTicket, setEditTicket] = useState<{
    ticket_name: string;
    control_no: string;
    description: string;
  }>({
    ticket_name: ticket?.ticket_name || "",
    control_no: ticket?.control_no || "",
    description: ticket?.description || "",
  });

  const { ticket_name, control_no, description } = editTicket;

  const [selectenvironment, setEnvironment] = useState<number>(
    ticket?.progress?.environment_id || 0
  );
  const [selectstatus, setStatus] = useState<number>(
    ticket?.progress?.status_id || 0
  );
  const [selecttype, setType] = useState<number>(
    ticket?.progress?.type_id || 0
  );

  const updateTicket = async () => {
    try {
      const data = {
        ticket_name,
        control_no,
        description,
        environment_id: selectenvironment,
        status_id: selectstatus,
        type_id: selecttype,
      };
      dispatch(SET_TICKETS_REQUEST(true));
      await OpenticketUpdate(data, ticket?.id!);
      await dispatch(getOpenTickets());
      dispatch(SET_SUCCESS("Open Ticket Updated!"));
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
              name="ticket_name"
              value={ticket_name}
              onChange={(e) =>
                setEditTicket((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
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
              name="control_no"
              className="p-2 w-full focus:outline-none rounded-md"
              placeholder="Control No#"
              onChange={(e) =>
                setEditTicket((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              value={control_no}
            />
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Status:{" "}
            </label>
            <select
              name=""
              id=""
              value={selectstatus}
              onChange={(e) => setStatus(parseInt(e.target.value))}
              className="p-2 w-full focus:outline-none rounded-md"
            >
              {status?.map((stat, index) => {
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
            <select
              name=""
              id=""
              value={selecttype}
              onChange={(e) => setType(parseInt(e.target.value))}
              className="p-2 w-full focus:outline-none rounded-md"
            >
              {type?.map((typ, index) => {
                return (
                  <option key={index} value={typ.id}>
                    {typ.type_name}
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
              value={selectenvironment}
              onChange={(e) => setEnvironment(parseInt(e.target.value))}
              className="p-2 w-full focus:outline-none rounded-md"
            >
              {env?.map((env, index) => {
                return (
                  <option key={index} value={env.id}>
                    {env.environment_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Description:{" "}
            </label>
            {/* <textarea type="text" name='' rows='5' className='p-2 w-full focus:outline-none rounded-md'> </textarea> */}
            <CKEditor
              className="p-2 w-full focus:outline-none rounded-md"
              style={{ height: "55px" }}
              height={200}
              editor={ClassicEditor}
              data={description}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setEditTicket((prevState) => ({
                  ...prevState,
                  description: data,
                }));
              }}
            />
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={updateTicket}
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

export default UpdateTicket;
