import React, { useEffect, useRef, useState } from "react";
import TicketDetail from "../../components/TicketDetail";
import ViewModal from "../../components/ViewModal";
import {
  SET_USER_TICKETS_DEFAULT,
  SET_USER_TICKETS_FILTER,
} from "../../store/ticket/ticketSlice";
import {
  getCountTickets,
  getStatus,
  getTicket,
  getUserTickets,
} from "../../store/ticket/ticketActions";
import Spinner from "../../components/Spinner";
import OtherHelper from "../../helper/OtherHelper";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TicketStatusInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type TicketsProps = {};

interface CountTicketStatus {
  id: number;
  count_total: number;
  status_name: string;
}

const Tickets = (props: TicketsProps) => {
  const dispatch = useAppDispatch();
  const shouldLog1 = useRef(true);
  const [searchStatus, setSearchStatus] = useSearchParams();
  const { returningStatusColor } = OtherHelper();
  const { status, loading: statusloading } = useAppSelector(
    (state) => state.ticketstatus
  );
  const {
    loading: ticketuserloading,
    ticketuseralltemp,
    ticket,
  } = useAppSelector((state) => state.ticket);
  const [selectStatus, setSelecStatus] = useState(0);
  const [showViewModal, setViewModal] = useState("");
  const [countStatus, setCountStatus] = useState<CountTicketStatus[]>([]);

  const viewTicketDetails = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setViewModal("block");
    } catch {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const changeStatusFIlter = (id: number) => {
    setSelecStatus(id);
    let statusname =
      id === 0
        ? { status_name: "All" }
        : status?.find((stat: TicketStatusInterface) => stat.id === id);
    setSearchStatus({ status: statusname?.status_name! });
  };

  const getCounts = async () => {
    let counts = await dispatch(getCountTickets());
    setCountStatus(counts);
    // setCountStatus(response?.data.counts);
  };

  useEffect(() => {
    // api call rerender hook fixed
    // link: https://www.youtube.com/watch?v=MXSuOR2yRvQ
    const fetchDatas = async () => {
      if (shouldLog1.current) {
        shouldLog1.current = false;
        setSearchStatus();
        await dispatch(getStatus());
        await dispatch(getUserTickets());
        await getCounts();
      }
    };
    fetchDatas();
  }, [dispatch]);

  useEffect(() => {
    // status in search params
    if (searchStatus.get("status")) {
      let statusFilter = searchStatus.get("status");
      if (statusFilter === "All") {
        dispatch(SET_USER_TICKETS_DEFAULT());
      } else {
        dispatch(SET_USER_TICKETS_FILTER(statusFilter!));
      }
    }
  }, [searchStatus, dispatch]);

  if (statusloading || ticketuserloading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex space-x-2 items-center">
          <h1 className="text-4xl text-green-400 font-serif">All Tickets</h1>
          <select
            name="status"
            id="status"
            value={selectStatus}
            onChange={(e) => changeStatusFIlter(parseInt(e.target.value))}
            className="w-[250px] border-[1px] 
          border-gray-500 p-[2px] rounded-lg focus:outline-none text-2xl"
          >
            <option value={0} className="">
              All
            </option>
            {status?.map((status: TicketStatusInterface, index: number) => {
              return (
                <option key={index} value={status.id}>
                  {status.status_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex space-x-2 items-center">
          {countStatus?.map(
            (
              status: { id?: number; count_total: number; status_name: string },
              index: number
            ) => {
              return (
                <div
                  className={`p-1 flex space-x-2 ${
                    returningStatusColor(status?.status_name)?.color
                  } rounded-lg`}
                  key={index}
                >
                  <h3 className="font-semibold">{status.status_name}</h3>
                  <span>({status.count_total})</span>
                </div>
              );
            }
          )}
        </div>

        <div className="w-[90%]">
          {!("data" in ticketuseralltemp) &&
            ticketuseralltemp?.map((user: UserInterface, index: number) => {
              return (
                <span key={index}>
                  <div className=" flex flex-col rounded-lg border-[1px] border-black max-h-[350px] overflow-y-auto">
                    <div className=" bg-slate-700 text-white p-2 py-4 rounded-t-lg">
                      <h1 className="text-2xl font-serif font-semibold">
                        {user?.name}
                      </h1>
                    </div>
                    {/* loop */}
                    {user?.programmertickets?.map((ticket, index) => {
                      return (
                        <span key={index}>
                          <div
                            className="p-2 flex flex-col space-y-2 cursor-pointer"
                            onClick={() => viewTicketDetails(ticket.id)}
                            key={index}
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                              <div className="flex flex-col sm:flex-row items-center space-x-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                                </svg>
                                <h1>Ticket Title: {ticket.ticket_name}</h1>
                                <span
                                  className={`p-1 ${
                                    returningStatusColor(
                                      ticket?.progress?.status?.status_name ||
                                        ""
                                    )?.color
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
                                Created By: {ticket?.creator?.name} At: date (
                                {moment(ticket?.created_at).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                                )
                              </h3>
                            </div>
                          </div>
                          <div className="py-2">
                            <div className="w-full border-[1px] border-t border-gray-600"></div>
                          </div>
                        </span>
                      );
                    })}
                  </div>
                  <div className="py-4">
                    <div className="w-full border-2 border-t border-gray-600"></div>
                  </div>
                </span>
              );
            })}
        </div>
      </div>

      <ViewModal
        show={showViewModal}
        setModal={setViewModal}
        title="Ticket Details"
      >
        <>
          <TicketDetail setModal={setViewModal} ticket={ticket} />
        </>
      </ViewModal>
    </div>
  );
};

export default Tickets;
