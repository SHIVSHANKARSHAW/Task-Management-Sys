import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useUser } from "../context/ContextApi";
import Button from "../components/Button";
import { FaSearch } from "react-icons/fa";
import moment from "moment-timezone";


const AdminSearch = ({ tasks, users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useUser();

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
      default:
        return "Task Assigned";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "priority", headerName: "Priority", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 100 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "assignedTo", headerName: "Assigned To", width: 120 },
    { field: "assignedBy", headerName: "Assigned By", width: 120 },
  
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

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = filteredTasks.map((task, index) => ({
    id: task._id,
    title: task.title,
    priority: task.priority,
    status: getStatusText(task.status),
    dueDate: moment(task.dueDate).tz("Asia/Kolkata").format("DD-MM-YYYY"),
    description: task.description,
    assignedTo: getUserNameById(task.assignedTo),
    assignedBy: getUserNameById(task.assignedBy),
  }));

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by Task Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pl-10 border border-gray-300 rounded text-black font-semibold"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Paper style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Paper>
    </div>
  );
};

export default AdminSearch;
