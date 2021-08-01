import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.js";
import authValidate from "../validations/auth.js";

const { login, signUp, getAccount } = AuthController;
const { auth, checkUsernameTaken, checkEmailTaken, checkLogin } =
  authMiddleware;
const { validateSignUp, validateLogin } = authValidate;

const authRoute = express.Router();

authRoute.post(
  "/signup",
  validateSignUp,
  checkUsernameTaken,
  checkEmailTaken,
  signUp
);
authRoute.post("/login", validateLogin, checkLogin, login);
authRoute.get("/user", auth, getAccount);

export default authRoute;
