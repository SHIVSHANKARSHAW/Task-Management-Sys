import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import axios from "../helpers/AxiosSetup";
import { useUser } from "../context/ContextApi";
import Button from "../components/Button";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
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

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "priority", headerName: "Priority", width: 110 },
    { field: "status", headerName: "Status", width: 110 },
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
    status: task.status,
    dueDate: new Date(task.dueDate).toLocaleDateString(),
    description: task.description,
    assignedBy: task.assignedBy,
  }));

  return (
    <Paper style={{ height: 515, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Paper>
  );
};

export default Tasks;
