import bodyParser from "body-parser";
import express from "express";

import { isAuthMiddleware, DecodedTokenType } from "../services/Auth";
import { Task } from "../models/TaskSchema";
import { UserRole } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";
import { Flag } from "../models/FlagSchema";

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "30kb",
  }),
  bodyParser.json({
    limit: "10kb",
  })
);

// Get all visible tasks
router.get("/", async (req, res) => {
  try {
    let tasks = await Task.find(
      { visible: true },
      { _id: 1, title: 1, content: 1 }
    );
    res.send(tasks);
  } catch (error) {
    throw error;
  }
});

router.get(
  "/all",
  (req, res, next) => isAuthMiddleware(req, res, next, UserRole.admin),
  async (req, res) => {
    try {
      let tasks = await Task.find({}, { _id: 1, title: 1, content: 1 });
      res.send(tasks);
    } catch (error) {
      throw error;
    }
  }
);

// Get task by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) new HttpException(404, "Task not found");
    if (task.visible) {
      res.send(task);
    } else {
      new HttpException(401, "Task hidden");
    }
  } catch (error) {
    throw error;
  }
});

// Get user flags for task by task id
router.get(
  "/:id/flags",
  (req, res, next) => isAuthMiddleware(req, res, next, UserRole.admin),
  async (req, res) => {
    try {
      const user: DecodedTokenType = res.locals.user;
      let flags = await Flag.find({task: req.params.id, user: user._id});
      res.send(flags)
    } catch (error) {
      throw error;
    }
  }
);

// Add new task
router.post(
  "/",
  (req, res, next) => isAuthMiddleware(req, res, next, UserRole.admin),
  async (req, res) => {
    const {
      title,
      content,
      visible,
      images,
      categories,
      files,
      flag,
      score
    } = req.body;
    try {
      const task = new Task({
        title,
        content,
        visible,
        images,
        categories,
        files,
        flag,
        score
      });
      await task.save();
      res.send(task);
    } catch (error) {
      throw error;
    }
  }
);

export default router;
