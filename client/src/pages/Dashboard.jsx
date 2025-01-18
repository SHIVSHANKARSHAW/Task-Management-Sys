import React, { useEffect, useState } from "react";
import { useUser } from "../context/ContextApi";
import axios from "../helpers/AxiosSetup";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { user } = useUser();
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksInProgress: 0,
    overdueTasks: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTaskStats(response.data);
      } catch (error) {
        console.error("Error fetching task stats:", error);
      }
    };

    const fetchRecentTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecentTasks(response.data);
      } catch (error) {
        console.error("Error fetching recent tasks:", error);
      }
    };

    const fetchUpcomingTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/upcoming", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpcomingTasks(response.data);
      } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
      }
    };

    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/completed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompletedTasks(response.data);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    fetchTaskStats();
    fetchRecentTasks();
    fetchUpcomingTasks();
    fetchCompletedTasks();
  }, []);

  const pieData = [
    { name: "In Progress", value: taskStats.tasksInProgress },
    { name: "Completed", value: taskStats.tasksCompleted },
    { name: "Overdue", value: taskStats.overdueTasks },
  ];

  const lineData = [
    { name: "Jan", tasksCompleted: 12 },
    { name: "Feb", tasksCompleted: 19 },
    { name: "Mar", tasksCompleted: 3 },
    { name: "Apr", tasksCompleted: 5 },
    { name: "May", tasksCompleted: 2 },
    { name: "Jun", tasksCompleted: 3 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className=" p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">User Information</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className=" p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Task Statistics</h3>
          <p>Total Tasks: {taskStats.totalTasks}</p>
          <p>Tasks Completed: {taskStats.tasksCompleted}</p>
          <p>Tasks In Progress: {taskStats.tasksInProgress}</p>
          <p>Overdue Tasks: {taskStats.overdueTasks}</p>
        </div>
        <div className="  p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Recent Tasks</h3>
          <ul>
            {recentTasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
        <div className="  p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
          <ul>
            {upcomingTasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
        <div className="  p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
          <ul>
            {completedTasks.map((task) => (
              <li key={task._id}>{task.title}</li>
            ))}
          </ul>
        </div>
        <div className="  p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Task Status Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="  p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Task Completion Over Time</h3>
          <LineChart
            width={500}
            height={300}
            data={lineData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tasksCompleted" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;