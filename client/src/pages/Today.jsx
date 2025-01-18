import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "../helpers/AxiosSetup";
import { useUser } from "../context/ContextApi";
import moment from "moment-timezone";
import Button from "../components/Button";
import { Link } from "react-router-dom";



const Today = () => {
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
        const today = moment().tz("Asia/Kolkata").startOf('day');
        const userTasks = response.data.filter(
          (task) => 
            task.assignedTo === user._id &&
            moment(task.dueDate).tz("Asia/Kolkata").isSame(today, 'day')
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

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown";
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Task Completed";
      case -1:
        return "Task Rejected";
      case 0:
        return "Task Assigned";
      default:
        return "Task Assigned";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "priority", headerName: "Priority", width: 110 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "assignedBy", headerName: "Assigned By", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Link to={`/home/task-data/${params.row.id}`}>
          <Button content="View Task" py="1" />
        </Link>
      ),
    },
  ];

  const rows = tasks.map((task, index) => ({
    id: task._id,
    title: task.title,
    priority: task.priority,
    status: getStatusText(task.status),
    dueDate: moment(task.dueDate).tz("Asia/Kolkata").format("DD-MM-YYYY"),
    description: task.description,
    assignedBy: getUserNameById(task.assignedBy),
  }));

  return (
    <Paper style={{ height: 515, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Paper>
  );
};

export default Today;
