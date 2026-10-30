import express from "express";
import { signup, login, logout } from "../controllers/authControllers.js";
import { upload } from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profileImage"), signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
