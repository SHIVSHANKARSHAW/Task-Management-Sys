import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "../helpers/AxiosSetup";
import { useUser } from "../context/ContextApi";

const Today = () => {
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
        setTasks(response.data);
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
  ];

  const rows = tasks.map((task, index) => ({
    id: index + 1,
    title: task.title,
    priority: task.priority,
    status: task.status,
    dueDate: new Date(task.dueDate).toLocaleDateString(),
    description: task.description,
    assignedBy: task.assignedBy,
  }));

  return (
    <>
      <Paper style={{ height: 515, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Paper>
    </>
  );
};

export default Today;
