import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("Backend connected successfully!");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is listening on ${port}`);
});
