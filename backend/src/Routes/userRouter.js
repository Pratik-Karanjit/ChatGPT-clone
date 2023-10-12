import { Router } from "express";
import { createUser, loginUser, readAllUser, verifyEmail } from "../controller/userController.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";

let userRouter = Router();

//localhost:8000/users/verify-email

userRouter.route("/").post(createUser).get(readAllUser);

userRouter.route("/verify-email").post(isAuthenticatedForEmail,verifyEmail);

userRouter.route("/login").post(loginUser);


export default userRouter;
