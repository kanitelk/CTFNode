import bodyParser from "body-parser";
import express from "express";

import { Task } from "../models/TaskSchema";
import { isAuthMiddleware, DecodedUserTokenType } from "../services/Auth";
import { UserRole, User } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";
import { Flag } from "../models/FlagSchema";
import { logger } from "../services/Logger";

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

// Send flag as answer for task
router.post(
  "/send",
  isAuthMiddleware(UserRole.user),
  async (req, res) => {
    try {
      const { flag, taskId } = req.body;
      const user: DecodedUserTokenType = res.locals.user;

      let task = await Task.findOne({ _id: taskId });
      if (!task) throw new HttpException(400, "Task not found");

      let similarFlag = await Flag.findOne({task: taskId, user: user._id, isRight: true});
      if (similarFlag) {
        res
          .status(401)
          .send({ error: "You have already answered correctly`" });
        // throw new HttpException(400, `You have already answered correctly`);
      }

      let correct = false;

      let f = new Flag({
        task: task._id,
        user: user._id,
        value: flag,
      });

      if (task.flag === flag) {
        await User.findOneAndUpdate(
          { _id: user._id },
          { $inc: { score: task.score } }
        );
        correct = true;
      }

      f.isRight = correct;
      await f.save();

      res.send({correct, score: correct ? task.score : 0});
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
);

export default router;
