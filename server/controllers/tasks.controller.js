import Task from "../models/tasks.models.js";
import User from "../models/users.models.js";
import { verifyToken } from "../helper/auth.js";

// Create a new task
export const createTask = [
  verifyToken,
  async (req, res) => {
    try {
      const {
        title,
        description,
        response = null,
        priority,
        assignedBy,
        assignedTo,
        dueDate,
        status = 0,
        createdAt = new Date(),
        completedAt = null,
      } = req.body;

      let assignedToUsers = assignedTo;

      if (!assignedTo) {
        const users = await User.find({ access: { $ne: "admin" } });
        assignedToUsers = users.map((user) => user._id);
      }

      const newTask = new Task({
        title,
        description,
        priority,
        response,
        assignedBy,
        assignedTo: assignedToUsers,
        dueDate,
        status,
        createdAt,
        completedAt,
      });

      await newTask.save();

      if (!assignedTo) {
        const users = await User.find({ access: { $ne: "admin" } });
        for (const user of users) {
          user.tasksAssigned.push(newTask._id);
          await user.save();
        }
      } else {
        const user = await User.findById(assignedTo);
        user.tasksAssigned.push(newTask._id);
        await user.save();
      }

      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Get all tasks
export const getAllTasks = [
  verifyToken,
  async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Get task by ID
export const getTaskById = [
  verifyToken,
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Update task by ID
export const updateTaskById = [
  verifyToken,
  async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        response,
        assignedBy,
        assignedTo,
        status = 0,
        dueDate,
        completedAt,
      } = req.body;
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      task.title = title;
      task.description = description;
      task.response = response;
      task.priority = priority;
      task.assignedBy = assignedBy;
      task.assignedTo = assignedTo;
      task.status = status;
      task.dueDate = dueDate;
      task.completedAt = completedAt;
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Add response to task
export const addResponse = [
  verifyToken,
  async (req, res) => {
    try {
      const { response } = req.body;

      if (!response) {
        return res.status(400).json({ message: "Response is required" });
      }

      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.response = response;
      const updatedTask = await task.save();

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Update Status & CompletedAt
export const updateStatus = [
  verifyToken,
  async (req, res) => {
    try {
      const { status, completedAt = new Date() } = req.body;

      if (!status) {
        return res.status(400).json({ message: "status is required" });
      }

      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.status = status;
      task.completedAt = completedAt;
      const updatedTask = await task.save();

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete task by ID
export const deleteTaskById = [
  verifyToken,
  async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];