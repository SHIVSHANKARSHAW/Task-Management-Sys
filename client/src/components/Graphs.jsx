import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { motion } from "framer-motion";

const Graphs = ({ tasks }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"];

  const taskStatusData = [
    {
      name: "Task Pending",
      value: tasks.filter((task) => task.status === 0).length,
    },
    {
      name: "Task Completed",
      value: tasks.filter((task) => task.status === 1).length,
    },
    {
      name: "Task Rejected",
      value: tasks.filter((task) => task.status === -1).length,
    },
    {
      name: "Task Overdue",
      value: tasks.filter(
        (task) => task.status === 0 && moment(task.dueDate).isBefore(moment(), 'day')
      ).length,
    },
  ];

  const tasksByMonth = tasks.reduce((acc, task) => {
    const month = moment(task.createdAt).format("MMM YYYY");
    if (!acc[month]) {
      acc[month] = {
        Pending: 0,
        Completed: 0,
        Rejected: 0,
        Overdue: 0,
        TasksAssigned: 0,
      };
    }
    acc[month].TasksAssigned += 1;
    if (task.status === 0) {
      acc[month].Pending += 1;
      if (moment(task.dueDate).isBefore(moment(), 'day')) {
        acc[month].Overdue += 1;
      }
    } else if (task.status === 1) {
      acc[month].Completed += 1;
    } else if (task.status === -1) {
      acc[month].Rejected += 1;
    }
    return acc;
  }, {});

  const tasksByMonthData = Object.keys(tasksByMonth).map((month) => ({
    month,
    Pending: tasksByMonth[month].Pending,
    Completed: tasksByMonth[month].Completed,
    Rejected: tasksByMonth[month].Rejected,
    Overdue: tasksByMonth[month].Overdue,
    TasksAssigned: tasksByMonth[month].TasksAssigned,
  }));

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center space-y-8 bg-white text-black py-4 rounded-md">
      <h1 className="text-center text-2xl font-semibold">
        Task Stats
      </h1>
      <div className="flex flex-wrap justify-center space-x-8">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-medium mb-4">Task Status Distribution</h2>
          <ResponsiveContainer width={300} height={400}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium mb-4">Tasks Assigned Month-wise</h2>
          <ResponsiveContainer width={700} height={400}>
            <BarChart data={tasksByMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Pending" stackId="a" fill="#4CAF50" />
              <Bar dataKey="Completed" stackId="a" fill="#FF9800" />
              <Bar dataKey="Rejected" stackId="a" fill="#F44336" />
              <Bar dataKey="Overdue" stackId="a" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-medium mb-4">Total Tasks Assigned</h2>
        <ResponsiveContainer width={800} height={400}>
          <LineChart data={tasksByMonthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="TasksAssigned" stroke="#4CAF50" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Graphs;
