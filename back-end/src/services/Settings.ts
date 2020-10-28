import { Settings } from '../models/SettingsSchema'

export const startupCheckSettings = async () => {
  let s = await Settings.findOne();
  if (!s) {
    console.log('Initial settings not found');
    const newSettings = new Settings();
    await newSettings.save();
    console.log("Initial settings created succesfully");
    return
  }
  console.log("Initial settings check: OK");
}