import * as cheerio from "cheerio";

export interface MacauGovEntity {
  name: string;
  abbreviation?: string;
  website: string;
  govPageUrl?: string;
}

const APM_INDEX_URL =
  "https://www.gov.mo/zh-hant/about-government/apm/apm-entity-index/";

const HEADERS = { "User-Agent": "Mozilla/5.0 MacauB2BIntel/0.1" };

async function fetchWithRetry(url: string, attempts = 3, timeoutMs = 45000): Promise<string | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(timeoutMs) });
      if (res.ok) return await res.text();
      if (res.status >= 500 && i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
        continue;
      }
      return null;
    } catch {
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  return null;
}

/**
 * Fetch the full Macau government department directory from gov.mo APM entity index.
 * Returns ~99 government bodies (DSEDT, DSF, DSAL, customs, courts, etc.) with website.
 * Each <li> has: <a>Name <span>(ABBR)</span></a> <a alt="網站" href="..."> ... </a>
 */
export async function fetchAllMacauGovEntities(): Promise<MacauGovEntity[]> {
  const html = await fetchWithRetry(APM_INDEX_URL);
  if (!html) throw new Error("gov.mo APM fetch failed after retries");
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const entities: MacauGovEntity[] = [];

  // Each gov entity is a <li> containing exactly 2 <a>: name link + website link (alt="網站")
  $('a[alt="網站"]').each((_, webA) => {
    const $webA = $(webA);
    let website = ($webA.attr("href") || "").trim();
    if (!website || !/\.gov\.mo/i.test(website)) return;
    website = website.replace(/^http:\/\//, "https://").replace(/\s+$/, "");
    if (seen.has(website)) return;

    // The name link is the previous <a> sibling in the same <li>
    const $nameA = $webA.prevAll("a").first();
    if (!$nameA.length) return;
    const rawText = $nameA.text().trim().replace(/\s+/g, " ");
    if (!rawText) return;

    // "勞工事務局 （DSAL）" → name="勞工事務局" abbr="DSAL"
    const m = rawText.match(/^(.+?)\s*[（(]\s*([A-Z0-9-]+)\s*[）)]\s*$/);
    const name = m ? m[1].trim() : rawText;
    const abbreviation = m ? m[2].trim() : undefined;
    const govPageUrl = $nameA.attr("href");

    seen.add(website);
    entities.push({ name, abbreviation, website, govPageUrl });
  });

  return entities;
}

/**
 * Filter gov entities most likely to publish IT / hardware / software tenders.
 * Heuristic: ministries handling infrastructure, education, public services, IT.
 */
export function filterTenderLikely(entities: MacauGovEntity[]): MacauGovEntity[] {
  const LIKELY = /(教育|衛生|文化|社會|勞工|經濟|科技|財政|博彩|旅遊|交通|建設|房屋|海關|警務|司法|統計|資訊|體育|環境|市政|地圖|郵電|電信)/;
  return entities.filter((e) => LIKELY.test(e.name));
}
