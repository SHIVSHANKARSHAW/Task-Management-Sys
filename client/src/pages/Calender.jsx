import React, { useEffect, useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../helpers/AxiosSetup";
import UserContext from "../context/ContextApi";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const Calender = () => {
  const [events, setEvents] = useState([]);
  const{ user }= useContext(UserContext);
  const navigate = useNavigate();

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
        const formattedEvents = userTasks.map((task) => ({
          id: task._id,
          title: task.title,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleSelectEvent = (event) => {
    navigate(`/home/task-data/${event.id}`);
  };

  return (
    <div className="h-full w-full text-white py-6">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default Calender;