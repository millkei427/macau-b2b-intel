export {
  fetchAllMacauSchools,
  fetchK12Schools,
  fetchHigherEdSchools,
  type MacauSchool,
} from "./sources/schools.js";

export {
  fetchAllMacauHotels,
  fetchHotelsByStar,
  fetchHotelDetail,
  type MacauHotel,
} from "./sources/hotels.js";

export {
  fetchAllMacauGovEntities,
  filterTenderLikely,
  type MacauGovEntity,
} from "./sources/gov.js";

export {
  fetchAllMacauRestaurants,
  fetchRestaurantDetail,
  type MacauRestaurant,
} from "./sources/restaurants.js";

export {
  fetchAllMacauTravelAgencies,
  fetchAgencyDetail,
  type MacauTravelAgency,
} from "./sources/travel-agencies.js";

export {
  fetchAllMacauCasinos,
  MACAU_CASINOS,
  type MacauCasino,
} from "./sources/casinos.js";

export { scrapeEmails } from "./utils/email-scraper.js";
