import {
  fetchAllMacauSchools,
  fetchAllMacauHotels,
  fetchAllMacauGovEntities,
  filterTenderLikely,
  fetchAllMacauRestaurants,
  fetchAllMacauTravelAgencies,
  fetchAllMacauCasinos,
} from "../src/index.js";

async function main() {
  console.log("=== Macau B2B Intel · Smoke Test ===\n");

  const schools = await fetchAllMacauSchools();
  console.log(`📚 Schools: ${schools.length} (K-12 + higher-ed)`);
  console.log(`   Sample: ${schools[0]?.name} · ${schools[0]?.website}`);

  const hotels = await fetchAllMacauHotels();
  console.log(`🏨 Hotels: ${hotels.length}`);
  console.log(`   Sample: ${hotels[0]?.name} · ${hotels[0]?.email} · ${hotels[0]?.website}`);

  const gov = await fetchAllMacauGovEntities();
  console.log(`🏛️  Gov entities: ${gov.length}`);
  console.log(`   Sample: ${gov[0]?.name} (${gov[0]?.abbreviation}) · ${gov[0]?.website}`);

  const tenderLikely = filterTenderLikely(gov);
  console.log(`   → ${tenderLikely.length} likely to publish IT tenders`);

  const restaurants = await fetchAllMacauRestaurants();
  const restsWithEmail = restaurants.filter((r) => r.email);
  console.log(`🍽️  Restaurants: ${restaurants.length} (${restsWithEmail.length} with email)`);
  console.log(`   Sample: ${restsWithEmail[0]?.name} · ${restsWithEmail[0]?.email}`);

  const agencies = await fetchAllMacauTravelAgencies();
  const agsWithEmail = agencies.filter((a) => a.email);
  console.log(`✈️  Travel agencies: ${agencies.length} (${agsWithEmail.length} with email)`);
  console.log(`   Sample: ${agsWithEmail[0]?.name} · ${agsWithEmail[0]?.email}`);

  const casinos = fetchAllMacauCasinos();
  console.log(`🎰 Casinos: ${casinos.length}`);

  const total = schools.length + hotels.length + gov.length + restaurants.length + agencies.length + casinos.length;
  console.log(`\n📊 Total B2B universe: ${total} entities`);
  console.log(`   With email: ${schools.length + hotels.filter(h => h.email).length + restsWithEmail.length + agsWithEmail.length + casinos.length} (schools need email scrape)`);
}

main().catch(console.error);
