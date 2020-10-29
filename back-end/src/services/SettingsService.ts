import { Settings } from '../models/SettingsSchema'
import { logger } from './LoggerService';

export const startupCheckSettings = async () => {
  let s = await Settings.findOne();
  if (!s) {
    logger.warn("Initial settings not found");
    const newSettings = new Settings();
    await newSettings.save();
    logger.warn("Initial settings created succesfully");
    return
  }
  logger.warn("Initial settings check: OK");
}