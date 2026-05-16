import * as cheerio from "cheerio";

export interface MacauSchool {
  name: string;
  address: string;
  phone: string;
  fax: string;
  website: string;
  category: "k12" | "higher-ed";
  emails?: string[];
}

const DSEDJ_LIST_URL =
  "https://appl.dsedj.gov.mo/eduenquiry/edu/eduweb/schinf/schooladdrlist.jsp?lang=c";

// Macau higher-education institutions (stable list, hardcoded).
// DSEDJ portal/webdsejspace 高等院校連結 is JS-rendered, can't scrape.
const HIGHER_ED: MacauSchool[] = [
  { name: "澳門大學 UM", website: "https://www.um.edu.mo", address: "氹仔大學大馬路", phone: "88228888", fax: "", category: "higher-ed" },
  { name: "澳門理工大學 MPU", website: "https://www.mpu.edu.mo", address: "高美士街", phone: "85996111", fax: "", category: "higher-ed" },
  { name: "澳門旅遊大學 UTM", website: "https://www.utm.edu.mo", address: "望廈山", phone: "85061818", fax: "", category: "higher-ed" },
  { name: "澳門保安部隊高等學校 ESFSM", website: "https://www.essm.gov.mo", address: "馬交石炮台馬路", phone: "28571111", fax: "", category: "higher-ed" },
  { name: "澳門城市大學 CityU", website: "https://www.cityu.edu.mo", address: "氹仔徐日昇寅公馬路", phone: "85902538", fax: "", category: "higher-ed" },
  { name: "聖若瑟大學 USJ", website: "https://www.usj.edu.mo", address: "青洲河邊馬路", phone: "88964400", fax: "", category: "higher-ed" },
  { name: "澳門鏡湖護理學院 KWNC", website: "https://www.kwnc.edu.mo", address: "得勝馬路", phone: "28855023", fax: "", category: "higher-ed" },
  { name: "澳門科技大學 MUST", website: "https://www.must.edu.mo", address: "氹仔偉龍馬路", phone: "88972000", fax: "", category: "higher-ed" },
  { name: "澳門管理學院 IGM", website: "https://www.mim.edu.mo", address: "新口岸宋玉生廣場", phone: "28781727", fax: "", category: "higher-ed" },
  { name: "中西創新學院 ISCI", website: "https://www.isci.edu.mo", address: "宋玉生廣場", phone: "28786927", fax: "", category: "higher-ed" },
];

/**
 * Fetch all Macau schools — K-12 scraped from DSEDJ + higher-ed hardcoded.
 * Returns ~77 entries. Email NOT included by DSEDJ; use scrapeEmails() if needed.
 */
export async function fetchAllMacauSchools(): Promise<MacauSchool[]> {
  const k12 = await fetchK12Schools();
  return [...k12, ...HIGHER_ED];
}

export async function fetchK12Schools(): Promise<MacauSchool[]> {
  const res = await fetch(DSEDJ_LIST_URL, {
    headers: { "User-Agent": "Mozilla/5.0 MacauB2BIntel/0.1" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`DSEDJ HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const schools: MacauSchool[] = [];

  const HEADER_WORDS = ["名稱", "地址", "電話", "傳真", "網址"];
  $("table tr").each((_, tr) => {
    const tds = $(tr).find("td");
    if (tds.length < 5) return;
    const name = $(tds[0]).text().trim();
    if (!name || name.length < 2) return;
    if (HEADER_WORDS.includes(name)) return; // skip header row
    const address = $(tds[1]).text().trim();
    const phone = $(tds[2]).text().replace(/\s|&nbsp;/g, "").trim();
    const fax = $(tds[3]).text().replace(/\s|&nbsp;/g, "").trim();
    const website = $(tds[4]).find("a").attr("href")?.trim() || "";
    schools.push({ name, address, phone, fax, website, category: "k12" });
  });

  return schools;
}

export function fetchHigherEdSchools(): MacauSchool[] {
  return [...HIGHER_ED];
}
