import { downloadTaikiOsaka } from "./downloadTaikiOsaka.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

let d = new Day();
for (let i = 1; i <= 24; i++) {
  await downloadTaikiOsaka(d, i);
  await sleep(100);
}
