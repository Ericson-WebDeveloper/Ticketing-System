import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddNewTicket from "../../components/AddNewTicket";
import OpenTicketList from "../../components/Admin/OpenTicketList";
import Spinner from "../../components/Spinner";
import UpdateTicket from "../../components/UpdateTicket";
import ViewTicket from "../../components/ViewTicket";
import {
  getEnv,
  getOpenTickets,
  getStatus,
  getTicket,
  getType,
} from "../../store/ticket/ticketActions";
import { toast } from "react-toastify";
import { SET_ERROR_RESET, SET_SUCCESS } from "../../store/ticket/ticketSlice";
import { userLoad, usersProgrammer, usersQA } from "../../store/user/userSlice";
import { getProgrammers, getQAs } from "../../store/user/userActions";
import { useAppDispatch, useAppSelector } from "../../store/store";

type OpenTicketsProps = {};

const OpenTickets = (props: OpenTicketsProps) => {
  const dispatch = useAppDispatch();
  const shouldLog1 = useRef(true);
  const {
    tickets,
    ticket,
    loading: ticketloading,
  } = useAppSelector((state) => state.ticket);
  const { env, loading: envloading } = useAppSelector(
    (state) => state.ticketenv
  );
  const { type, loading: typeloading } = useAppSelector(
    (state) => state.tickettype
  );
  const { status, loading: statusloading } = useAppSelector(
    (state) => state.ticketstatus
  );
  const {
    error: errorTicket,
    errors: errorsticket,
    success: ticketsuccess,
  } = useAppSelector((state) => state.ticket);

  const userLoading = useSelector(userLoad);
  const qas = useSelector(usersQA);
  const programmers = useSelector(usersProgrammer);

  const [showAddTicketModal, setAddTicketModal] = useState<string>("");
  const [showViewTicketModal, setViewTicketModal] = useState<string>("");
  const [showEditTicketModal, setEditTicketModal] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const onSetTicketView = async (id: number): Promise<void> => {
    try {
      await dispatch(getTicket(id));
      setViewTicketModal("block");
    } catch {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const setTicketUpdate = async (id: number): Promise<void> => {
    try {
      await dispatch(getTicket(id));
      setEditTicketModal("block");
    } catch {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    // set ticket Data
  };

  useEffect(() => {
    const fetchDatas = async () => {
      if (shouldLog1.current) {
        shouldLog1.current = false;
        await dispatch(getOpenTickets());
        await dispatch(getEnv());
        await dispatch(getStatus());
        await dispatch(getType());
        await dispatch(getQAs());
        await dispatch(getProgrammers());
      }
    };
    fetchDatas();
  }, [dispatch]);

  useEffect(() => {
    if (errorTicket) {
      let errorData = errorTicket;
      dispatch(SET_ERROR_RESET());
      toast.error(`${errorData}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    if (errorsticket) {
      let errors = errorsticket;
      dispatch(SET_ERROR_RESET());
      let keys = Object.keys(errors);
      keys.forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          // hideProgressBar: false,
          closeOnClick: true,
        });
      });
    }

    if (ticketsuccess) {
      let successMessage = ticketsuccess;
      dispatch(SET_SUCCESS(null));
      toast.success(`${successMessage}`, {
        theme: "dark",
        autoClose: 10000,
        // hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [dispatch, errorTicket, errorsticket, ticketsuccess]);

  if (
    isLoading ||
    typeloading ||
    ticketloading ||
    envloading ||
    statusloading ||
    userLoading
  ) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="h-screen w-full mt-4">
      <div className="flex flex-col space-y-3">
        <div className="mx-24 flex space-x-2 items-center">
          <h1 className="text-2xl font-serif ">Open Tickets</h1>
          <button
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            onClick={() => setAddTicketModal("block")}
          >
            Add New Ticket
          </button>
        </div>
        {tickets?.map((ticket: any, index: number) => {
          return (
            <OpenTicketList
              key={index}
              ticket={ticket}
              onSetTicketView={onSetTicketView}
              setTicketUpdate={setTicketUpdate}
            />
          );
        })}
      </div>
      {/* status={status} env={env} type={type} */}
      <AddNewTicket
        show={showAddTicketModal}
        setModal={setAddTicketModal}
        title="Add Ticket"
        env={env}
        status={status}
        type={type}
      />
      <ViewTicket
        show={showViewTicketModal}
        setModal={setViewTicketModal}
        title="Ticket Details"
        ticket={ticket}
        qas={qas}
        programmers={programmers}
      />
      <UpdateTicket
        show={showEditTicketModal}
        setModal={setEditTicketModal}
        title="Ticket Edit"
        ticket={ticket}
        env={env}
        status={status}
        type={type}
      />
    </div>
  );
};

export default OpenTickets;
