import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { backdrop } from "../helper/Animation";

type ModalFormProps = {
  show: string;
  children: JSX.Element;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
};

const ModalForm = ({ show, title, children, setModal }: ModalFormProps) => {
  return (
    <AnimatePresence>
      {show && (
        // <motion.div className='backdrop' variants={backdrop} initial="hidden" animate="visible" exit="exit">
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className={`${!show ? "hidden" : show} 
                        fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out`}
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
              {children}

            </div>
          </div>
        </div>
        // </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;
