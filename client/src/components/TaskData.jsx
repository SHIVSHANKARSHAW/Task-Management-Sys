import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";
import Button from "./Button";
const TaskData = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

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

    fetchTask();
  }, [id]);

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

  return (
    <div className="flex justify-center items-center text-white">
      {task ? (
        <div className="backdrop-blur-lg p-8 text-center w-full">
          <h1 className="text-4xl font-bold mb-4">{task.title}</h1>
          <div className="text-left">
            <p className="text-xl mb-2">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="text-xl mb-2">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="text-xl mb-2">
              <strong>Task Created At :</strong>{" "}
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xl mb-2">
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-xl mb-2">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="text-xl mb-2">
              <strong>Assigned By:</strong> {task.assignedBy}
            </p>
          </div>
          <button onClick={() => setShowResponse(!showResponse)}>
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
                className="w-full p-2 rounded-lg text-black outline-none"
                rows="4"
              ></textarea>
              <button onClick={handleResponseSubmit}>
                <Button content="Submit" py="3" />
              </button>
            </div>
          )}
          <div className="mt-4 flex justify-center gap-4">
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
