// reference click user view icon in php system ticketing
import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getTicket, getUserTickets2 } from "../../store/ticket/ticketActions";
import { getProgrammers, getQAs, getUser2 } from "../../store/user/userActions";
import {
  SETVIEW_USER,
  SET_ERROR,
  userCrudError,
  userLoad,
  userLoading,
  userViewSelector,
} from "../../store/user/userSlice";
import { toast } from "react-toastify";
import { SET_SUCCESS, SET_TICKETS_ERROR } from "../../store/ticket/ticketSlice";
import UserTicketsList from "../../components/Admin/UserTicketsList";
import Pagination from "react-js-pagination";
import EditUserTicket from "../../components/Admin/EditUserTicket";
import { getEnv, getStatus, getType } from "../../store/ticket/ticketActions";
import ViewModal from "../../components/ViewModal";
import TicketDetail from "../../components/TicketDetail";
import { RootState, useAppDispatch } from "../../store/store";
import { UserDetailInterface, UserInterface } from "../../models/User";
import { TicketInterface } from "../../models/Ticket";

type ViewUserTicketProps = {};

const ViewUserTicket = (props: ViewUserTicketProps) => {
  let { email } = useParams();
  const [page, setpage] = useSearchParams();
  const shouldLog = useRef(true);
  const shouldLog1 = useRef(true);
  const shouldLog2 = useRef(true);
  const user = useSelector(userViewSelector);
  const dispatch = useAppDispatch();
  const loadingU = useSelector(userLoading);
  const errorU = useSelector(userCrudError);
  const {
    loading: loadingT,
    error: errorT,
    errors: errorsT,
    ticketuserall,
    ticket,
    success: ticketSuccess,
  } = useSelector((state: RootState) => state.ticket);
  const { loading: envloading } = useSelector(
    (state: RootState) => state.ticketenv
  );
  const { loading: typeloading } = useSelector(
    (state: RootState) => state.tickettype
  );
  const { loading: statusloading } = useSelector(
    (state: RootState) => state.ticketstatus
  );

  const [showTicketModal, setShowTicketModal] = useState("");
  const [showViewTicket, setShowViewTicket] = useState("");

  const userLoadings = useSelector(userLoad);

  const returnPageNumber = useMemo(() => {
    return page.get("page") ? parseInt(page.get("page")!) : 1;
  }, [page]);

  const setTicketToView = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setShowTicketModal("block");
    } catch (error) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const setTicketToViewDetail = async (id: number) => {
    try {
      await dispatch(getTicket(id));
      setShowViewTicket("block");
    } catch (error) {
      toast.error(`Error in Server. Cannot Connect to Server.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  useEffect(() => {
    const fetchDatass = async () => {
      if (shouldLog1.current) {
        shouldLog1.current = false;
        await dispatch(getUser2(String(email)));
        await dispatch(getEnv());
        await dispatch(getStatus());
        await dispatch(getType());
        await dispatch(getQAs());
        await dispatch(getProgrammers());
      }
    };
    fetchDatass();
  }, [dispatch, email]);

  useEffect(() => {
    let pageNumber = returnPageNumber;
    const fetchData = async () => {
      if (user && shouldLog2.current) {
        shouldLog2.current = false;
        await dispatch(getUserTickets2(user?.id, pageNumber));
      }
    };
    fetchData();
  }, [dispatch, user, returnPageNumber]);

  useEffect(() => {
    return () => {
      dispatch(SETVIEW_USER(null));
    };
  }, []);

  useEffect(() => {
    if (errorU) {
      let errorData = errorU;
      dispatch(SET_ERROR(null));
      toast.error(`${errorData}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    if (errorT) {
      let errors = errorT;
      dispatch(SET_TICKETS_ERROR({ error: null, errors: null }));
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          closeOnClick: true,
        });
      });
    }

    if (errorsT) {
      let errors = errorsT;
      dispatch(SET_TICKETS_ERROR({ error: null, errors: null }));
      Object.keys(errors).forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          closeOnClick: true,
        });
      });
    }

    if (ticketSuccess) {
      let message = ticketSuccess;
      dispatch(SET_SUCCESS(null));
      toast.success(`${message}`, {
        theme: "dark",
        autoClose: 10000,
        closeOnClick: true,
      });
    }
  }, [dispatch, errorU, errorT, errorsT, ticketSuccess]);

  if (
    loadingU ||
    loadingT ||
    envloading ||
    typeloading ||
    statusloading ||
    userLoadings
  ) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold font-serif">{user?.name}</h1>
        {user?.detail?.profile_img && (
          <img
            src={user?.detail?.profile_img}
            alt=""
            className="h-56 w-full rounded-[50%] border-2 border-black"
          />
        )}
      </div>
      <div className="flex w-[50%] justify-between">
        <label>
          Role: <b>{user?.roles?.[0].name}</b>
        </label>
        <label>
          Job: <b>{user?.job?.name}</b>
        </label>
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
              {/* <th
                className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
              >
                Programmer
              </th> */}
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
            {"data" in ticketuserall &&
              ticketuserall?.data?.map(
                (ticket: TicketInterface<UserInterface>, index: number) => {
                  return (
                    <UserTicketsList
                      key={index}
                      ticket={ticket}
                      setTicketToView={setTicketToView}
                      setTicket={setTicketToViewDetail}
                    />
                  );
                }
              )}
          </tbody>
        </table>

        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          "data" in ticketuserall && ticketuserall?.data?.length > 0 && (
            <div className="flex justify-end mt-5">
              <Pagination
                activePage={ticketuserall?.current_page!}
                totalItemsCount={ticketuserall?.total!}
                itemsCountPerPage={ticketuserall?.per_page!}
                onChange={async (pageNumber) => {
                  let page: number = returnPageNumber;
                  if (pageNumber !== page) {
                    setpage({ page: String(pageNumber) });
                    await dispatch(getUserTickets2(user?.id!, pageNumber));
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

        <EditUserTicket
          show={showTicketModal}
          setModal={setShowTicketModal}
          user={user}
          page={returnPageNumber}
          ticket={ticket}
          title="Ticket Modal"
        />

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
    </div>
  );
};

export default ViewUserTicket;
