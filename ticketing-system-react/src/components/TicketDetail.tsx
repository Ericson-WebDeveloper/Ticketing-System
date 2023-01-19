import React from "react";
import { TicketInterface } from "../models/Ticket";
import { UserInterface } from "../models/User";

type TicketDetailProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  ticket: TicketInterface<UserInterface> | null;
};

const TicketDetail = ({ setModal, ticket }: TicketDetailProps) => {
  return (
    <div className="p-2 text-white">
      {ticket && (
        <>
          <div className="flex flex-col p-2 space-y-4">
            <div className="flex">
              <label htmlFor="">Title: {ticket?.ticket_name}</label>
            </div>
            <hr />
            <div className="flex">
              <label htmlFor="">TR/Control No#: {ticket?.control_no}</label>
            </div>
            <hr />
            <div className="flex flex-col space-y-2">
              <label htmlFor="">Description: </label>
              {/* <span className='indent-3'>{ticket?.description}</span> */}
              <br />{" "}
              <span
                dangerouslySetInnerHTML={{ __html: ticket?.description }}
              ></span>
            </div>
            <hr />
            <div className="flex">
              <label htmlFor="" className="items-center">
                Status:{" "}
                <span className="p-2 rounded-lg bg-red-600 text-white">
                  {ticket?.progress?.status?.status_name}
                </span>
              </label>
            </div>
            <hr />
            <div className="flex">
              <label htmlFor="">
                Type: {ticket?.progress?.type?.type_name}
              </label>
            </div>
            <hr />
            <div className="flex">
              <label htmlFor="">
                Environment: {ticket?.progress?.env?.environment_name}
              </label>
            </div>

            <hr />
            <div className="flex">
              <label htmlFor="">
                Root Cause: <br />
                <span
                  dangerouslySetInnerHTML={{ __html: ticket?.root_cause! }}
                ></span>
              </label>
            </div>
            <hr />
            <div className="flex">
              <label htmlFor="">
                Solution: <br />
                <span
                  dangerouslySetInnerHTML={{ __html: ticket?.solution! }}
                ></span>
              </label>
            </div>
            {ticket?.remarks && (
              <>
                <hr />
                <div className="flex">
                  <label htmlFor="">
                    Remarks: <br />{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: ticket?.remarks }}
                    ></span>
                  </label>
                </div>
              </>
            )}
            <hr />
            <div className="flex">
              <label htmlFor="">Created By: {ticket?.creator?.name}</label>
            </div>
            {ticket?.qa?.name && (
              <>
                <hr />
                <div className="flex">
                  <label htmlFor="">QA: {ticket?.qa?.name}</label>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
                    dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setModal("")}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketDetail;
