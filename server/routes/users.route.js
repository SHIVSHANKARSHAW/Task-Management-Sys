import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
} from "../controllers/users.controller.js";
import { verifyToken } from "../helper/auth.js";

const router = express.Router();

router.post("/new", createUser);
router.get("/viewall", verifyToken, getAllUsers);
router.get("/view/:id", verifyToken, getUserById);
router.put("/edit/:id", verifyToken, updateUserById);
router.delete("/remove/:id", verifyToken, deleteUserById);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;