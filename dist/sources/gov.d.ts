export interface MacauGovEntity {
    name: string;
    abbreviation?: string;
    website: string;
    govPageUrl?: string;
}
/**
 * Fetch the full Macau government department directory from gov.mo APM entity index.
 * Returns ~99 government bodies (DSEDT, DSF, DSAL, customs, courts, etc.) with website.
 * Each <li> has: <a>Name <span>(ABBR)</span></a> <a alt="網站" href="..."> ... </a>
 */
export declare function fetchAllMacauGovEntities(): Promise<MacauGovEntity[]>;
/**
 * Filter gov entities most likely to publish IT / hardware / software tenders.
 * Heuristic: ministries handling infrastructure, education, public services, IT.
 */
export declare function filterTenderLikely(entities: MacauGovEntity[]): MacauGovEntity[];
