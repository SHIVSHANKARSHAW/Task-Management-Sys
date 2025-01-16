import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  dueDate: {
    type: Date,
    default: () => new Date(),
  },
  completedAt: {
    type: Date,
    default: () => new Date(),
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;