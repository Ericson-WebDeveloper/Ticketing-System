import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation } from "react-router-dom";
import {
  updateRemarks,
  updateTicketOnProgress,
} from "../../store/programmer/programmerActions";
import {
  SET_PROG_ERROR,
  SET_PROG_LOADING,
  SET_PROG_SUCCESS,
  SET_UPDATE_ALLTICKETS,
  SET_UPDATE_ASSIGN_QATICKETS,
  SET_UPDATE_TICKETS,
} from "../../store/programmer/programmerSlice";
import {
  TicketENVInterface,
  TicketInterface,
  TicketStatusInterface,
  TicketTypeInterface,
} from "../../models/Ticket";
import { UserInterface } from "../../models/User";
import { useAppDispatch } from "../../store/store";
import { TicketOnProgress } from "../User/ViewTicket";

type EditAssignProps = {
  show1: string;
  showModal2: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  ticket: TicketInterface<UserInterface> | null;
  env: TicketENVInterface[];
  status: TicketStatusInterface[];
  type: TicketTypeInterface[];
};

const EditAssign = ({
  show1,
  showModal2,
  title,
  ticket,
  env,
  status,
  type,
}: EditAssignProps) => {
  const location = useLocation();
  const [tabPanel, setTabPanel] = useState("details");
  const dispatch = useAppDispatch();
  const [selectenvironment, setEnvironment] = useState(
    ticket?.progress?.environment_id
  );
  const [selectstatus, setStatus] = useState(ticket?.progress?.status_id);
  const [selecttype, setType] = useState(ticket?.progress?.type_id);

  const [editTicket, setEditTicket] = useState<TicketOnProgress>({
    ticket_name: ticket?.ticket_name || "",
    control_no: ticket?.control_no || "",
    description: ticket?.description || "",
    remarks: ticket?.remarks || "",
  });

  const { ticket_name, control_no, description, remarks } = editTicket;

  const ticketAssignToMe = async () => {
    //both details & Remarks can update
    const data: TicketOnProgress = {
      ticket_name,
      control_no,
      description,
      environment_id: selectenvironment,
      status_id: selectstatus,
      type_id: selecttype,
    };

    // let type = location.pathname === '/backend/user/tickets' ? 'open' : 'all';
    let type =
      location.pathname.split("?")[0] === "/backend/user/tickets"
        ? "open"
        : "/backend/user/qa-tickets"
        ? "qa"
        : "all";

    await dispatch(updateTicketOnProgress(data, ticket?.id!, showModal2, type));
  };

  const ticketAssgnToMe2 = async () => {
    try {
      if (remarks === "") {
        return false;
      }
      // let type = location.pathname === '/backend/user/tickets' ? 'open' : 'all';
      let type =
        location.pathname.split("?")[0] === "/backend/user/tickets"
          ? "open"
          : "/backend/user/qa-tickets"
          ? "qa"
          : "all";
      const data = { remarks: remarks || "" };

      dispatch(SET_PROG_LOADING(true));
      let response = await updateRemarks(data, ticket?.id!);
      if (type === "open") {
        dispatch(
          SET_UPDATE_TICKETS({ id: ticket?.id!, ticket: response.data.ticket })
        );
      }
      if (type === "all") {
        dispatch(
          SET_UPDATE_ALLTICKETS({
            id: ticket?.id!,
            ticket: response.data.ticket,
          })
        );
      }
      if (type === "qa") {
        dispatch(
          SET_UPDATE_ASSIGN_QATICKETS({
            id: ticket?.id!,
            ticket: response.data.ticket,
          })
        );
      }

      dispatch(SET_PROG_SUCCESS(response.data.message));
      showModal2("");
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_PROG_ERROR({ error: null, errors: error.response.data.errors })
        );
      } else if (error.response.status === 400) {
        dispatch(
          SET_PROG_ERROR({ error: error.response.data.error, errors: null })
        );
      } else {
        dispatch(SET_PROG_ERROR({ error: "Error", errors: null }));
      }
    } finally {
      dispatch(SET_PROG_LOADING(false));
    }
  };

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
              className="text-gray-400 bg-transparent hover:bg-gray-200 
                      hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                      name="ticket_name"
                      className="p-2 w-full focus:outline-none rounded-md"
                      placeholder="Ticket TItle"
                      value={ticket_name}
                      onChange={(e) =>
                        setEditTicket((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
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
                      value={control_no}
                      onChange={(e) =>
                        setEditTicket((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
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
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={ticketAssignToMe}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                          dark:hover:bg-blue-700 
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

          {tabPanel === "remarks" && (
            <>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Remarks:{" "}
                </label>
                <CKEditor
                  className="p-2 w-full focus:outline-none rounded-md"
                  style={{ height: "55px" }}
                  height={200}
                  editor={ClassicEditor}
                  data={remarks}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setEditTicket((prevState) => ({
                      ...prevState,
                      remarks: data,
                    }));
                  }}
                />
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={ticketAssgnToMe2}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                          dark:hover:bg-blue-700 
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

export default EditAssign;
