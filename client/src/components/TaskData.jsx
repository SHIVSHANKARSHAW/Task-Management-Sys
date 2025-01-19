import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";
import Button from "./Button";
import { useUser } from "../context/ContextApi";
import moment from "moment";

const TaskData = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/tasks/view/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
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
      fetchTask();
      fetchUsers();
    }
  }, [id, user]);

  const handleResponseSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/tasks/update/response/${id}`,
        { response },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Response submitted successfully");
      setResponse("");
      setShowResponse(false);
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/tasks/update/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask((prevTask) => ({ ...prevTask, status }));
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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

  return (
    <div className="flex justify-center items-center text-white ">
      {task ? (
        <div className="backdrop-blur-lg p-8 text-center w-full space-y-8">
          <h1 className="text-4xl font-bold mb-4">{task.title}</h1>
          <div className="text-left">
            <p className="text-xl mb-2">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="text-xl mb-2">
              <strong>Status:</strong> {getStatusText(task.status)}
            </p>
            <p className="text-xl mb-2">
              <strong>Task Created At :</strong>{" "}
              {moment(task.createdAt).format("DD MMM YYYY")}
            </p>
            <p className="text-xl mb-2">
              <strong>Due Date:</strong>{" "}
              {moment(task.dueDate).format("DD MMM YYYY")}
            </p>
            <p className="text-xl mb-2">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="text-xl mb-2">
              <strong>Assigned By:</strong> {getUserNameById(task.assignedBy)}
            </p>
            {(user.access === "admin") & (task.completedAt != null) ? (
              <p className="text-xl mb-2">
                <strong>Task Concluded On :</strong> {moment(task.completedAt).format("DD MMM YYYY")}
              </p>
            ) : (
              <></>
            )}
          </div>
          <button
            onClick={() => setShowResponse(!showResponse)}
            className="flex justify-start"
          >
            <Button content={showResponse ? "Cancel" : "Add Response"} py="3" />
          </button>
          {showResponse && (
            <div className="mt-4">
              <label htmlFor="response" className="block text-xl mb-2">
                Response
              </label>
              <textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full p-2 rounded-lg text-black outline-none mb-4"
                rows="4"
              ></textarea>
              <button onClick={handleResponseSubmit}>
                <Button content="Submit" py="3" />
              </button>
            </div>
          )}
          <div className="mt-4 flex gap-4">
            <button onClick={() => updateStatus(1)}>
              <Button content="Mark as Completed" py="3" />
            </button>
            <button onClick={() => updateStatus(-1)}>
              <Button content="Mark as Rejected" py="3" />
            </button>
          </div>
        </div>
      ) : (
        <p className="flex h-full place-content-center">
          Loading task details...
        </p>
      )}
    </div>
  );
};

export default TaskData;
