import Users from "../models/users_model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import uploadImgOnCloudinary from "../config/clodinary.js";

export const signup = async (req, res) => {
  try {
    let { firstName, lastName, email, password, userName } = req.body;

    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "Send all inputs" });
    }

    let profileImage;
    if (req.file) {
      profileImage = await uploadImgOnCloudinary(req.file.path);
    }

    const existUser = await Users.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exit!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
      profileImage,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Send all inputs" });
    }

    const existUser = await Users.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "User does not exit!" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(existUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "User successfully login", user: existUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserData = async (req, res) => {
  try {
    let id = req.userId;

    if (!id) {
      return res.status(400).json({ message: "User id not found" });
    }

    let user = await Users.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
