import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearch, BiCategoryAlt } from "react-icons/bi";
import { MdCurrencyRupee, MdFaceRetouchingNatural, MdOutlineFaceRetouchingNatural, MdOutlineLocationOn } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { useGlobalContext } from "@/context/MyContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";

export default function VendorTopFilter({
  locality,
  city,
  category,
  vendorCategories,
  filterQuery,
  localities,
}) {
  const makeupBridalBudget = [
    { name: "Upto ₹ 8,000", slug: "0,8000" },
    { name: "₹ 8,000-₹ 20,000", slug: "8000,20000" },
    { name: "₹ 20,000-₹ 40,000", slug: "20000,40000" },
    { name: "₹ 40,000-₹ 60,000", slug: "40000, 60000" },
    { name: "₹ 60,000-₹ 80,000", slug: "60000, 80000" },
    { name: "₹ 80,000-₹ 1,00,000", slug: "80000, 100000" },
    { name: "More than ₹ 1,00,000", slug: "100000,9999999999" },
  ];

  // const makeupEngagementBudget = [
  //   { name: "Upto ₹ 6,000", slug: "0,6000" },
  //   { name: "₹ 6,000-₹ 16,000", slug: "6000,16000" },
  //   { name: "₹ 16,000-₹ 30,000", slug: "16000,30000" },
  //   { name: "₹ 30,000-₹ 50,000", slug: "30000,50000" },
  //   { name: "More than ₹ 50,000", slug: "50000,9999999999" },
  // ];

  const initialPhotoVideoPackageBudget = [
    { name: "Upto ₹ 50,000", slug: "0,50000" },
    { name: "₹ 50,000-₹ 1,00,000", slug: "50000,100000" },
    { name: "₹ 1,00,000-₹ 1,50,000", slug: "100000,150000" },
    { name: "₹ 1,50,000-₹ 2,00,000", slug: "150000,200000" },
    { name: "More than ₹ 2,00,000", slug: "200000,9999999999" },
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

  const { cities } = useGlobalContext();
  const router = useRouter();

  const [filterLocality, setFilterLocality] = useState(locality);
  const [filterCategory, setFilterCategory] = useState(category);
  const [days, setDays] = useState(1);

  // Makeup filter
  const [filterMakeupBridalBudget, setFilterMakeupBridalBudget] = useState(
    filterQuery.makeup_bridal_budget || ""
  );
  const [selectedServiceListMakeup, setSelectedServiceListMakeup] = useState(filterQuery.makeup_service?.split(",") || []);
  const [selectedOccasionListMakeup, setSelectedOccasionListMakeup] = useState(filterQuery.makeup_occasion?.split(",") || []);


  // Photographer filter
  const [filterPhotographerService, setFilterPhotographerService] = useState(
    filterQuery.photographer_occation || ""
  );
  const [filterPhotographerServiceBudget, setFilterPhotographerServiceBudget] =
    useState(filterQuery.photographer_service_budget || "");
  const [photoVideoPackageBudget, setPhotoVideoPackageBudget] = useState(initialPhotoVideoPackageBudget);

  // Mehndi filter
  const [filterMehndiPackageBudget, setFilterMehndiPackageBudget] = useState(
    filterQuery.mehndi_package_budget || ""
  );

  // Decor filter
  const [filterBanquetDecorPackageBudget, setFilterBanquetDecorPackageBudget] =
    useState(filterQuery.banquet_decor_package_budget || "");
  const [filterHomeDecorPackageBudget, setFilterHomeDecorPackageBudget] =
    useState(filterQuery.home_decor_package_budget || "");

  // Band Baja Ghodiwala filter
  const [filterBandBajaGhodiwalaBudget, setFilterBandBajaGhodiwalaBudget] =
    useState(filterQuery.band_baja_ghodiwala_budget || "");

  let gridvalue = "2fr 2fr 2fr 1.5fr";

  if (
    category == "top-makeup-artists" ||
    category == "best-wedding-photographers" ||
    category == "best-decorators"
  ) {
    gridvalue = "1.4fr 1.4fr 2fr 2fr 2fr 1.4fr";
  } else if (category == "best-mehndi-artists" || category == "band-baja-ghodiwala") {
    gridvalue = "1.4fr 1.4fr 2fr 2fr 1.4fr";
  }

  useEffect(() => {
    setFilterLocality(locality);
    setFilterCategory(category);
  }, [locality, category]);

  useEffect(() => {
    if (category === "best-wedding-photographers") {
      const updatedBudget = initialPhotoVideoPackageBudget.map((item, index, array) => {
        const newPriceRange = item.slug.split(',').map(price => parseInt(price, 10) * days);
        let newName = '';
        if (index === 0) {
          newName = `${item.name.split('₹')[0]}₹ ${newPriceRange[1]}`;
        } else if (index === array.length - 1) {
          newName = `${item.name.split('₹')[0]}₹ ${newPriceRange[0]}+`;
        } else {
          newName = `${item.name.split('₹')[0]}₹ ${newPriceRange[0]}-${newPriceRange[1]}`;
        }
        return {
          ...item,
          name: newName,
        };
      });
      setPhotoVideoPackageBudget(updatedBudget);
    }
  }, [days, category]);


  async function handleApplyFilter() {
    const baseUrl = `/${filterCategory}/${city}/${filterLocality}`;
    let query = "";
    if (category === "top-makeup-artists") {
      query = `?makeup_bridal_budget=${filterMakeupBridalBudget || ""}&makeup_service=${selectedServiceListMakeup || ""}&makeup_occasion=${selectedOccasionListMakeup || ""}`;
    } else if (category === "best-wedding-photographers") {
      query = `?photographer_occation=${filterPhotographerService || ""}&photographer_service_budget=${filterPhotographerServiceBudget || ""}&days=${days}`;
    } else if (category === "best-mehndi-artists") {
      query = `?mehndi_package_budget=${filterMehndiPackageBudget || ""}`;
    } else if (category === "band-baja-ghodiwala") {
      query = `?band_baja_ghodiwala_budget=${filterBandBajaGhodiwalaBudget || ""}`;
    } else if (category === "best-decorators") {
      query = `?banquet_decor_package_budget=${filterBanquetDecorPackageBudget || ""}&home_decor_package_budget=${filterHomeDecorPackageBudget || ""}`;
    }
    router.push(baseUrl + query);
  }

  function handleCityChange(e) {
    setFilterLocality("all");
    router.push(`/${category}/${e.target.value}/all`);
  }

  function handleLocalityChange(e) {
    setFilterLocality(e.target.value);
    router.push(`/${category}/${city}/${e.target.value}`);
  }

  function handleCategoryChange(e) {
    setFilterCategory(e.target.value);
    router.push(`/${e.target.value}/${city}/${locality}`);
  }

  return (
    <Div>
      <Wrapper className="container" gridValue={gridvalue}>
        <div className="city-wrapper filter-item">
          <div className="dropdown city-dropdown">
            <BiSearch className="icon" />
            <label>
              <select
                name="cities"
                onChange={(e) => handleCityChange(e)}
                value={city}
              >
                <option value={null} disabled>
                  City
                </option>
                {cities?.map((cityItem) => (
                  <option value={cityItem.slug} key={cityItem.id}>
                    {cityItem.name}
                  </option>
                ))}
              </select>
            </label>
            <AiFillCaretDown className="down-arrow" size={15} />
          </div>
        </div>

        <div className="location-wrapper filter-item">
          <div className="dropdown locality-dropdown">
            <MdOutlineLocationOn className="icon" />
            <select
              name="locality"
              onChange={(e) => handleLocalityChange(e)}
              value={locality}
            >
              <option value="all">Locality</option>
              {localities.map((loc) => (
                <option value={loc.slug} key={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <AiFillCaretDown className="down-arrow" size={15} />
          </div>
        </div>

        {category !== "best-wedding-photographers" && category !== "top-makeup-artists" && (
          <div className="category-wrapper filter-item">
            <div className="dropdown category-dropdown">
              <BiCategoryAlt className="icon" />
              <select
                name="category"
                onChange={(e) => handleCategoryChange(e)}
                value={category}
              >
                <option value={null} disabled>Category</option>
                {vendorCategories.map((cat) => (
                  <option value={cat.slug} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <AiFillCaretDown className="down-arrow" size={15} />
            </div>
          </div>
        )}


        {category === "top-makeup-artists" && (
          <>
            <div className="occationList-wrapper filter-item">
              <div className="dropdown occationList-dropdown">
                <SlCalender className="icon" />
                <select
                  name="occationList"
                  onChange={(e) => setSelectedOccasionListMakeup(e.target.value)}
                  value={selectedOccasionListMakeup}
                >
                  <option value="">Occasion</option>
                  {occationList.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>

            <div className="serviceListMakeup-wrapper filter-item">
              <div className="dropdown serviceListMakeup-dropdown">
                <MdOutlineFaceRetouchingNatural className="icon" />
                <select
                  name="serviceListMakeup"
                  onChange={(e) => setSelectedServiceListMakeup(e.target.value)}
                  value={selectedServiceListMakeup}
                >
                  <option value="">Services</option>
                  {serviceListMakeup.map((item, i) => (
                    <option value={item.id} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>

            <div className="makeupBridalBudget-wrapper filter-item">
              <div className="dropdown makeupBridalBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="makeupBridalBudget"
                  onChange={(e) => setFilterMakeupBridalBudget(e.target.value)}
                  value={filterMakeupBridalBudget}
                >
                  <option value="">Makeup Budget</option>
                  {makeupBridalBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
          </>
        )}

        {category === "best-wedding-photographers" && (
          <>
            <div className="days-wrapper filter-item">
              <div className="dropdown days-dropdown">
                <IoIosTimer className="icon" />
                <select
                  name="days"
                  onChange={(e) => setDays(e.target.value)}
                  value={days}
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                  <option value={6}>6 Days</option>
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>

            <div className="photographerService-wrapper filter-item">
              <div className="dropdown photographerService-dropdown">
                <SlCalender className="icon" />
                <select
                  name="photographerService"
                  onChange={(e) => setFilterPhotographerService(e.target.value)}
                  value={filterPhotographerService}
                >
                  <option value="">Occasion</option>
                  <option value="roka">Roka</option>
                  <option value="sagan">Sagan</option>
                  <option value="engagement">Engagement</option>
                  <option value="haldi-mehndi">Haldi & Mehndi</option>
                  <option value="cocktail">Cocktail</option>
                  <option value="wedding">Wedding</option>
                  <option value="reception">Reception</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="mata-ki-chowki">Mata ki Chowki</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate-event">Corporate Event</option>
                  <option value="baby-shower">Baby Shower</option>
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>

            <div className="photoVideoPackageBudget-wrapper filter-item">
              <div className="dropdown photoVideoPackageBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="photoVideoPackageBudget"
                  onChange={(e) =>
                    setFilterPhotographerServiceBudget(e.target.value)
                  }
                  value={filterPhotographerServiceBudget}
                >
                  <option value="">Budget (Photo + Video)</option>
                  {photoVideoPackageBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
          </>
        )}

        {category === "best-mehndi-artists" && (
          <>
            <div className="mehndiPackageBudget-wrapper filter-item">
              <div className="dropdown mehndiPackageBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="mehndiPackageBudget"
                  onChange={(e) =>
                    setFilterMehndiPackageBudget(e.target.value)
                  }
                  value={filterMehndiPackageBudget}
                >
                  <option value="">Mehndi Package (Bridal)</option>
                  {mehndiPackageBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
          </>
        )}

        {category === "best-decorators" && (
          <>
            <div className="banquetDecorPackageBudget-wrapper filter-item">
              <div className="dropdown banquetDecorPackageBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="banquetDecorPackageBudget"
                  onChange={(e) =>
                    setFilterBanquetDecorPackageBudget(e.target.value)
                  }
                  value={filterBanquetDecorPackageBudget}
                >
                  <option value="">Decor Price (Venue)</option>
                  {banquetDecorPackageBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
            <div className="homeDecorPackageBudget-wrapper filter-item">
              <div className="dropdown homeDecorPackageBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="homeDecorPackageBudget"
                  onChange={(e) =>
                    setFilterHomeDecorPackageBudget(e.target.value)
                  }
                  value={filterHomeDecorPackageBudget}
                >
                  <option value="">Decor Price (Home)</option>
                  {homeDecorPackageBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
          </>
        )}

        {category === "band-baja-ghodiwala" && (
          <>
            <div className="bandBajaGhodiwalaBudget-wrapper filter-item">
              <div className="dropdown bandBajaGhodiwalaBudget-dropdown">
                <MdCurrencyRupee className="icon" />
                <select
                  name="bandBajaGhodiwalaBudget"
                  onChange={(e) => setFilterBandBajaGhodiwalaBudget(e.target.value)}
                  value={filterBandBajaGhodiwalaBudget}
                >
                  <option value="">Starting Price</option>
                  {bandBajaGhodiwalaBudget.map((item, i) => (
                    <option value={item.slug} key={i}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
              </div>
            </div>
          </>
        )}

        <div className="btn-wrapper filter-item">
          <button className="search-btn" onClick={handleApplyFilter}>
            Search
          </button>
        </div>
      </Wrapper>
    </Div>
  );
}

const Div = styled.div`
  background-color: #0d0d0d;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ gridValue }) => gridValue};
  gap: 1rem;

  .filter-item {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 0;

    .dropdown {
      padding-right: 20px;
      overflow: hidden;
      position: relative;
      height: 4.5rem;
      width: 100%;
      display: flex;
      align-items: center;
      background: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    select,
    input {
      font-family: "Poppins";
      cursor: pointer;
      font-size: 1.8rem;
      width: 100%;
      height: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      color: var(--para);
      padding-left: 4rem;
      appearance: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 2;
      position: absolute;
      width: 100%;
      top: 0;
    }
    .icon {
      position: absolute;
      left: 10px;
      font-size: 2.5rem;
      color: var(--para);
    }
    .down-arrow {
      position: absolute;
      right: 10px;
      font-size: 2.5rem;
      z-index: 0;
      color: var(--para);
    }

    .search-btn {
      width: 100%;
      height: 100%;
      cursor: pointer;
      background-color: var(--secoundary-color);
      border: none;
      outline: none;
      font-size: 1.8rem;
      color: white;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
    display: none;

    .city-wrapper {
      display: none;
    }
    .category-wrapper {
      grid-column: 4/-1;
    }
    .location-wrapper {
      grid-column: 1/4;
    }
    .guest-wrapper {
      grid-column: 1/3;
    }
    .budget-wrapper {
      grid-column: 3/5;
    }
    .btn-wrapper {
      grid-column: 5/-1;
    }
  }

  @media (max-width: 600px) {
    .down-arrow {
      right: 5px;
    }
  }
`;
