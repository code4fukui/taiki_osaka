import { downloadTaikiOsaka } from "./downloadTaikiOsaka.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

/*
let d = new Day(2021, 9, 17);
for (let j = 0; j < 17; j++) {
  console.log(d);
  for (let i = 1; i <= 24; i++) {
    await downloadTaikiOsaka(d, i);
    //console.log(startDate);
    await sleep(100);
  }
  d = d.dayBefore(1);
}
*/
let d = new Day(2021, 8, 1);
for (let j = 0; j < 31; j++) {
  console.log(d);
  for (let i = 1; i <= 24; i++) {
    await downloadTaikiOsaka(d, i);
    //console.log(startDate);
    await sleep(100);
  }
  d = d.dayAfter(1);
}
