import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../helpers/AxiosSetup";
import toast from "react-hot-toast";
import UserContext from "../../context/ContextApi";

const AdminCreateTask = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
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
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const taskResponse = await axios.post(
        "/tasks/new",
        {
          title,
          priority,
          dueDate,
          description,
          assignedBy: user._id,
          assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const taskId = taskResponse.data._id;

      await axios.put(
        `/users/edit/${assignedTo}`,
        {
          tasksAssigned: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task created successfully");
      setTitle("");
      setPriority("Medium");
      setDueDate(new Date());
      setDescription("");
      setAssignedTo("");
    } catch (error) {
      toast.error("Failed to create task");
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="h-full w-full p-10">
      <form
        className="w-full flex flex-col place-content-center"
        onSubmit={submitHandler}
      >
        {/* Row 1 */}
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Title */}
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full font-semibold bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Priority */}
          <div className="w-full md:w-1/3 px-3 font-semibold">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="priority"
            >
              Priority
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          {/* Due Date */}
          <div className="w-full md:w-1/3 px-3 font-semibold">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Assign Task To */}
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="assignedTo"
            >
              Assign Task To
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Row 3 */}
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Description */}
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="block font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              rows={8}
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs italic">
              Make it easy to read and understand
            </p>
          </div>
        </div>
        <button type="submit">
          <Button content="Submit" />
        </button>
      </form>
    </div>
  );
};

export default AdminCreateTask;
