import React, { useState } from "react";
import OtherHelper from "../../helper/OtherHelper";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type UserTicketsListProps = {
  ticket: TicketInterface<UserInterface>;
  setTicketToView: (id: number) => Promise<void>;
  setTicket: (id: number) => Promise<void>;
};

const UserTicketsList = ({
  ticket,
  setTicketToView,
  setTicket,
}: UserTicketsListProps) => {
  const [show, setShow] = useState("hidden");
  const { returningStatusColor } = OtherHelper();

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <span className={"ml-3 font-bold " + "text-gray-600"}>
          {ticket?.ticket_name}
        </span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {ticket?.control_no}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span
          className={`p-2 ${
            returningStatusColor(ticket?.progress?.status?.status_name || "")
              ?.color
          } rounded-md`}
        >
          {ticket?.progress?.status?.status_name}{" "}
        </span>
      </td>
      {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex">
            {ticket?.programmer?.name}
            </div>
        </td> */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex items-center">{ticket?.qa?.name}</div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
        {/* tableDropdown */}
        <>
          <span
            className="text-gray-500 py-1 px-3 cursor-pointer"
            onClick={clickCollapse}
          >
            <i className="fas fa-ellipsis-v" onClick={clickCollapse}></i>
          </span>
          <div
            className={
              "bg-white absolute text-base mr-10 right-0.5 list-none text-left rounded shadow-lg w-60 " +
              show
            }
          >
            <span
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100"
              }
              onClick={() => {
                setTicket(ticket.id);
                clickCollapse();
              }}
            >
              {/* make modal for viewing in admin side & user side */}
              View
            </span>
            {ticket?.progress?.status?.status_name &&
              !["closed", "resolved"].includes(
                ticket?.progress?.status?.status_name
              ) && (
                <span
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100"
                  }
                  onClick={() => {
                    setTicketToView(ticket.id);
                    clickCollapse();
                  }}
                >
                  Edit
                  {/* reassign to new Programmer & QA */}
                  {/* Edit Details only within details field */}
                </span>
              )}
          </div>
        </>
      </td>
    </tr>
  );
};

export default UserTicketsList;
