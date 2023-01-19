import React from "react";
import OtherHelper from "../../helper/OtherHelper";
import {
  SET_PROG_ERROR,
  SET_PROG_LOADING,
  SET_PROG_SUCCESS,
} from "../../store/programmer/programmerSlice";
import {
  assignToOwner,
  getTicketsUserNotComplete,
} from "../../store/programmer/programmerActions";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";
import { useAppDispatch } from "../../store/store";

type BackToProgrammerProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  ticket: TicketInterface<UserInterface> | null;
};

const BackToProgrammer = ({
  show,
  setModal,
  title,
  ticket,
}: BackToProgrammerProps) => {
  const { returningStatusColor } = OtherHelper();
  const dispatch = useAppDispatch();

  const setBackToProgHandler = async () => {
    try {
      dispatch(SET_PROG_LOADING(true));
      let response = await dispatch(assignToOwner(ticket?.id!));
      await dispatch(getTicketsUserNotComplete());
      dispatch(SET_PROG_SUCCESS(response.data.message));
      setModal("");
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
      id="AssignQAModal"
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

          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Control No#: {ticket?.control_no}
            </label>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2">
            <label htmlFor="" className="text-xl text-white">
              Ticket Name: {ticket?.ticket_name}
            </label>
          </div>
          <div className="px-6 py-3 flex flex-col space-y-2 text-white">
            <label htmlFor="" className="text-xl text-white">
              Description:{" "}
            </label>
            <span
              dangerouslySetInnerHTML={{ __html: ticket?.description! }}
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
                }items-center rounded-lg ml-2`}
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
          <div className="px-6 py-3 flex justify-center">
            <button
              onClick={setBackToProgHandler}
              type="button"
              className="p-2 bg-green-600 text-white w-full"
            >
              Submit
            </button>
          </div>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setModal("")}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm 
                      font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                      dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackToProgrammer;
