import React from "react";
import moment from "moment";
import OtherHelper from "../../helper/OtherHelper";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type OpenTicketListProps = {
  ticket: TicketInterface<UserInterface> | null;
  onSetTicketView: (id: number) => Promise<void>;
  setTicketUpdate: (id: number) => Promise<void>;
};

const OpenTicketList = ({
  ticket,
  onSetTicketView,
  setTicketUpdate,
}: OpenTicketListProps) => {
  const { returningStatusColor } = OtherHelper();
  return (
    <div className="p-4 flex flex-col space-y-2 mx-36 border-[1px] border-gray-400 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
          <h1>{ticket?.ticket_name}</h1>
          <span
            className={`p-1 ${
              returningStatusColor(ticket?.progress?.status?.status_name || "")
                ?.color
            }
              rounded-lg`}
          >
            {ticket?.progress?.status?.status_name}
          </span>
        </div>
        <div className="">
          <p>TR/Control Number: {ticket?.control_no}</p>
        </div>
      </div>
      <div className="flex">
        <h3>
          Created By: <b>{ticket?.creator?.name}</b> At: Date{" "}
          <b>{moment(ticket?.created_at).format("MMMM Do YYYY")}</b>
        </h3>
      </div>
      <div className="flex space-x-2">
        <button
          className="py-1 px-2 rounded-lg bg-blue-600 text-white"
          onClick={() => onSetTicketView(ticket?.id!)}
        >
          View
        </button>
        <button
          className="py-1 px-2 rounded-lg bg-red-600 text-white"
          onClick={() => setTicketUpdate(ticket?.id!)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default OpenTicketList;
