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
/**
 * Fetch the full Macau hotel directory from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/accommodation public JSON endpoints.
 * Returns ~100+ hotels with email + website + phone + address + roomCount.
 */
export declare function fetchAllMacauHotels(): Promise<MacauHotel[]>;
export declare function fetchHotelsByStar(starValue: string): Promise<MacauHotel[]>;
export declare function fetchHotelDetail(slug: string): Promise<MacauHotel | null>;
