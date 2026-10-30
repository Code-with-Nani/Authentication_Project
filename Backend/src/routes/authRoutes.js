import express from "express";
import {
  signup,
  login,
  logout,
  getUserData,
} from "../controllers/authControllers.js";
import { upload } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profileImage"), signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/getUserData", checkAuth, getUserData);

export default authRouter;
