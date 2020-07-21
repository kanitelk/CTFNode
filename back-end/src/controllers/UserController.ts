import bodyParser from "body-parser";
import express from "express";
import { User, UserRole } from "../models/UserSchema";
import { createUser, loginUser, editUser } from "../services/User";
import { isAuthMiddleware, getToken, decodeToken } from "../services/Auth";

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "30kb"
  }),
  bodyParser.json({
    limit: "10kb"
  })
);

// Create new user
router.post("/", async (req, res) => {
  const { login, password, email } = req.body;
  try {
    res.send(await createUser(login, password, email));
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login and get Auth token
router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    res.send(await loginUser(login, password));
  } catch (error) {
    res.status(400).send(error);
  }
});

// Edit user
router.post(
  "/edit",
  (req, res, next) => isAuthMiddleware(req, res, next, UserRole.user),
  async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const data = decodeToken(getToken(req));
      res.send(
        await editUser(
          data._id,
          email,
          password,
          role,
          data.role === UserRole.admin
        )
      );
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Get user profile
router.get(
  "/profile",
  (req, res, next) => isAuthMiddleware(req, res, next, UserRole.user),
  async (req, res) => {
    try {
      res.send(getToken(req));
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
