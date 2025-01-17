import Task from "../models/tasks.models.js";
import { verifyToken } from "../helper/auth.js";

// Create a new task
export const createTask = [
  verifyToken,
  async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        assignedBy,
        assignedTo,
        dueDate,
        status = 0,
        createdAt = new Date(),
        completedAt = null,
      } = req.body;
      const newTask = new Task({
        title,
        description,
        priority,
        assignedBy,
        assignedTo,
        dueDate,
        status,
        createdAt,
        completedAt,
      });
      await newTask.save();
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
        assignedBy,
        assignedTo,
        status,
        dueDate,
        completedAt,
      } = req.body;
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      task.title = title;
      task.description = description;
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