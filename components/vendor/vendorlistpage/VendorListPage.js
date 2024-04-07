import styled from "styled-components";
import Offer from "@/components/miscellaneous/Offer";
import Header from "@/components/layout.js/Header";
import VendorGrid from "./vendorgrid/VendorGrid";
import TitleCaption from "./titlecaption/TitleCaption";
import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";

export default function VendorListPage(props) {
  const { category, city, locality, result } = props.data;

  return (
    <>
      <Header />
      {/* <Offer/> */}
      {/* <Heading /> */}
      <TitleCaption
        category={category}
        locality={locality}
        city={city}
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
