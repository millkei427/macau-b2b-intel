export interface MacauHotel {
  id: string;
  name: string;
  nameEN?: string;
  star: string;
  starValue: string;
  district?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  roomCount?: string;
}

const BASE = "https://www.macaotourism.gov.mo";

const STAR_VALUES = [
  "5-star-deluxe-hotel",
  "5-star-hotel",
  "4-star-hotel",
  "4-star-apartment-hotel",
  "3-star-hotel",
  "3-star-apartment-hotel",
  "2-star-hotel",
  "low-cost-accommodation",
];

const HEADERS = { "User-Agent": "Mozilla/5.0 MacauB2BIntel/0.1" };

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url: string, attempts = 3, timeoutMs = 30000): Promise<Response | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: HEADERS,
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (res.ok) return res;
      if (res.status >= 500 && i < attempts - 1) {
        await delay(1000 * (i + 1));
        continue;
      }
      return res;
    } catch (e) {
      if (i < attempts - 1) {
        await delay(1000 * (i + 1));
        continue;
      }
      console.error(`fetch ${url} failed:`, (e as Error).message);
      return null;
    }
  }
  return null;
}

/**
 * Fetch the full Macau hotel directory from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/accommodation public JSON endpoints.
 * Returns ~100+ hotels with email + website + phone + address + roomCount.
 */
export async function fetchAllMacauHotels(): Promise<MacauHotel[]> {
  const all: MacauHotel[] = [];
  // Star lists sequentially (8 calls) to avoid rate limit
  for (const star of STAR_VALUES) {
    const listed = await fetchHotelList(star);
    // Detail fetches in small parallel batches (each star has 5-30 hotels)
    const BATCH = 4;
    for (let i = 0; i < listed.length; i += BATCH) {
      const slice = listed.slice(i, i + BATCH);
      const results = await Promise.all(slice.map((h) => fetchHotelDetail(h.id)));
      for (const r of results) if (r) all.push(r);
    }
    await delay(300); // gentle gap between star categories
  }
  return all;
}

export async function fetchHotelsByStar(starValue: string): Promise<MacauHotel[]> {
  const listed = await fetchHotelList(starValue);
  const out: MacauHotel[] = [];
  for (const h of listed) {
    const d = await fetchHotelDetail(h.id);
    if (d) out.push(d);
  }
  return out;
}

async function fetchHotelList(starValue: string): Promise<Array<{ id: string; name: string }>> {
  const url = `${BASE}/api/accommodation?lang=zh-hant&star=${starValue}`;
  const res = await fetchWithRetry(url);
  if (!res || !res.ok) return [];
  try {
    const data = (await res.json()) as { results?: Array<{ id: string; name: string }> };
    return data.results || [];
  } catch {
    return [];
  }
}

export async function fetchHotelDetail(slug: string): Promise<MacauHotel | null> {
  const url = `${BASE}/api/accommodation/${slug}?lang=zh-hant`;
  const res = await fetchWithRetry(url);
  if (!res || !res.ok) return null;
  try {
    const d = (await res.json()) as {
      id: string;
      name: string;
      nameEN?: string;
      star?: { name?: string; value?: string };
      district?: { name?: string };
      infos?: {
        address?: string;
        tel?: string;
        fax?: string;
        email?: string;
        website?: string;
        roomCount?: string;
      };
    };
    return {
      id: d.id,
      name: d.name,
      nameEN: d.nameEN,
      star: d.star?.name || "",
      starValue: d.star?.value || "",
      district: d.district?.name,
      address: d.infos?.address,
      phone: d.infos?.tel,
      fax: d.infos?.fax,
      email: d.infos?.email,
      website: d.infos?.website,
      roomCount: d.infos?.roomCount,
    };
  } catch {
    return null;
  }
}
