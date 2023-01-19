import React, { useState } from "react";
import OtherHelper from "../helper/OtherHelper";
import { getOpenTickets, ticketAssign } from "../store/ticket/ticketActions";
import {
  SET_SUCCESS,
  SET_TICKETS_ERROR,
  SET_TICKETS_REQUEST,
} from "../store/ticket/ticketSlice";
import { requestSendEmail } from "../store/user/userActions";
import { TicketInterface } from "../models/Ticket";
import { UserInterface } from "../models/User";
import { useAppDispatch } from "../store/store";

type ViewTicketProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  ticket: TicketInterface<UserInterface> | null;
  qas: UserInterface[];
  programmers: UserInterface[];
};

const ViewTicket = ({
  show,
  setModal,
  title,
  ticket,
  qas,
  programmers,
}: ViewTicketProps) => {
  const dispatch = useAppDispatch();
  const { returningStatusColor } = OtherHelper();
  const [selectQa, setQa] = useState<number>(0);
  const [selectProg, setProg] = useState<number>(0);

  const onSubmitAssign = async () => {
    try {
      if (selectQa === 0 || selectProg === 0) {
        return false;
      }
      const data = {
        programmer_id: selectProg,
        qa_id: selectQa,
      };
      dispatch(SET_TICKETS_REQUEST(true));
      let response = await ticketAssign(data, ticket?.id!);
      await dispatch(getOpenTickets());
      dispatch(SET_SUCCESS(response.data?.message));
      setModal("");
      const d = {
        ticket_id: response.data.ticket_id,
        p_id: response.data.p_id,
      };
      await requestSendEmail(d);
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
      id="ViewTicketModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
    fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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

          {ticket ? (
            <>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Control No#: {ticket.control_no}
                </label>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Ticket Name: {ticket.ticket_name}
                </label>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2 text-white">
                <label htmlFor="" className="text-xl text-white">
                  Description:{" "}
                </label>
                <span
                  dangerouslySetInnerHTML={{ __html: ticket.description }}
                ></span>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Status:
                  <span
                    className={`py-1 px-2 ${
                      returningStatusColor(
                        ticket?.progress?.status?.status_name || ""
                      )?.color
                    } 
                            items-center rounded-lg ml-2`}
                  >
                    {ticket?.progress?.status?.status_name}
                  </span>
                </label>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Type: {ticket?.progress?.type?.type_name}
                </label>
              </div>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <label htmlFor="" className="text-xl text-white">
                  Environment: {ticket?.progress?.env?.environment_name}
                </label>
              </div>
              <div className="px-6 py-3 flex space-x-2 justify-between">
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="" className="text-xl text-white">
                    Assign to Programmer
                  </label>
                  <select
                    name=""
                    id=""
                    value={selectProg}
                    onChange={(e) => setProg(parseInt(e.target.value))}
                    className="p-2 rounded-md"
                  >
                    <option value={0}>Select Programmer</option>
                    {programmers?.map((programmer, index) => {
                      return (
                        <option key={index} value={programmer.id}>
                          {programmer.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="" className="text-xl text-white">
                    Assign to QA
                  </label>
                  <select
                    name=""
                    id=""
                    value={selectQa}
                    onChange={(e) => setQa(parseInt(e.target.value))}
                    className="p-2 rounded-md"
                  >
                    <option value={0}>Select Q.A</option>
                    {qas?.map((qa, index) => {
                      return (
                        <option key={index} value={qa.id}>
                          {qa.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800"
                  onClick={onSubmitAssign}
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
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <h1>No Data Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
