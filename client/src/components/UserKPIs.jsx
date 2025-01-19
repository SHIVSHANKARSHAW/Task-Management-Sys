import React from "react";
import moment from "moment";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const UserKPIs = ({ users, tasks }) => {
  const totalTasksAssigned = tasks.length;
  const tasksCompleted = tasks.filter((task) => task.status === 1).length;
  const tasksPending = tasks.filter((task) => task.status === 0).length;
  const tasksOverdue = tasks.filter(
    (task) =>
      task.status === 0 && moment(task.dueDate).isBefore(moment(), "day")
  ).length;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
      <motion.div
        className="bg-white overflow-hidden shadow sm:rounded-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
              Total Tasks Assigned
            </dt>
            <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
              <CountUp end={totalTasksAssigned} duration={2} />
            </dd>
          </dl>
        </div>
      </motion.div>
      <motion.div
        className="bg-white overflow-hidden shadow sm:rounded-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
              Tasks Completed
            </dt>
            <dd className="mt-1 text-3xl leading-9 font-semibold text-green-400">
              <CountUp end={tasksCompleted} duration={2} />
            </dd>
          </dl>
        </div>
      </motion.div>
      <motion.div
        className="bg-white overflow-hidden shadow sm:rounded-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-sm leading-5 font-medium text-gray-500 truncate ">
              Tasks Pending
            </dt>
            <dd className="mt-1 text-3xl leading-9 font-semibold text-orange-300">
              <CountUp end={tasksPending} duration={2} />
            </dd>
          </dl>
        </div>
      </motion.div>
      <motion.div
        className="bg-white overflow-hidden shadow sm:rounded-lg"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <dl>
            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
              Tasks Overdue
            </dt>
            <dd className="mt-1 text-3xl leading-9 font-semibold text-red-500">
              <CountUp end={tasksOverdue} duration={2} />
            </dd>
          </dl>
        </div>
      </motion.div>
    </div>
  );
};

export default UserKPIs;
