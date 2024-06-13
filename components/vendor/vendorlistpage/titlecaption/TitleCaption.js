import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import VendorSearchBar from "../vendorSearchBar/VendorSearchBar";
import SearchBarVendor from "@/components/miscellaneous/SearchBarVendor";
import Head from "next/head";

export default function TitleCaption({
  caption,
  category,
  city,
  locality,
  count,
  vendor_list,
  venue_list,
}) {
  const { selectedCity, vendorCategories, venueCategories, cities } =
    useGlobalContext();
  let venueObject = [];
  let vendorObject = [];
  let venueNames = venueCategories.map((category) => category.name);
  let cityNames = cities.map((city) => city.name);
  let vendorNames = vendorCategories.map((category) => category.name);
  let vendorBrandNames = vendor_list.map((category) => category.brand_name);
  let allVenues = venue_list.map((category) => category.name);
  let allVenuesSlug = venue_list.map((category) => category.slug);
  let allVendorsSlug = vendor_list.map((category) => category.slug);
  const suggestions = [
    ...venueNames,
    ...vendorNames,
    ...vendorBrandNames,
    ...allVenues,
  ];
  for (let i = 0; i < allVenues.length; i++) {
    let obj = {};
    obj[allVenues[i]] = allVenuesSlug[i];
    venueObject.push(obj);
  }
  for (let i = 0; i < vendorBrandNames.length; i++) {
    let obj = {};
    obj[vendorBrandNames[i]] = allVendorsSlug[i];
    vendorObject.push(obj);
  }
  const jsonDataRS = `{
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${category.replaceAll("-", " ")} in ${
    locality === "all" ? city : locality
  }",
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "283",
          "reviewCount": "118"
      }
  }`;
  // this is vendor page canonical url only for time becuse we dont have any content in vendor page related to locality 
  const canonicalUrl = `https://weddingbanquets.in/${category}/${city}/all`;
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonDataRS }}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Wrapper className="section title-caption-section">
        <div className="headerr">
          <div className="header-container">
            <div className="vendor-page-title">
              <h2 className="main-title">
                {`${category.replaceAll("-", " ")}  in ${
                  locality === "all" ? city : locality
                }`}
              </h2>
              <div className="description">
                Showing <span className="count">{count} results</span> as per
                your search criteria
              </div>
              {/* < Pagedescription caption={caption}/ > */}
            </div>
          </div>
          {/* < VendorSearchBar category={category} /> */}
          <SearchBarVendor
            suggestions={suggestions}
            selectedCity={selectedCity}
            vendorBrandNames={vendorBrandNames}
            allVenues={allVenues}
            allVenuesSlug={allVenuesSlug}
            venueObject={venueObject}
            vendorObject={vendorObject}
            category={category}
          />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  @media (max-width: 300px) {
    .search-bar {
      display: none;
    }
  }
  .headerr {
    display: flex;
    justify-content: space-between;
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 150rem;
    .vendor-page-title {
      margin: 0 20px;
      .main-title {
        font-family: "Montserrat";
        font-size: 2.8rem;
        text-transform: capitalize;
      }

      .description {
        color: var(--para);
        font-size: 1.7rem;
        font-family: "Poppins";
        margin-top: 1rem;
        .count {
          font-weight: 500;
          color: black;
        }
      }
    }
  }
`;
