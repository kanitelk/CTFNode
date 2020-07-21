import bodyParser from "body-parser";
import express from "express";

import { isAuthMiddleware } from "../services/Auth";
import { Task } from "../models/TaskSchema";
import { UserRole } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";

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
      let tasks = await Task.find();
      res.send(
        tasks.map(
          ({ _id, title, content, images, categories, files, answer }) => ({
            _id,
            title,
            content,
            images,
            categories,
            files,
            answer,
          })
        )
      );
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
      answer,
    } = req.body;
    try {
      const task = new Task({
        title,
        content,
        visible,
        images,
        categories,
        files,
        answer,
      });
      await task.save();
      res.send(task);
    } catch (error) {
      throw error;
    }
  }
);

export default router;
