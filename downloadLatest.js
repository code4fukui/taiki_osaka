import { downloadTaikiOsaka } from "./downloadTaikiOsaka.js";
import { Day, Time } from "https://js.sabae.cc/DateTime.js";

// this hour // 毎時15分ごろには揃う
let d = new Day();
const t = new Time();
const data = await downloadTaikiOsaka(d, t.hour);
console.log(data);

//await Deno.writeTextFile("data/OX");
