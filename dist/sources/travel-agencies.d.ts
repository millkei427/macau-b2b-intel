export interface MacauTravelAgency {
    id: string;
    name: string;
    nameEN?: string;
    address?: string;
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
    visa144?: boolean;
}
/**
 * Fetch all Macau licensed travel agencies from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/travelagency
 * Returns ~200 agencies with email/website/phone.
 */
export declare function fetchAllMacauTravelAgencies(): Promise<MacauTravelAgency[]>;
export declare function fetchAgencyDetail(id: string): Promise<MacauTravelAgency | null>;
