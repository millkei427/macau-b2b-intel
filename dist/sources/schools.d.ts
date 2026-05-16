export interface MacauSchool {
    name: string;
    address: string;
    phone: string;
    fax: string;
    website: string;
    category: "k12" | "higher-ed";
    emails?: string[];
}
/**
 * Fetch all Macau schools — K-12 scraped from DSEDJ + higher-ed hardcoded.
 * Returns ~77 entries. Email NOT included by DSEDJ; use scrapeEmails() if needed.
 */
export declare function fetchAllMacauSchools(): Promise<MacauSchool[]>;
export declare function fetchK12Schools(): Promise<MacauSchool[]>;
export declare function fetchHigherEdSchools(): MacauSchool[];
