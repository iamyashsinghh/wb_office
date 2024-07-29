import TopFilter from "@/components/miscellaneous/TopFilter";
import Header from "@/components/layout.js/Header";
import { useGlobalContext } from "@/context/MyContext";
import VenueContainer from "@/components/venue/venuelistpage/venuecontainer/VenueContainer";
import SideFilter from "./filter/SideFilter";
import Footerdescription from "@/components/miscellaneous/pagedescription/PageDescription";
import Offer from "@/components/miscellaneous/Offer";

export default function VenueListPage({ data }) {
  const { city, locality, category, localities, result, filterQuery } = data;

  const { venueCategories, vendorCategories } = useGlobalContext();

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
            <Offer/>

      <VenueContainer
        lists={result.data}
        locality={locality}
        category={category}
        count={result.count}
        city={city}
        localities={localities}
        venueCategories={venueCategories}
        vendorCategories={vendorCategories}
        filterQuery={filterQuery}
      />
      <Footerdescription caption={result.meta?.caption} />
    </>
  );
}