import React, { useState } from "react";
import { useSelector } from "react-redux";
import { usersProgrammer, usersQA } from "../../store/user/userSlice";
import ReaasignUser from "../Forms/ReaasignUser";
import UpdateTicketDetail from "../Forms/UpdateTicketDetail";
import { TicketInterface } from "../../models/Ticket";
import { UserDetailInterface, UserInterface } from "../../models/User";
import { RootState } from "../../store/store";

type EditUserTicketProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  user: UserInterface | null;
  page: number;
  ticket: TicketInterface<UserInterface> | null;
  title: string;
};

const EditUserTicket = ({
  show,
  setModal,
  user,
  page,
  ticket,
  title,
}: EditUserTicketProps) => {
  const [panel, setPanel] = useState<string>("description");
  // const {show, title, setModal} = props;
  const { env } = useSelector((state: RootState) => state.ticketenv);
  const { type } = useSelector((state: RootState) => state.tickettype);
  const { status } = useSelector((state: RootState) => state.ticketstatus);
  const qas = useSelector(usersQA);
  const programmers = useSelector(usersProgrammer);

  return (
    <div
      id="ViewUsertModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
        fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out overflow-y-scroll`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title ? title : "Modal Form"}
            </h3>
            <button
              onClick={() => setModal("")}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 
                                10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <ul
            className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 justify-center
                    dark:border-gray-700 dark:text-gray-400"
          >
            <li className="mr-2">
              <span
                aria-current="page"
                className={`inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg 
                            ${
                              panel === "description" ? "active" : ""
                            }dark:bg-gray-800 dark:text-blue-500 hover:cursor-pointer`}
                onClick={() => setPanel("description")}
              >
                Description
              </span>
            </li>
            <li className="mr-2">
              <span
                className={`inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg 
                            ${
                              panel === "reaasign" ? "active" : ""
                            }dark:bg-gray-800 dark:text-blue-500 hover:cursor-pointer`}
                onClick={() => setPanel("reaasign")}
              >
                Re-Assign
              </span>
            </li>
            <li className="mr-2">
              <span
                className={`inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg 
                            ${
                              panel === "logs" ? "active" : ""
                            }dark:bg-gray-800 dark:text-blue-500 hover:cursor-pointer`}
                onClick={() => setPanel("logs")}
              >
                Logs
              </span>
            </li>
          </ul>

          {panel === "description" && (
            <UpdateTicketDetail
              setModal={setModal}
              ticket={ticket}
              env={env}
              type={type}
              status={status}
            />
          )}

          {panel === "reaasign" && (
            <ReaasignUser
              show={show}
              ticket={ticket}
              setModal={setModal}
              user={user}
              page={page}
              qas={qas}
              programmers={programmers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserTicket;
