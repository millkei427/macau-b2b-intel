/**
 * Macau's six gaming concessionaires.
 *
 * IMPORTANT: Real casino procurement happens through vendor portals (NDA + supplier
 * registration). Cold email to general inquiry addresses has LOW ROI but is included
 * for completeness. Best outreach strategy: use vendor portal links to formally apply.
 */
export const MACAU_CASINOS = [
    {
        id: "sands-china",
        name: "金沙中國",
        nameEN: "Sands China Ltd.",
        group: "sands",
        publicEmail: "info@sands.com.mo",
        vendorPortalUrl: "https://www.sandschina.com/about-sands-china/procurement.html",
        website: "https://www.sandschina.com",
        note: "Vendor portal requires registration. Main properties: Venetian, Parisian, Londoner, Plaza.",
    },
    {
        id: "galaxy",
        name: "銀河娛樂",
        nameEN: "Galaxy Entertainment Group",
        group: "galaxy",
        publicEmail: "info@galaxyentertainment.com",
        vendorPortalUrl: "https://www.galaxyentertainment.com/en/procurement",
        website: "https://www.galaxyentertainment.com",
        note: "Major property: Galaxy Macau, Broadway, StarWorld.",
    },
    {
        id: "mgm-china",
        name: "美高梅中國",
        nameEN: "MGM China Holdings",
        group: "mgm",
        publicEmail: "info@mgmchinaholdings.com",
        vendorPortalUrl: "https://www.mgmchinaholdings.com/en/sustainability/suppliers.html",
        website: "https://www.mgmchinaholdings.com",
        note: "Major properties: MGM Macau, MGM Cotai.",
    },
    {
        id: "wynn-macau",
        name: "永利澳門",
        nameEN: "Wynn Macau Ltd.",
        group: "wynn",
        publicEmail: "info@wynnmacau.com",
        vendorPortalUrl: "https://www.wynnmacaulimited.com/en/sustainability/responsible-supply-chain",
        website: "https://www.wynnmacaulimited.com",
        note: "Major properties: Wynn Macau, Wynn Palace.",
    },
    {
        id: "melco",
        name: "新濠國際",
        nameEN: "Melco Resorts & Entertainment",
        group: "melco",
        publicEmail: "contactcentre@melco-resorts.com",
        vendorPortalUrl: "https://www.melco-resorts.com/en/sustainability/responsible-procurement/",
        website: "https://www.melco-resorts.com",
        note: "Major properties: City of Dreams, Studio City, Altira.",
    },
    {
        id: "sjm",
        name: "澳娛綜合",
        nameEN: "SJM Holdings Ltd.",
        group: "sjm",
        publicEmail: "info@sjmholdings.com",
        vendorPortalUrl: "https://www.sjmholdings.com/en/our-business/our-procurement-policy/",
        website: "https://www.sjmholdings.com",
        note: "Major properties: Grand Lisboa, Grand Lisboa Palace.",
    },
];
export function fetchAllMacauCasinos() {
    return [...MACAU_CASINOS];
}
