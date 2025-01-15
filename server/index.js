import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectToDatabase from "./DB/database.js";
import userRoutes from "./routes/users.route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

configDotenv();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

connectToDatabase();


// Use user routes
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});