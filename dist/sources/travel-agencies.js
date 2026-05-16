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
 * Fetch all Macau licensed travel agencies from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/travelagency
 * Returns ~200 agencies with email/website/phone.
 */
export async function fetchAllMacauTravelAgencies() {
    const list = await fetchAgencyList();
    const all = [];
    const BATCH = 6;
    for (let i = 0; i < list.length; i += BATCH) {
        const slice = list.slice(i, i + BATCH);
        const results = await Promise.all(slice.map((a) => fetchAgencyDetail(a.id)));
        for (const r of results)
            if (r)
                all.push(r);
    }
    return all;
}
async function fetchAgencyList() {
    const res = await fetchWithRetry(`${BASE}/api/travelagency?lang=zh-hant`);
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
export async function fetchAgencyDetail(id) {
    const res = await fetchWithRetry(`${BASE}/api/travelagency/${id}?lang=zh-hant`);
    if (!res || !res.ok)
        return null;
    try {
        const d = (await res.json());
        return {
            id: d.id,
            name: d.name,
            nameEN: d.nameEN,
            visa144: d.visa144,
            address: d.infos?.address,
            phone: d.infos?.tel,
            fax: d.infos?.fax,
            email: d.infos?.email,
            website: d.infos?.website,
        };
    }
    catch {
        return null;
    }
}
