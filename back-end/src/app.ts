import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import UserController from "./controllers/UserController";
import TaskController from "./controllers/TaskController";
import FlagController from "./controllers/FlagController";
import AdminController from "./controllers/AdminController";
import { errorMiddleware } from "./utils/errorHandler";
import tasks from './tasks'
import { startupCheckSettings } from "./services/Settings";

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(errorMiddleware)

app.use("/api/users", UserController);
app.use("/api/tasks", TaskController);
app.use("/api/flags", FlagController);
app.use("/api/admin", AdminController);

tasks();

export default app;
