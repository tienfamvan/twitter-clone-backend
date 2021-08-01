import express from "express";
import authRoute from "./auth.route.js";

const routes = express.Router();

routes.use("/auth", authRoute);

export default routes;
