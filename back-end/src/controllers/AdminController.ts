import bodyParser from "body-parser";
import express from "express";

import { Task } from "../models/TaskSchema";
import { Settings } from "../models/SettingsSchema";
import { isAuthMiddleware, DecodedUserTokenType } from "../services/AuthService";
import { UserRole, User } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";
import { logger } from "../services/LoggerService";

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

router.get("/settings", async (req, res) => {
  try {
    const data = await Settings.findOne();
    res.send(data);
  } catch (error) {
    logger.error(error);
  }
});

// Update platform settings
router.post(
  "/settings",
  isAuthMiddleware(UserRole.admin),
  async (req, res) => {
    try {
      const { data } = req.body;
      await (await Settings.findOne()).updateOne(data);
      res.send({success: 1});
    } catch (error) {
      logger.error(error)
      throw new HttpException(400, 'Settings data incorrect')
    }
  }
);

export default router;
