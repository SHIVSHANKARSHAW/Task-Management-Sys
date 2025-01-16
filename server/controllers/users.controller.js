import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../helper/auth.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      access = "user",
      tasksAssigned = [],
      tasksCompleted = [],
      createdAt = new Date(),
    } = req.body;
    console.log("Received body:", req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      access,
      tasksAssigned,
      tasksCompleted,
      createdAt,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = [
  verifyToken,
  async (req, res) => {
    try {
      const users = await User.find().populate("tasksAssigned tasksCompleted");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Get user by ID
export const getUserById = [
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate(
        "tasksAssigned tasksCompleted"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Get current user details
export const getCurrentUser = [
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// User login
export const loginUser = async (req, res) => {
  try {
    if (req.cookies.token) {
      return res.status(400).json({ message: "User already logged in" });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        access: user.access,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
  
};

// Update user by ID
export const updateUserById = [
  verifyToken,
  async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        access,
        tasksAssigned,
        tasksCompleted,
      } = req.body;
      console.log("Received body:", req.body);
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.username = username;
      user.email = email;
      user.access = access;
      user.tasksAssigned = tasksAssigned;
      user.tasksCompleted = tasksCompleted;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete user by ID
export const deleteUserById = [
  verifyToken,
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
