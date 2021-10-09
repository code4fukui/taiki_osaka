import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime, Day, Time } from "https://js.sabae.cc/DateTime.js";


const stationInfo = [
  ["0104","0107","0109","0112","0115","0116","0117","0118","0120","0121","0122","0123","0124","0125","0127","0129","0130","0131","0133","0202","0203","0205","0206","0207","0208","0209","0210","0211","0212","0213","0215","0252","0301","0302","0304","0305","0307","0309","0311","0312","0313","0405","0602","0651","0652","0701","0703","0705","0801","0802","0851","0901","0902","0903","2102","2103","2202","2301","2302"],
  ["西部コミュニティセンター","国設大阪","茨木市役所","高石中学校","池田市立南畑会館","大東市役所","府立修徳学院","貝塚市消防署","島本町役場","富田林市役所","南海団地","泉南市役所","緑ケ丘小学校","三日市公民館","藤井寺市役所","岸和田中央公園","佐野中学校","泉大津市役所","豊能町役場","此花区役所","平尾小学校","野中小学校","桃谷中学校","大宮中学校","聖賢小学校","清江小学校","摂陽中学校","今宮中学校","九条南小学校","茨田北小学校","南港中央公園","出来島小学校","少林寺","浜寺","三宝","若松台","石津","登美丘","深井","美原","金岡南","高石消防署高師浜出張所","豊中市千成","豊中市千里","豊中市役所","吹田市垂水","吹田市北消防署","吹田市高野台","東大阪市西保健センター","東大阪市六万寺","東大阪市環境衛生検査センター","楠葉","枚方市役所","王仁公園","高槻北","庄所","八尾市保健所","成田","寝屋川市役所"]
];

const getStationID = (name) => {
  return stationInfo[0][stationInfo[1].indexOf(name)];
};

export const makeData = async () => {

  const type = "OX";

  const data = await dir2array("data/" + type);
  //console.log(data);

  const parseDT = (dt) => {
    const y = parseInt(dt.substring(0, 4));
    const m = parseInt(dt.substring(4, 6));
    const d = parseInt(dt.substring(6, 8));
    const h = parseInt(dt.substring(8, 10));
    return new DateTime(new Day(y, m, d), new Time(h, 0));
  };

  const res = [];
  for (const fn of data) {
    if (!fn.endsWith(".csv")) {
      continue;
    }
    const dt = fn.match(/-(\d+)/)[1];
    const dt2 = parseDT(dt);
    const d = CSV.toJSON(await CSV.fetch("data/" + type + "/" + fn));
    const dd = { dt: dt2.toString() };
    for (const k of d) {
      const name = k.局名;
      dd[name] = k.ppb;
    }
    res.push(dd);
  }
  //console.log(res);
  res.sort((a, b) => a.dt.localeCompare(b.dt));
  /*
  const list = [];
  for (const name in res) {
    const id = getStationID(name);
    console.log(name, id);
    const data = res[name].sort((a, b) => a.dt.localeCompare(b.dt));
    console.log(data);
    
    break;
  }
  */
  await Deno.mkdir("data2/" + type, { recursive: true });
  await Deno.writeTextFile("data2/" + type + ".csv", CSV.stringify(res));
};

await makeData();