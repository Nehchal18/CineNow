import express from "express";
import { getAllUsers, createUser, updateUser , deleteUser, loginUser, getBookingsOfUser, getUserById} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/bookings/:id", getBookingsOfUser)

 
export default userRouter;