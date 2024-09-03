import styled from "styled-components";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";

import CylenderFilter from "@/components/miscellaneous/filter/CylenderFilter";
import { CheckFilter } from "@/components/miscellaneous/filter/CheckFilter";
import RangeFilter from "@/components/miscellaneous/filter/RangeFilter";
import getLocalitiesCat from "@/lib/request/getlocalities/getLocalitiesCat";

function VendorFilter({ filterQuery, localities, city, category, locality }) {
  const router = useRouter();

  const occationList = [
    {
      name: "Roka",
      slug: "roka"
    },
    {
      name: "Sagan",
      slug: "sagan"
    },
    {
      name: "Engagement",
      slug: "engagement"
    },
    {
      name: "Haldi & Mehndi",
      slug: "haldi-mehndi"
    },
    {
      name: "Cocktail",
      slug: "cocktail"
    },
    {
      name: "Wedding",
      slug: "wedding"
    },
    {
      name: "Reception",
      slug: "reception"
    },
    {
      name: "Anniversary",
      slug: "anniversary"
    },
    {
      name: "Mata ki Chowki",
      slug: "mata-ki-chowki"
    },
    {
      name: "Birthday",
      slug: "birthday"
    },
    {
      name: "Corporate Event",
      slug: "corporate-event"
    },
    {
      name: "Baby Shower",
      slug: "baby-shower"
    },
  ];

  const serviceListPhotographers = [
    {
      id: "traditional",
      name: "Traditional",
    },
    {
      id: "candid",
      name: "Candid",
    },
    {
      id: "pre-wedding",
      name: "Pre-wedding",
    },
    {
      id: "cinematographic",
      name: "Cinematographic",
    },
    {
      id: "drone-shoots",
      name: "Drone Shoots",
    },
    {
      id: 'photobooth',
      name: "Photobooth",
    },
    {
      id: 'live-screening',
      name: "Live Screening",
    }
  ];

  const serviceListMakeup = [
    {
      id: "airbrush-makeup",
      name: "Airbrush Makeup",
    },
    {
      id: "party-makeup",
      name: "Party Makeup",
    },
    {
      id: "hd-makeup",
      name: "HD Makeup",
    },
    {
      id: "birdal-makeup",
      name: "Birdal Makeup",
    },
    {
      id: "engagement-makeup",
      name: "Engagement Makeup",
    },
    {
      id: "outstation-makeup",
      name: "Outstation Makeup",
    },
    {
      id: "haldimakeup-mehndi-cocktail-roka",
      name: "Haldi Makeup/ Mehndi / Cocktail / Roka",
    },
  ];

  const initialPhotoVideoPackageBudget = [
    { name: "Upto ₹ 50,000", slug: "0,50000" },
    { name: "₹ 50,000-₹ 1,00,000", slug: "50000,100000" },
    { name: "₹ 1,00,000-₹ 1,50,000", slug: "100000,150000" },
    { name: "₹ 1,50,000-₹ 2,00,000", slug: "150000,200000" },
    { name: "More than ₹ 2,00,000", slug: "200000,9999999999" },
  ];

  const servicedays = [
    { name: "1 Day", slug: "1" },
    { name: "2 Day", slug: "2" },
    { name: "3 Day", slug: "3" },
    { name: "4 Day", slug: "4" },
    { name: "5 Day", slug: "5" },
    { name: "6 Day", slug: "6" },
  ];

  const makeupBridalBudget = [
    { name: "Upto ₹ 8,000", slug: "0,8000" },
    { name: "₹ 8,000-₹ 20,000", slug: "8000,20000" },
    { name: "₹ 20,000-₹ 40,000", slug: "20000,40000" },
    { name: "₹ 40,000-₹ 60,000", slug: "40000, 60000" },
    { name: "₹ 60,000-₹ 80,000", slug: "60000, 80000" },
    { name: "₹ 80,000-₹ 1,00,000", slug: "80000, 100000" },
    { name: "More than ₹ 1,00,000", slug: "100000,9999999999" },
  ];

  const mehndiPackageBudget = [
    { name: "Upto ₹ 5,000", slug: "0,5000" },
    { name: "₹ 5,000-₹ 10,000", slug: "5000,10000" },
    { name: "₹ 10,000-₹ 15,000", slug: "10000,15000" },
    { name: "₹ 15,000-₹ 20,000", slug: "15000,20000" },
    { name: "More than ₹ 20,000", slug: "20000,9999999999" },
  ];

  const banquetDecorPackageBudget = [
    { name: "Upto ₹ 75,000", slug: "0,75000" },
    { name: "₹ 75,000-₹ 1,50,000", slug: "75000,150000" },
    { name: "₹ 1,50,000-₹ 2,50,000", slug: "150000,250000" },
    { name: "₹ 2,50,000-₹ 4,00,000", slug: "250000,400000" },
    { name: "₹ 4,00,000-₹ 6,00,000", slug: "400000,600000" },
    { name: "More than ₹ 6,00,000", slug: "600000,999999999" },
  ];

  const homeDecorPackageBudget = [
    { name: "Upto ₹ 25,000", slug: "0,25000" },
    { name: "₹ 25,000-₹ 50,000", slug: "25000,50000" },
    { name: "₹ 50,000-₹ 75,000", slug: "50000,75000" },
    { name: "₹ 75,000-₹ 1,00,000", slug: "75000,100000" },
    { name: "More than ₹ 1,00,000", slug: "100000,9999999999" },
  ];

  const bandBajaGhodiwalaBudget = [
    { name: "Upto ₹ 20,000", slug: "0,20000" },
    { name: "₹ 20,000-₹ 40,000", slug: "20000,40000" },
    { name: "₹ 40,000-₹ 60,000", slug: "40000,60000" },
    { name: "₹ 60,000-₹ 80,000", slug: "60000,80000" },
    { name: "₹ 80,000-₹ 1,00,000", slug: "80000,100000" },
    { name: "More than ₹ 1,00,000", slug: "100000,9999999999" },
  ];

  // State declarations
  const [selectedLocalities, setSelectedLocalities] = useState(filterQuery.multi_localities?.split(",") || []);
  
  // Filter states
  const [selectedServiceListPhotographers, setSelectedServiceListPhotographers] = useState([]);
  const [filterPhotographerOccation, setFilterPhotographerOccation] = useState("");
  const [filterPhotographerServiceBudget, setFilterPhotographerServiceBudget] = useState("");
  const [photoVideoPackageBudget, setPhotoVideoPackageBudget] = useState(initialPhotoVideoPackageBudget);
  const [days, setDays] = useState(1);

  const [selectedServiceListMakeup, setSelectedServiceListMakeup] = useState([]);
  const [filterMakeupBridalBudget, setFilterMakeupBridalBudget] = useState("");
  const [selectedOccasionListMakeup, setSelectedOccasionListMakeup] = useState([]);

  const [filterMehndiPackageBudget, setFilterMehndiPackageBudget] = useState("");

  const [filterBanquetDecorPackageBudget, setFilterBanquetDecorPackageBudget] = useState("");
  const [filterHomeDecorPackageBudget, setFilterHomeDecorPackageBudget] = useState("");

  const [filterBandBajaGhodiwalaBudget, setFilterBandBajaGhodiwalaBudget] = useState("");

  const [experienceRange, setExperienceRange] = useState([0, 20]);
  const [eventsCompletedRange, setEventsCompletedRange] = useState([0, 500]);

  const [cityLocalities, setCityLocalities] = useState([]);

  useEffect(() => {
    async function fetchLocaties() {
      let response = await getLocalitiesCat(city, category);
      if (response.success === true) {
        setCityLocalities(response.data);
      }
    }
    fetchLocaties();
  }, [city, category]);

  const handleApplyFilter = async () => {
    const localitiesFilterArray = selectedLocalities.join(",");
    const filterCategory = category || "best-wedding-photographers";
    const filterLocality = localities.length >= 1 ? "all" : locality;
    const baseUrl = `/${filterCategory}/${city}/${filterLocality}`;
    let query = `?multi_localities=${localitiesFilterArray}&experience=${experienceRange.join(",")}&events_completed=${eventsCompletedRange.join(",")}`;

    // Build query string based on selected filters
    if (category === "top-makeup-artists") {
      query += `&makeup_bridal_budget=${filterMakeupBridalBudget || ""}&makeup_service=${selectedServiceListMakeup.join(",") || ""}&makeup_occasion=${selectedOccasionListMakeup || ""}`;
    } else if (category === "best-wedding-photographers") {
      query += `&photographer_occation=${filterPhotographerOccation || ""}&photographer_service=${selectedServiceListPhotographers.join(",") || ""}&photographer_service_budget=${filterPhotographerServiceBudget || ""}&days=${days}`;
    } else if (category === "best-mehndi-artists") {
      query += `&mehndi_package_budget=${filterMehndiPackageBudget || ""}`;
    } else if (category === "band-baja-ghodiwala") {
      query += `&band_baja_ghodiwala_budget=${filterBandBajaGhodiwalaBudget || ""}`;
    } else if (category === "best-decorators") {
      query += `&banquet_decor_package_budget=${filterBanquetDecorPackageBudget || ""}&home_decor_package_budget=${filterHomeDecorPackageBudget || ""}`;
    }

    router.push(baseUrl + query);
  };

  return (
    <Wrapper>
      <div className="filters">
        <CheckFilter items={cityLocalities} type={'vendor'} name={"Localities"} list={selectedLocalities} setList={setSelectedLocalities} handleApplyFilter={handleApplyFilter} />
        
        {category === "best-wedding-photographers" && (
          <>
            <CheckFilter items={serviceListPhotographers} name={"Services"} list={selectedServiceListPhotographers} setList={setSelectedServiceListPhotographers} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Occasion"} items={occationList} value={filterPhotographerOccation} setValue={setFilterPhotographerOccation} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Days"} items={servicedays} value={days} setValue={setDays} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Budget"} items={photoVideoPackageBudget} value={filterPhotographerServiceBudget} setValue={setFilterPhotographerServiceBudget} handleApplyFilter={handleApplyFilter} />
          </>
        )}
        
        {category === "top-makeup-artists" && (
          <>
            <CheckFilter items={serviceListMakeup} name={"Services"} list={selectedServiceListMakeup} setList={setSelectedServiceListMakeup} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Occasion"} items={occationList} value={selectedOccasionListMakeup} setValue={setSelectedOccasionListMakeup} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Makeup Artist Budget"} items={makeupBridalBudget} value={filterMakeupBridalBudget} setValue={setFilterMakeupBridalBudget} handleApplyFilter={handleApplyFilter} />
          </>
        )}
        
        {category === "best-mehndi-artists" && (
          <>
            <CylenderFilter name={"Mehndi Artist Budget"} items={mehndiPackageBudget} value={filterMehndiPackageBudget} setValue={setFilterMehndiPackageBudget} handleApplyFilter={handleApplyFilter} />
          </>
        )}
        
        {category === "best-decorators" && (
          <>
            <CylenderFilter name={"Decor Price (Venue)"} items={banquetDecorPackageBudget} value={filterBanquetDecorPackageBudget} setValue={setFilterBanquetDecorPackageBudget} handleApplyFilter={handleApplyFilter} />
            <CylenderFilter name={"Decor Price (Home)"} items={homeDecorPackageBudget} value={filterHomeDecorPackageBudget} setValue={setFilterHomeDecorPackageBudget} handleApplyFilter={handleApplyFilter} />
          </>
        )}
        
        {category === "band-baja-ghodiwala" && (
          <>
            <CylenderFilter name={"Stating Price"} items={bandBajaGhodiwalaBudget} value={filterBandBajaGhodiwalaBudget} setValue={setFilterBandBajaGhodiwalaBudget} handleApplyFilter={handleApplyFilter} />
          </>
        )}

        <RangeFilter title="Filter" rangeConfig={[
            {
              label: 'Experience',
              defaultValue: experienceRange,
              min: 0,
              max: 20,
              minDistance: 0,
            },
            {
              label: 'Event Completed',
              defaultValue: eventsCompletedRange,
              min: 0,
              max: 500,
              minDistance: 0,
            },
          ]}
          handleApplyFilter={(values) => {
            setExperienceRange(values[0]);
            setEventsCompletedRange(values[1]);
            setShouldApplyFilter(true);
          }}
        />
      </div>
    </Wrapper>
  );
}

export default memo(VendorFilter);

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: white;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0px 0 5px rgba(0,0,0,0.2);
    border-radius: 25px;
    background-color: #EDEDED;
    border: 2px solid #f2f2f2;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color:#EDEDED;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 25px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #CCCCCC;
  }

  .filters {
    display: grid;
    gap: 2.5rem;
    width: 100%;
    overflow-x: hidden;
  }
`;
