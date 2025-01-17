import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectToDatabase from "./DB/database.js";
import userRoutes from "./routes/users.route.js";
import taskRoutes from "./routes/tasks.route.js";

const app = express();

configDotenv();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

connectToDatabase();

// Use user routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
