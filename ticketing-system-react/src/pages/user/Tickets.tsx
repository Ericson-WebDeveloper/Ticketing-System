import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import AssignQA from "../../components/User/AssignQA";
import BackToProgrammer from "../../components/User/BackToProgrammer";
import ViewTicket from "../../components/User/ViewTicket";
import { getTicketsUserNotComplete } from "../../store/programmer/programmerActions";
import {
  loadingProg,
  SET_PROG_ERROR,
  SET_PROG_SUCCESS,
} from "../../store/programmer/programmerSlice";
import {
  getEnv,
  getStatus,
  getTicket,
  getType,
} from "../../store/ticket/ticketActions";
import { getQAs } from "../../store/user/userActions";
import { toast } from "react-toastify";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type TicketsProps = {};

const Tickets = (props: TicketsProps) => {
  // QA/User all tickets that programmer_id match and not complete/resoled or simply is still in progress
  const dispatch = useAppDispatch();
  const shouldLog = useRef(true);
  const [showAssignQa, setShowAssignQa] = useState("");
  const [showViewTicket, setShowViewTicket] = useState("");
  const [showBackToProg, setShowBackToProg] = useState("");
  const loadingprogrammer = useSelector(loadingProg);
  const { loading: loadingTicketSlice, ticket } = useAppSelector(
    (state) => state.ticket
  );
  const { env, loading: envloading } = useAppSelector(
    (state) => state.ticketenv
  );
  const { type, loading: typeloading } = useAppSelector(
    (state) => state.tickettype
  );
  const { status, loading: statusloading } = useAppSelector(
    (state) => state.ticketstatus
  );

  const { open_tickets, progError, progErrors, progSuccess } = useAppSelector(
    (state) => state.programmer
  );
  const { user, userLoading, qas } = useAppSelector((state) => state.user);

  const setAssignQaData = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setShowAssignQa("block");
    } catch (error: any) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const backToProg = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setShowBackToProg("block");
    } catch (error: any) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const setDataViewTicket = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setShowViewTicket("block");
    } catch (error: any) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    if (progError) {
      let errorData = progError;
      dispatch(SET_PROG_ERROR({ error: null, errors: null }));
      toast.error(`${errorData}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    if (progErrors) {
      let errors = progErrors;
      dispatch(SET_PROG_ERROR({ error: null, errors: null }));
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

    if (progSuccess) {
      let successMessage = progSuccess;
      dispatch(SET_PROG_SUCCESS(null));
      toast.success(`${successMessage}`, {
        theme: "dark",
        autoClose: 10000,
        // hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [dispatch, progError, progErrors, progSuccess]);

  useEffect(() => {
    const fetchDatas = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;
        await dispatch(getTicketsUserNotComplete());
        await dispatch(getEnv());
        await dispatch(getStatus());
        await dispatch(getType());
        await dispatch(getQAs());
      }
    };

    fetchDatas();
  }, [dispatch]);

  if (
    loadingprogrammer ||
    envloading ||
    typeloading ||
    statusloading ||
    userLoading ||
    loadingTicketSlice
  ) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="h-screen w-full mb-8">
      <div className="flex flex-col space-y-4 mx-24 mb-8">
        <span className="border-yellow-400 border-l-8">
          <h1 className="text-6xl font-bold font-serif ml-4">
            Ticket's (only Open) un akin talaga na ticket
          </h1>
        </span>

        {open_tickets?.map(
          (ticket: TicketInterface<UserInterface>, index: number) => {
            return (
              <div className="flex relative min-h-[200px]" key={index}>
                <div
                  className="flex w-[450px]  justify-center items-center border-black border-l-[1px] border-t-[1px] 
                border-b-[1px] border-dashed  border-r-[1px]"
                >
                  {/* <div className='before:content-["span"] index-1 absolute w-4 h-4 bg-black'>
                  </div> */}
                  <span>
                    {moment(ticket?.created_at).format("MMMM Do YYYY")}
                  </span>
                  {/* <div>
                  </div> */}
                </div>
                <div className="flex flex-col w-full p-6 border-2 space-y-2">
                  <h3>
                    <b>Environment:</b>{" "}
                    {ticket?.progress?.env?.environment_name}{" "}
                  </h3>
                  <h3>
                    <b>Type:</b> {ticket?.progress?.type?.type_name}{" "}
                  </h3>
                  <div className="flex flex-col">
                    <time className="flex flex-col space-y-2">
                      <span>
                        <b>Control No#: </b> {ticket?.control_no}
                      </span>
                      <span>
                        <b>Subject:</b> {ticket?.ticket_name}
                      </span>
                      <span>
                        <b>Description:</b> <br />{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ticket?.description,
                          }}
                        ></span>
                      </span>
                    </time>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-[3px] bg-green-400  px-2 rounded-md"
                      onClick={() => setDataViewTicket(ticket?.id)}
                    >
                      View
                    </button>
                    {user?.job?.name == "Q.A" ? (
                      <button
                        className="p-[3px] bg-blue-400  px-2 rounded-md"
                        onClick={() => backToProg(ticket?.id)}
                      >
                        Back to Owner
                      </button>
                    ) : (
                      <button
                        className="p-[3px] bg-yellow-400  px-2 rounded-md"
                        onClick={() => setAssignQaData(ticket?.id)}
                      >
                        Assign to QA
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      {/* if else based on Job */}
      {user?.job?.name === "Q.A" ? (
        <BackToProgrammer
          show={showBackToProg}
          setModal={setShowBackToProg}
          title="Back to Programmer"
          ticket={ticket}
        />
      ) : (
        <AssignQA
          show={showAssignQa}
          setModal={setShowAssignQa}
          title="Assign to QA"
          qas={qas}
          ticket={ticket}
        />
      )}
      {/* if else based on Job */}
      <ViewTicket
        show={showViewTicket}
        setModal={setShowViewTicket}
        title="View Ticket"
        ticket={ticket}
        env={env}
        status={status}
        type={type}
        user={user}
      />
    </div>
  );
};

export default Tickets;
