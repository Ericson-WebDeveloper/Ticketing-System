import React, { useState } from "react";
import OtherHelper from "../../helper/OtherHelper";
import moment from "moment";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type TicketListProps = {
  showModal1: (id: number) => Promise<void>;
  ticket: TicketInterface<UserInterface>;
};

const TicketList = ({ showModal1, ticket }: TicketListProps) => {
  const { returningStatusColor } = OtherHelper();
  const [show, setShow] = useState("hidden");

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        {ticket?.ticket_name}
        {/* </span> */}
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {ticket?.control_no}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span
          className={`p-1 ${
            returningStatusColor(ticket?.progress?.status?.status_name || "")
              ?.color
          }
              rounded-lg`}
        >
          {ticket?.progress?.status?.status_name}
        </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {ticket?.owner?.name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex items-center">
          {moment(ticket?.created_at).format("MMMM Do YYYY")}
        </div>
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
                showModal1(ticket?.id);
                clickCollapse();
              }}
            >
              Edit
            </span>
          </div>
        </>
      </td>
    </tr>
  );
};

export default TicketList;
