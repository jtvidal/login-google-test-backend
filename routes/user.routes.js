import express from "express";
import { validateUser } from "../middlewares/userValidation.js";
import userController from "../controllers/user.controller.js";


const userRouter = express.Router();
userRouter.post("/", validateUser, userController.createUser);
userRouter.post("/login", userController.loginUser);
export default userRouter;
