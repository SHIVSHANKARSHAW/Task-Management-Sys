import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";

const Body = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[78vh]  w-screen gap-4 px-10 mb-4">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 256 : 70 }}
        animate={{ width: isSidebarOpen ? 256 : 70 }}
        transition={{ duration: 0.3 }}
        className="h-full backdrop-blur-xl rounded-sm font-semibold"
        aria-label="Sidebar"
      >
        <div className="flex  h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="#"
                className={`flex justify-start  p-2 rounded-lg text-white group`}
              >
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:scale-110 text-3xl"
                >
                  {isSidebarOpen ? (
                    <AiOutlineMenuFold />
                  ) : (
                    <AiOutlineMenuUnfold />
                  )}
                </button>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg text-white  ${
                  isSidebarOpen
                    ? "hover:bg-white hover:text-black"
                    : "bg-transparent "
                } group`}
              >
                <svg
                  className={`w-7 h-7  transition duration-75 hover:scale-110`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ms-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Dashboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg text-white  ${
                  isSidebarOpen
                    ? "hover:bg-white hover:text-black"
                    : "bg-transparent "
                } group`}
              >
                <svg
                  className={`w-7 h-7  transition duration-75 hover:scale-110`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ms-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Kanban
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg text-white  ${
                  isSidebarOpen
                    ? "hover:bg-white hover:text-black"
                    : "bg-transparent "
                } group`}
              >
                <svg
                  className={`w-7 h-7  transition duration-75 hover:scale-110`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="flex-1 ms-3 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Inbox
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg text-white  ${
                  isSidebarOpen
                    ? "hover:bg-white hover:text-black"
                    : "bg-transparent "
                } group`}
              >
                <svg
                  className={`w-7 h-7  transition duration-75 hover:scale-110`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="flex-1 ms-3 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Users
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`flex items-center p-2 rounded-lg text-white  ${
                  isSidebarOpen
                    ? "hover:bg-white hover:text-black"
                    : "bg-transparent "
                } group`}
              >
                <svg
                  className={`w-7 h-7  transition duration-75 hover:scale-110`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="flex-1 ms-3 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Products
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          </ul>
        </div>
      </motion.aside>
      {/* Body */}
      <div className="flex-1 p-10 backdrop-blur-xl text-white rounded-sm h-full overflow-y-scroll ">
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Body;
