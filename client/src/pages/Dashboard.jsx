import React, { useEffect, useState } from "react";
import UserKPIs from "../components/UserKPIs";
import Upcoming from "../components/Upcoming";
import Graphs from "../components/Graphs";
import Search from "../components/Search";
import axios from "../helpers/AxiosSetup";
import { useUser } from "../context/ContextApi";

const Dashboard = () => {
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
        const userTasks = response.data.filter(
          (task) => task.assignedTo === user._id
        );
        setTasks(userTasks);
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
      <div className="p-4 flex-col space-y-10">
        <UserKPIs />
        <Search tasks={tasks} users={users} />
        <Graphs tasks={tasks} users={users} />
        <Upcoming tasks={tasks} users={users} />
      </div>
    </>
  );
};

export default Dashboard;
