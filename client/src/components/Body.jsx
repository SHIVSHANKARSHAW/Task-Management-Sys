import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Calender from "../pages/Calender";
import Tasks from "../pages/Tasks";
import Today from "../pages/Today";
import CreateTask from "../pages/CreateTask";
import Error from "../pages/Error";
import TaskData from "./TaskData";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCreateTask from "../pages/admin/AdminCreateTask";
import { useUser } from "../context/ContextApi";

const Body = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // h-[78vh] 
  return (
    <div className="flex h-screen w-screen gap-4 px-10 ">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 256 : 70 }}
        animate={{ width: isSidebarOpen ? 256 : 70 }}
        transition={{ duration: 0.3 }}
        className="h-full backdrop-blur-xl rounded-sm font-semibold"
        aria-label="Sidebar"
      >
        <div className="flex h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Menu Button */}
            <li>
              <div
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
              </div>
            </li>

            {user.access === "admin" ? (
              <>
                {/* Dashboard */}
                <li>
                  <Link
                    to="/home/admin/dashboard"
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
                {/* Create Task*/}
                <li>
                  <Link
                    to="/home/admin/create-task"
                    className={`flex items-center p-2 rounded-lg text-white  ${
                      isSidebarOpen
                        ? "hover:bg-white hover:text-black"
                        : "bg-transparent "
                    } group`}
                  >
                    <svg
                      className={`w-7 h-7 transition duration-75 hover:scale-110`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14h-2v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
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
                          Create Task
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Tasks */}
                <li>
                  <Link
                    to="/home/tasks"
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
                          Tasks
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Today */}
                <li>
                  <Link
                    to="/home/today"
                    className={`flex items-center p-2 rounded-lg text-white  ${
                      isSidebarOpen
                        ? "hover:bg-white hover:text-black"
                        : "bg-transparent "
                    } group`}
                  >
                    <svg
                      className={`w-7 h-7 transition duration-75 hover:scale-110`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
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
                          Today
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Calender */}
                <li>
                  <Link
                    to="/home/calender"
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
                          Calender
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Dashboard */}
                <li>
                  <Link
                    to="/home/dashboard"
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
                {/* Create Task*/}
                <li>
                  <Link
                    to="/home/create-task"
                    className={`flex items-center p-2 rounded-lg text-white  ${
                      isSidebarOpen
                        ? "hover:bg-white hover:text-black"
                        : "bg-transparent "
                    } group`}
                  >
                    <svg
                      className={`w-7 h-7 transition duration-75 hover:scale-110`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14h-2v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
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
                          Create Task
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Tasks */}
                <li>
                  <Link
                    to="/home/tasks"
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
                          Tasks
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Today */}
                <li>
                  <Link
                    to="/home/today"
                    className={`flex items-center p-2 rounded-lg text-white  ${
                      isSidebarOpen
                        ? "hover:bg-white hover:text-black"
                        : "bg-transparent "
                    } group`}
                  >
                    <svg
                      className={`w-7 h-7 transition duration-75 hover:scale-110`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
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
                          Today
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
                {/* Calender */}
                <li>
                  <Link
                    to="/home/calender"
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
                          Calender
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </motion.aside>
      {/* Body */}
      <div className="flex-1 backdrop-blur-xl text-white rounded-sm h-full overflow-y-scroll ">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/admin/create-task" element={<AdminCreateTask />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/today" element={<Today />} />
          <Route path="/task-data/:id" element={<TaskData />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

export default Body;
