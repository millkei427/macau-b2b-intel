# @millkei/macau-b2b-intel

Reusable TypeScript library for fetching authoritative **Macau B2B directories**:

- **77 schools** (67 K-12 from DSEDJ + 10 universities)
- **~100 hotels** with email, website, phone, room count (Macao Tourism Office API)
- **~99 government departments** (gov.mo APM entity index)

Total: **~280 entities** across the Macau B2B universe.

## Install (local link, until published)

```powershell
cd "D:\Claude Code\macau-b2b-intel"
npm install
npm run build
npm link

# In your consumer project:
cd "D:\Claude Code\pcshop-growth-engine"
npm link @millkei/macau-b2b-intel
```

## Usage

```ts
import {
  fetchAllMacauSchools,
  fetchAllMacauHotels,
  fetchAllMacauGovEntities,
  filterTenderLikely,
  scrapeEmails,
} from "@millkei/macau-b2b-intel";

const hotels = await fetchAllMacauHotels();
// [{ name: "YOHO金銀島酒店", email: "info@...", website: "http://...", star: "五星級酒店", roomCount: "804", ... }, ...]

const schools = await fetchAllMacauSchools();
// 67 K-12 + 10 higher-ed

const gov = await fetchAllMacauGovEntities();
const itLikely = filterTenderLikely(gov);
// ~30 ministries that typically publish IT tenders
```

## Why this exists

Macau B2B prospecting is broken because:
1. There's no single CRM / directory product covering local SMEs
2. Each gov source has different format (HTML / JSON / JS-rendered SPA)
3. Email fields are sometimes scraped, sometimes API-provided

This package abstracts that mess. **Layer 1** in this stack:

```
Layer 1 (this package)  → reusable data fetchers, no business logic
Layer 2 (LLM processing) → app-specific scoring / dedup / outreach prompts
Layer 3 (applications)   → PC Shop growth engine, macaujobfinder, etc.
```

## Source reliability

| Source | Update frequency | Failure mode |
|---|---|---|
| Tourism hotel API | API stable, schema unchanged for 2+ yrs | Returns empty array if star value wrong |
| DSEDJ school HTML | Same table layout 5+ yrs | Throws on HTTP 5xx |
| gov.mo APM | Annual structure tweak | Throws on HTTP 5xx; filter heuristic may need update |

## License

UNLICENSED — private, internal use only.
