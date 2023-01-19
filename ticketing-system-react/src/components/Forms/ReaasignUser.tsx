import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TicketInterface } from "../../models/Ticket";
import { UserDetailInterface, UserInterface } from "../../models/User";
import { useAppDispatch } from "../../store/store";
import {
  getUserTickets2,
  ticketAssign,
  ticketReAssignEmailNotif,
} from "../../store/ticket/ticketActions";
import {
  SET_SUCCESS,
  SET_TICKETS_ERROR,
  SET_TICKETS_REQUEST,
} from "../../store/ticket/ticketSlice";

type ReaasignUserProps = {
  programmers: UserInterface[];
  qas: UserInterface[];
  ticket: TicketInterface<UserInterface> | null;
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface | null;
  page: number;
};

const ReaasignUser = ({
  programmers,
  qas,
  ticket,
  setModal,
  user,
  page,
}: ReaasignUserProps) => {
  const [selectQa, setQa] = useState(0);
  const [selectProg, setProg] = useState(0);
  const dispatch = useAppDispatch();

  const ReAssignNewOnwer = async () => {
    // pass setModal to dipatch
    // logs part was basically what happened in ticket. ex: assign to, assign to qa back to owner. reassign. update status
    if (~~selectQa === 0 || Number(selectProg) === 0) {
      return false;
    }
    const data = {
      programmer_id: Number(selectProg),
      qa_id: Number(selectQa),
    };

    try {
      dispatch(SET_TICKETS_REQUEST(true));
      let response = await ticketAssign(data, ticket?.id!);
      // response.data.ticket_id
      await ticketReAssignEmailNotif({ ticket_id: response.data.ticket_id });
      await dispatch(getUserTickets2(user?.id!, page));
      dispatch(SET_SUCCESS("Re-Assign to New Programmer & Q.A"));
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
    <>
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
          type="button"
          onClick={ReAssignNewOnwer}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
      focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
  dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
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
  );
};

export default ReaasignUser;
