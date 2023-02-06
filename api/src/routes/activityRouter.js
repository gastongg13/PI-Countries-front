const { Router } = require("express");
const {
  createActivityHandler,
  getActivityHandler,
  deleteActivityHandler,
} = require("../handlers/activityHandler");
const activityRouter = Router();

activityRouter.post("/", createActivityHandler);
activityRouter.get("/", getActivityHandler);
activityRouter.delete("/:id", deleteActivityHandler);

module.exports = activityRouter;
