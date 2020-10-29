import mongoose from 'mongoose';
import config from './config';
import { logger } from './services/LoggerService';
import { startupCheckSettings } from './services/SettingsService';

mongoose.set("useCreateIndex", true);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function() {
  logger.info("MongoDB connected!")
});

db.once("open", startupCheckSettings);

export default mongoose.connection;
