/**
 * Scrape a website for visible email addresses.
 * Tries homepage + common contact paths.
 */
export declare function scrapeEmails(website: string, opts?: {
    timeoutMs?: number;
}): Promise<string[]>;
