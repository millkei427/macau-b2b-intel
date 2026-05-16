import {
  fetchAllMacauSchools,
  fetchAllMacauHotels,
  fetchAllMacauGovEntities,
  filterTenderLikely,
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

  console.log(`\n📊 Total B2B universe: ${schools.length + hotels.length + gov.length} entities`);
}

main().catch(console.error);
