import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import TicketList from "../../components/User/TicketList";
import ViewTicket from "../../components/User/ViewTicket";
import { getTicketsUserAll } from "../../store/programmer/programmerActions";
import {
  allTickets,
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
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import TicketDetail from "../../components/TicketDetail";
import ViewModal from "../../components/ViewModal";
import { SET_TICKETS_ERROR } from "../../store/ticket/ticketSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type ListProps = {};

const List = (props: ListProps) => {
  const [page, setpage] = useSearchParams();
  const shouldLog = useRef(true);
  // QA/User all tickets that programmer_id match
  const [showTickets, setViewTickets] = useState("");
  const [showViewTicket, setShowViewTicket] = useState("");
  const dispatch = useAppDispatch();
  const tickets = useSelector(allTickets);
  const loadingprogrammer = useSelector(loadingProg);
  const { user } = useAppSelector((state) => state.user);
  const {
    loading: loadingTicketSlice,
    ticket,
    error: Terror,
    errors: Terrors,
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
  const { progError, progErrors, progSuccess } = useAppSelector(
    (state) => state.programmer
  );

  const setEditTicket = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setViewTickets("block");
    } catch (error: any) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const setViewGetTicket = async (id: number) => {
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

  const returnPageNumber = useMemo(() => {
    return page.get("page") ? parseInt(page.get("page")!) : 1;
  }, [page]);

  useEffect(() => {
    let pageNumber = returnPageNumber;

    const fetchDatas = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;
        await dispatch(getEnv());
        await dispatch(getStatus());
        await dispatch(getType());
        await dispatch(getTicketsUserAll(pageNumber));
      }
    };

    fetchDatas();
  }, [dispatch, returnPageNumber]);

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

    if (Terror) {
      let errorData = Terror;
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
      dispatch(SET_TICKETS_ERROR({ error: null, errors: null }));
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

    if (Terrors) {
      let errors = Terrors;
      dispatch(SET_TICKETS_ERROR({ error: null, errors: null }));
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
  }, [dispatch, progError, progErrors, progSuccess, Terror, Terrors]);

  if (
    loadingprogrammer ||
    loadingTicketSlice ||
    envloading ||
    typeloading ||
    statusloading
  ) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <>
      <div
        className={`font-semibold text-lg 
         text-gray-700`}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={`font-semibold text-lg 
                text-gray-700`}
              >
                Ticket List (All Lahat)
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Ticket Name
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Control No
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Status
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Programmer
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  QA
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {/* Loop Data */}
              {tickets?.data?.map(
                (ticket: TicketInterface<UserInterface>, index: number) => {
                  return (
                    <TicketList
                      key={index}
                      setEditTicket={setEditTicket}
                      setViewGetTicket={setViewGetTicket}
                      ticket={ticket}
                    />
                  );
                }
              )}
            </tbody>
          </table>

          {
            // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
            tickets?.data && tickets?.data?.length > 0 && (
              <div className="flex justify-end mt-5">
                <Pagination
                  activePage={tickets?.current_page!}
                  totalItemsCount={tickets?.total!}
                  itemsCountPerPage={tickets?.per_page!}
                  onChange={async (pageNumber) => {
                    if (pageNumber !== returnPageNumber) {
                      setpage({ page: String(pageNumber) });
                      await dispatch(getTicketsUserAll(pageNumber));
                    }
                  }}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                />
              </div>
            )
          }
        </div>
        <ViewTicket
          show={showTickets}
          setModal={setViewTickets}
          title="Edit Ticket"
          ticket={ticket}
          env={env}
          status={status}
          type={type}
          user={user}
        />
        {/* <EditTicket show1={showTickets} showModal2={setViewTickets} title='Edit Ticket' user={user} ticket={ticket} /> */}
        <ViewModal
          show={showViewTicket}
          setModal={setShowViewTicket}
          title="Ticket Details"
        >
          <>
            <TicketDetail setModal={setShowViewTicket} ticket={ticket} />
          </>
        </ViewModal>
      </div>
    </>
  );
};

export default List;
