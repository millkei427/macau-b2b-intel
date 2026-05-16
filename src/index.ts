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

export { scrapeEmails } from "./utils/email-scraper.js";
