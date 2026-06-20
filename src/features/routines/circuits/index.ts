import { returnToCalm } from "./returnToCalm";
import { startTask } from "./startTask";
import { transition } from "./transition";
import { ocdLoop } from "./ocdLoop";
import { shoppingList } from "./daily/shoppingList";
import { tidyFiveObjects } from "./daily/tidyFiveObjects";
import { drinkWater } from "./daily/drinkWater";
import { replyMessage } from "./daily/replyMessage";
import { groceryRun } from "./daily/groceryRun";
import { laundryStart } from "./daily/laundryStart";
import { hyperfocusExit } from "./tnd/hyperfocusExit";
import { anxietyGrounding } from "./tnd/anxietyGrounding";
import { ruminationExit } from "./tnd/ruminationExit";
import { mentalClear } from "./tnd/mentalClear";
import { openMail } from "./daily/openMail";
import { simpleMeal } from "./daily/simpleMeal";
import { cleanRoom } from "./daily/cleanRoom";
import { hangLaundry } from "./daily/hangLaundry";
import { shower } from "./daily/shower";
import { adminSmall } from "./daily/adminSmall";
import { deepClean } from "./daily/deepClean";
import { hardTransition } from "./tnd/hardTransition";
import { motivationBoost } from "./tnd/motivationBoost";
import { energyReset } from "./tnd/energyReset";
import { emotionalFirstAid } from "./tnd/emotionalFirstAid";
import { muscleRelease } from "./tnd/muscleRelease";
import { redMarker } from "./tnd/redMarker";
import { objectObservation } from "./tnd/objectObservation";
import { coldObject } from "./tnd/coldObject";
import { coldWater } from "./tnd/coldWater";
import { delayChecking } from "./tnd/delayChecking";
import { tolerateUncertainty } from "./tnd/tolerateUncertainty";
import { thanksBrain } from "./tnd/thanksBrain";
import { urgeWave } from "./tnd/urgeWave";
import { stopRumination } from "./tnd/stopRumination";

export const circuits = [
  returnToCalm,
  startTask,
  transition,
  ocdLoop,
  shoppingList,
tidyFiveObjects,
openMail,
simpleMeal,
drinkWater,
replyMessage,
  groceryRun,
  laundryStart,
  hyperfocusExit,
anxietyGrounding,
ruminationExit,
mentalClear,
cleanRoom,
hangLaundry,
shower,
adminSmall,
deepClean,
hardTransition,
motivationBoost,
energyReset,
emotionalFirstAid,

muscleRelease,
  redMarker,
  objectObservation,
  coldObject,
  coldWater,

  delayChecking,
  tolerateUncertainty,
  thanksBrain,
  urgeWave,

  stopRumination,
];