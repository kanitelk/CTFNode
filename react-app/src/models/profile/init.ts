import { loadProfileFx, profile$, ProfileGate } from "./index";

profile$.on(loadProfileFx.doneData, (_, data) => data).reset(ProfileGate.close);
