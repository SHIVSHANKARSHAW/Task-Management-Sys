import React, { useState } from "react";
import moment from "moment";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Upcoming = ({ tasks }) => {
  const [showMoreToday, setShowMoreToday] = useState(false);
  const [showMoreTomorrow, setShowMoreTomorrow] = useState(false);
  const [showMoreOverdue, setShowMoreOverdue] = useState(false);
  const navigate = useNavigate();

  const today = moment().startOf("day");
  const tomorrow = moment().add(1, "day").startOf("day");

  const todayTasks = tasks.filter((task) =>
    moment(task.dueDate).isSame(today, "day")
  );
  const tomorrowTasks = tasks.filter((task) =>
    moment(task.dueDate).isSame(tomorrow, "day")
  );
  const overdueTasks = tasks.filter((task) =>
    moment(task.dueDate).isBefore(today, "day")
  );

  const handleTaskClick = (taskId) => {
    navigate(`/home/task-data/${taskId}`);
  };

  const renderTasks = (tasks, showMore, setShowMore) => (
    <>
      <AnimatePresence>
        {tasks.slice(0, showMore ? tasks.length : 5).map((task) => (
          <motion.div
            key={task._id}
            className="p-2 border-b border-gray-200 cursor-pointer flex items-center space-x-5"
            onClick={() => handleTaskClick(task._id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-500">
              {moment(task.dueDate).format("DD MMM YYYY")}
            </p>
            <p className="font-semibold">{task.title}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      {tasks.length > 5 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center justify-center w-full p-2 text-blue-500"
        >
          {showMore ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Upcoming Tasks
      </h1>
      <div>
        <h2 className="text-xl font-bold mb-2">Today</h2>
        <div className="bg-white text-black rounded-lg shadow-md space-y-1">
          {renderTasks(todayTasks, showMoreToday, setShowMoreToday)}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Tomorrow</h2>
        <div className="bg-white text-black rounded-lg shadow-md">
          {renderTasks(tomorrowTasks, showMoreTomorrow, setShowMoreTomorrow)}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Overdue</h2>
        <div className="bg-white text-black rounded-lg shadow-md">
          {renderTasks(overdueTasks, showMoreOverdue, setShowMoreOverdue)}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;