export interface MacauRestaurant {
    id: string;
    name: string;
    nameEN?: string;
    cuisine?: string;
    address?: string;
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
    openingHour?: string;
}
/**
 * Fetch all Macau licensed restaurants from Macao Government Tourism Office.
 * Source: macaotourism.gov.mo /api/dining/restaurant
 * Returns ~600+ restaurants. Email present for ~30-50% (rest left undefined).
 */
export declare function fetchAllMacauRestaurants(): Promise<MacauRestaurant[]>;
export declare function fetchRestaurantDetail(id: string): Promise<MacauRestaurant | null>;
