import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  addResponse,
  updateStatus
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.post("/new", createTask);
router.get("/view", getAllTasks);
router.get("/view/:id", getTaskById);
router.put("/update/:id", updateTaskById);
router.put("/update/status/:id", updateStatus);
router.put("/update/response/:id", addResponse);
router.delete("/remove/:id", deleteTaskById);

export default router;
