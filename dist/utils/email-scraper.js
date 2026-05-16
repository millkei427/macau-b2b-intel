/**
 * Scrape a website for visible email addresses.
 * Tries homepage + common contact paths.
 */
export async function scrapeEmails(website, opts = {}) {
    if (!website)
        return [];
    const paths = ["", "/contact", "/contact-us", "/聯絡我們", "/about", "/about-us"];
    const found = new Set();
    for (const p of paths) {
        try {
            const url = website.replace(/\/$/, "") + p;
            const res = await fetch(url, {
                headers: { "User-Agent": "Mozilla/5.0 MacauB2BIntel/0.1" },
                signal: AbortSignal.timeout(opts.timeoutMs ?? 8000),
            });
            if (!res.ok)
                continue;
            const text = await res.text();
            const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu\.mo|gov\.mo|com|net|mo|org)/g);
            matches?.forEach((m) => found.add(m.toLowerCase()));
            if (found.size > 0)
                break;
        }
        catch {
            // ignore individual path failures
        }
    }
    return [...found];
}
