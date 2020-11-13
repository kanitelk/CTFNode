import bodyParser from "body-parser";
import express from "express";

import {
  isAuthMiddleware,
  DecodedUserTokenType,
} from "../services/AuthService";
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
      { _id: 1, title: 1, content: 1, score: 1 }
    );
    res.send(tasks);
  } catch (error) {
    throw error;
  }
});

router.get("/all", isAuthMiddleware(UserRole.admin), async (req, res) => {
  try {
    let tasks = await Task.find(
      {},
      { _id: 1, title: 1, content: 1, visible: 1, score: 1 }
    );
    res.send(tasks);
  } catch (error) {
    throw error;
  }
});

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
router.get("/:id/flags", isAuthMiddleware(UserRole.user), async (req, res) => {
  try {
    const user: DecodedUserTokenType = res.locals.user;
    let flags = await Flag.find({ task: req.params.id, user: user._id });
    res.send(flags);
  } catch (error) {
    throw error;
  }
});

// Get solves from all users for this task
router.get("/:id/solves", async (req, res) => {
  try {
    const { id } = req.params;
    let solves = await Flag.find(
      { task: id, isRight: true },
      { _id: 1, user: 1, createdAt: 1 }
    ).populate("user", ["login", "score"]);
    res.send(solves);
  } catch (error) {
    console.log(error);
  }
});

// Add new task
router.post("/", isAuthMiddleware(UserRole.admin), async (req, res) => {
  const {
    data
  } = req.body;

  try {
    const task = new Task(data);
    await task.save();
    res.send(task);
  } catch (error) {
    throw error;
  }
});

// Edit task by ID
router.put("/:id", isAuthMiddleware(UserRole.admin), async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const task = Task.findById(id);
    if (!task) new HttpException(404, "Task not found");
    await Task.updateOne({ _id: id }, data);
    res.send(await Task.findById(id));
  } catch (error) {
    throw new HttpException(404, error);
  }
});

router.delete("/:id", isAuthMiddleware(UserRole.admin), async (req, res) => {
  try {
    let user: DecodedUserTokenType = res.locals.user;

    if (user.role !== UserRole.admin) {
      throw new HttpException(401, "Not authorized for this action");
    }
    // Delete user from admin
    await Task.deleteOne({ _id: req.params.id });
    res.send({ success: 1 });
    return;
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
