import Header from "@/components/layout.js/Header";
import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";
import { useGlobalContext } from "@/context/MyContext";
import VendorTopFilter from "@/components/miscellaneous/VendorTopFilter";
import VendorContainer from "./vendorcontainer/VendorContainer";
import SideFilter from "./filter/SideFilter";

export default function VendorListPage(props) {
  const { category, city, locality, result,localities, filterQuery } = props.data;
  const { vendorCategories, venueCategories } = useGlobalContext();


  return (
    <>
      <SideFilter
        category={category}
        localities={localities}
        city={city}
        vendorCategories={vendorCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <Header />
      <VendorTopFilter
        category={category}
        localities={localities}
        city={city}
        vendorCategories={vendorCategories}
        locality={locality}
        filterQuery={filterQuery}
      />
      <VendorContainer 
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
      <Pagedescription caption={result.meta?.caption} />
    </>
  );
}
