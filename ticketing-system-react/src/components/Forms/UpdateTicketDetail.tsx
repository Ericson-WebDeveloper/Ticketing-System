import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { OpenticketUpdate } from "../../store/ticket/ticketActions";
import {
  SET_NEW_UPATE_USERTICKET,
  SET_SUCCESS,
  SET_TICKETS_ERROR,
  SET_TICKETS_REQUEST,
} from "../../store/ticket/ticketSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  TicketENVInterface,
  TicketInterface,
  TicketStatusInterface,
  TicketTypeInterface,
} from "../../models/Ticket";
import { UserDetailInterface, UserInterface } from "../../models/User";

type UpdateTicketDetailProps = {
  setModal: React.Dispatch<React.SetStateAction<string>>;
  ticket: TicketInterface<UserInterface> | null;
  env: TicketENVInterface[];
  status: TicketStatusInterface[];
  type: TicketTypeInterface[];
};

const UpdateTicketDetail = ({
  setModal,
  ticket,
  env,
  status,
  type,
}: UpdateTicketDetailProps) => {
  const dispatch = useDispatch();
  const [editTicket, setEditTicket] = useState({
    ticket_name: ticket?.ticket_name || "",
    control_no: ticket?.control_no || "",
    description: ticket?.description || "",
  });

  const { ticket_name, control_no, description } = editTicket;

  const [selectenvironment, setEnvironment] = useState(
    ticket?.progress?.environment_id
  );
  const [selectstatus, setStatus] = useState(ticket?.progress?.status_id);
  const [selecttype, setType] = useState(ticket?.progress?.type_id);

  const updateTicket = async () => {
    try {
      const data = {
        ticket_name,
        control_no,
        description,
        environment_id: selectenvironment!,
        status_id: selectstatus!,
        type_id: selecttype!,
      };
      dispatch(SET_TICKETS_REQUEST(true));
      let response = await OpenticketUpdate(data, ticket?.id!);
      await dispatch(
        SET_NEW_UPATE_USERTICKET({ ticket: response.data.ticket })
      );
      dispatch(SET_SUCCESS("Ticket Updated!"));
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
      {/* modal */}
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
            setEditTicket((prevState) => ({ ...prevState, description: data }));
          }}
        />
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={updateTicket}
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
      {/* modal */}
    </>
  );
};

export default UpdateTicketDetail;
