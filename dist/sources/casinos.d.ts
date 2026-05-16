export interface MacauCasino {
    id: string;
    name: string;
    nameEN: string;
    group: "sands" | "galaxy" | "mgm" | "wynn" | "melco" | "sjm";
    publicEmail?: string;
    vendorPortalUrl?: string;
    website: string;
    note: string;
}
/**
 * Macau's six gaming concessionaires.
 *
 * IMPORTANT: Real casino procurement happens through vendor portals (NDA + supplier
 * registration). Cold email to general inquiry addresses has LOW ROI but is included
 * for completeness. Best outreach strategy: use vendor portal links to formally apply.
 */
export declare const MACAU_CASINOS: MacauCasino[];
export declare function fetchAllMacauCasinos(): MacauCasino[];
