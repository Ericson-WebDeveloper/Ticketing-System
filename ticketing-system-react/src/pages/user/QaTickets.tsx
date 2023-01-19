import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EditAssign from "../../components/QA/EditAssign";
import TicketList from "../../components/QA/TicketList";
import Spinner from "../../components/Spinner";
import { getTicketsAssignQA } from "../../store/programmer/programmerActions";
import {
  loadingProg,
  AllTicketsQA,
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
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { TicketInterface } from "../../models/Ticket";
import { UserInterface } from "../../models/User";

type QaTicketsProps = {};

const QaTickets = (props: QaTicketsProps) => {
  const dispatch = useAppDispatch();
  const [page, setpage] = useSearchParams();
  const [showTickets, setViewTickets] = useState("");
  const shouldLog = useRef(true);
  const { ticket, loading: ticketloading } = useAppSelector(
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

  const { qa_tickets } = useAppSelector((state) => state.programmer);
  const loadingprogrammer = useSelector(loadingProg);
  const { progError, progErrors, progSuccess } = useAppSelector(
    (state) => state.programmer
  );

  const returnPageNumber = useMemo(() => {
    return page.get("page") ? parseInt(page.get("page")!) : 1;
  }, [page]);

  const setTicketUpdate = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setViewTickets("block");
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
    let pageNumber = returnPageNumber;
    const fetchDatas = async () => {
      if (shouldLog.current) {
        shouldLog.current = false;
        await dispatch(getEnv());
        await dispatch(getStatus());
        await dispatch(getType());
        await dispatch(getTicketsAssignQA(pageNumber));
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

  if (
    loadingprogrammer ||
    envloading ||
    typeloading ||
    statusloading ||
    ticketloading
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
                Ticket Assign as QA List
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
                  Owner
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Created At
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {/* Loop Data */}
              {
                // (qa_tickets && qa_tickets?.data !== null && qa_tickets?.data?.length > 0) &&
                qa_tickets?.data?.map(
                  (ticket: TicketInterface<UserInterface>, index: number) => {
                    return (
                      <TicketList
                        showModal1={setTicketUpdate}
                        ticket={ticket}
                        key={index}
                      />
                    );
                  }
                )
              }
            </tbody>
          </table>

          {
            // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
            qa_tickets?.data && qa_tickets?.data?.length > 0 && (
              <div className="flex justify-end mt-5">
                <Pagination
                  activePage={qa_tickets?.current_page!}
                  totalItemsCount={qa_tickets?.total!}
                  itemsCountPerPage={qa_tickets?.per_page!}
                  onChange={async (pageNumber) => {
                    if (pageNumber !== returnPageNumber) {
                      setpage({ page: String(pageNumber) });
                      await dispatch(getTicketsAssignQA(pageNumber));
                      console.log("here");
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

        <EditAssign
          show1={showTickets}
          showModal2={setViewTickets}
          env={env}
          status={status}
          type={type}
          title="Edit Ticket"
          ticket={ticket}
        />
      </div>
    </>
  );
};

export default QaTickets;
