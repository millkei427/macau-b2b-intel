const BASE = "https://www.macaotourism.gov.mo";
const HEADERS = { "User-Agent": "Mozilla/5.0 MacauB2BIntel/0.1" };
function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
async function fetchWithRetry(url, attempts = 3, timeoutMs = 30000) {
    for (let i = 0; i < attempts; i++) {
        try {
            const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(timeoutMs) });
            if (res.ok)
                return res;
            if (res.status >= 500 && i < attempts - 1) {
                await delay(1000 * (i + 1));
                continue;
            }
            return res;
        }
        catch {
            if (i < attempts - 1)
                await delay(1000 * (i + 1));
        }
    }
    return null;
}
/**
 * Fetch all Macau licensed restaurants from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/dining/restaurant
 * Returns ~600+ restaurants. Email present for ~30-50% (rest left undefined).
 */
export async function fetchAllMacauRestaurants() {
    const list = await fetchRestaurantList();
    const all = [];
    const BATCH = 6;
    for (let i = 0; i < list.length; i += BATCH) {
        const slice = list.slice(i, i + BATCH);
        const results = await Promise.all(slice.map((r) => fetchRestaurantDetail(r.id)));
        for (const r of results)
            if (r)
                all.push(r);
        if (i % 60 === 0)
            await delay(200);
    }
    return all;
}
async function fetchRestaurantList() {
    const res = await fetchWithRetry(`${BASE}/api/dining/restaurant?lang=zh-hant`);
    if (!res || !res.ok)
        return [];
    try {
        const data = (await res.json());
        return data.results || [];
    }
    catch {
        return [];
    }
}
export async function fetchRestaurantDetail(id) {
    const res = await fetchWithRetry(`${BASE}/api/dining/restaurant/${id}?lang=zh-hant`);
    if (!res || !res.ok)
        return null;
    try {
        const d = (await res.json());
        return {
            id: d.id,
            name: d.name,
            nameEN: d.nameEN,
            cuisine: d.cuisine?.name,
            address: d.infos?.address,
            phone: d.infos?.tel,
            fax: d.infos?.fax,
            email: d.infos?.email,
            website: d.infos?.website,
            openingHour: d.infos?.openingHour,
        };
    }
    catch {
        return null;
    }
}
