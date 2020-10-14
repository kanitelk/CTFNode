import bodyParser from "body-parser";
import express from "express";
import { User, UserRole } from "../models/UserSchema";
import UserService from "../services/User";
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
    res.send(await UserService.createUser(login, password, email));
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login and get Auth token
router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    res.send(await UserService.loginUser(login, password));
  } catch (error) {
    res.status(400).send(error);
  }
});

// Edit user
router.post(
  "/edit",
  isAuthMiddleware(UserRole.user),
  async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const data = decodeToken(getToken(req));
      res.send(
        await UserService.editUser(
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
  isAuthMiddleware(UserRole.user),
  async (req, res) => {
    try {
      // @ts-ignore
      let user = await User.findById(req.user._id);
      user.password = null;
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
