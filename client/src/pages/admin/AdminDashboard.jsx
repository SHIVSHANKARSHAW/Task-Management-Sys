import React, { useEffect, useState } from "react";
import UserKPIs from "../../components/UserKPIs";
import AdminSearch from "../../components/AdminSearch";
import axios from "../../helpers/AxiosSetup";
import { useUser } from "../../context/ContextApi";
import Graphs from "../../components/Graphs";
import Upcoming from "../../components/Upcoming";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tasks/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/users/viewall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user) {
      fetchTasks();
      fetchUsers();
    }
  }, [user]);

  return (
    <>
      <motion.div
        className="p-4 flex-col space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <h1 className="text-3xl font-semibold text-center mt-2">Dashboard</h1>
        <UserKPIs users={users} tasks={tasks} />
        <AdminSearch users={users} tasks={tasks} />
        <Graphs tasks={tasks} users={users} />
        <Upcoming tasks={tasks} users={users} />
      </motion.div>
    </>
  );
};

export default AdminDashboard;
