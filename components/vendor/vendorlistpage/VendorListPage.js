import Header from "@/components/layout.js/Header";
import VendorGrid from "./vendorgrid/VendorGrid";
import TitleCaption from "./titlecaption/TitleCaption";
import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";
import { useGlobalContext } from "@/context/MyContext";

export default function VendorListPage(props) {
  const { category, city, locality, result } = props.data;
  const { venue_list,vendor_list } = useGlobalContext();

  return (
    <>
      <Header />
      {/* <Offer/> */}
      {/* <Heading /> */}
      <TitleCaption
        category={category}
        locality={locality}
        city={city}
        venue_list={venue_list}
        vendor_list={vendor_list}
        count={result.count}
        caption={result.meta?.caption}
      />
      <VendorGrid
        vendors={result}
        category={category}
        city={city}
        locality={locality}
      />
      <Pagedescription caption={result.meta?.caption} />
    </>
  );
}
