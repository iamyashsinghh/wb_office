import TopFilter from "@/components/miscellaneous/TopFilter";
import Offer from "@/components/miscellaneous/Offer";
import Header from "@/components/layout.js/Header";
import { useGlobalContext } from "@/context/MyContext";
import VenueContainer from "@/components/venue/venuelistpage/venuecontainer/VenueContainer";
import { FilterButton } from "@/components/venue/venuelistpage/filter/FilterButton";
import SideFilter from "./filter/SideFilter";
import Footerdescription from "@/components/miscellaneous/pagedescription/PageDescription";

export default function VenueListPage({ data }) {
  const { city, locality, category, localities, result, filterQuery } = data;

  const { venueCategories } = useGlobalContext();
  // console.log(data.result.count);

  return (
    <>
      <SideFilter
        category={category}
        localities={localities}
        city={city}
        venueCategories={venueCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <Header />
      <TopFilter
        category={category}
        localities={localities}
        city={city}
        venueCategories={venueCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      {/* <Offer /> */}
      <VenueContainer
        lists={result.data}
        locality={locality}
        category={category}
        count={result.count}
        city={city}
        localities={localities}
        venueCategories={venueCategories}
        filterQuery={filterQuery}
      />
      {/* <FilterButton /> */}

      <Footerdescription caption={result.meta?.caption} />
    </>
  );
}
