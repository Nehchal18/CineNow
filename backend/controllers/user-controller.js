import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(500).json({ message: "Users not found" });
  }

  return res.status(200).json({ users });
};

export const createUser = async (req, res, next) => {
  const { name, username, email, password } = req.body;
  if (
    (!name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "",
    !username && username.trim() === "")
  ) {
    return res.status(422).json({ message: "Invaild input" });
  }
  const hashedpassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, username, email, password: hashedpassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "User not created" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, username, email, password } = req.body;
  if (
    (!name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "",
    !username && username.trim() === "")
  ) {
    return res.status(422).json({ message: "Invaild input" });
  }
  const hashedpassword = bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      username,
      password: hashedpassword,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "User not updated" });
  }
  return res.status(200).json({ message: "User updated" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "User not deleted" });
  }
  return res.status(200).json({ message: "User deleted" });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invaild input" });
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Password not match" });
  }
  return res.status(200).json({ message: "Login Successfull", id: user._id });
};

export const getBookingsOfUser = async (req, res, next) => {
  const userId = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ user: userId }).populate("movie");
  } catch (error) {
    return console.log(error);
  }

  if (!bookings) {
    return res.status(500).json({ message: "Bookings not found" });
  }
  return res.status(200).json({ bookings });
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};
