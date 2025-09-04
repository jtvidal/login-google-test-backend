import express from "express";
import userRouter from "./user.routes.js";

function routerApi(app) {
  const router = express.Router();
  router.use("/users", userRouter);
  app.use("/api/v1", router);
}

export default routerApi;
