//This is a Listing page which will list the venue and vendor based on the url slug

import CityVenueHall from "@/components/miscellaneous/footer/CityVenueHall";
import FooterVendors from "@/components/miscellaneous/footer/FooterVendors";
import VendorListPage from "@/components/vendor/vendorlistpage/VendorListPage";
import VenueListPage from "@/components/venue/venuelistpage/VenueListPage";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FooterLocalities from "@/components/miscellaneous/footer/FooterLocalites";
import FooterRelatedSearch from "@/components/miscellaneous/footer/FooterRelatedSearch";
import FooterKeyword from "@/components/miscellaneous/footer/FooterKeyword";
import Faqs from "@/components/venue/venuedetailspage/faqs/Faqs";

function Venue(props) {
  const { setSelectedCity, localities } = useGlobalContext();

  const router = useRouter();

  // If a user is comming by the url then we change the city as per the url, Here I am not update chageRoute because here i don't need to update that , otherwire userwill rediect to the homepage.
  //This will run every time when user come on listing page. It will setSelectcity if city name is diff. if url contain the same city name then useEffect will run but it will not update the city.Updating the city with the same values does not cause re-render.
  useEffect(() => {
    if (props.city) {
      setSelectedCity(props.city);
    }
  }, [props.city]);

  const jsonLdData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Banquet Halls",
    image: "https://weddingbanquets.in/fav-icon/favicon14.png",
    brand: {
      "@type": "Brand",
      name: "Wedding Banquets",
    },
    offers: {
      "@type": "Offer",
      url: "https://weddingbanquets.in/",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 1000.0,
        priceCurrency: "INR",
        minPrice: "200",
        maxPrice: "5500",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4",
      bestRating: "5",
      worstRating: "3",
      ratingCount: "3828",
      reviewCount: "3828",
    },
    review: {
      "@type": "Review",
      reviewBody: "This is a fantastic banquet hall for weddings and events.",
      author: {
        "@type": "Person",
        name: "Prince",
      },
    },
  };

  if (props.result.tag === "venues") {
    return (
      <>
        <Head>
          <title>{props.result.meta?.meta_title}</title>
          <meta
            name="description"
            content={props.result.meta?.meta_description}
          />
          <meta name="keywords" content={props.result.meta?.meta_keywords} />

          <meta property="og:title" content={props.result.meta?.meta_title} />
          <meta
            property="og:description"
            content={props.result.meta?.meta_description}
          />
          <meta
            property="og:url"
            content={`https://weddingbanquets.in/${router.asPath}`}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          />
        </Head>

        <VenueListPage data={{ ...props, localities }} />

        {props.result.meta?.faq && (
          <Faqs
            faqs={props.result.meta?.faq}
            name={`${props.category} in ${props.city}`}
          />
        )}

        <FooterKeyword
          city={props?.city}
          locality={props?.locality}
          category={props.category}
        />
        {props.locality === "all" ? (
          <FooterLocalities
            city={props.city}
            category={props.category}
            localities={props.localities?.data}
          />
        ) : null}
        <FooterRelatedSearch city={props?.city} locality={props?.locality} />
        <CityVenueHall cities={props.result.cities} />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>{props.result.meta?.meta_title}</title>
          <meta
            name="description"
            content={props.result.meta?.meta_description}
          />
          <meta name="keywords" content={props.result.meta?.meta_keywords} />

          <meta property="og:title" content={props.result.meta?.meta_title} />
          <meta
            property="og:description"
            content={props.result.meta?.meta_description}
          />
          <meta
            property="og:url"
            content={`https://weddingbanquets.in/${router.asPath}`}
          />
        </Head>
        <VendorListPage data={{ ...props, localities }} />
        <FooterVendors />
        <CityVenueHall cities={props.result.cities} />
      </>
    );
  }
}

export async function getServerSideProps({ query, req, res }) {
  try {
    let { category, city, locality } = query;

    //For filter
    const { guest, per_plate, per_budget, multi_localities } = query;

    const filterQuery = {
      guest: guest || "",
      per_plate: per_plate || "",
      per_budget: per_budget || "",
      multi_localities: multi_localities || "",
    };

    // console.log(filterQuery);

    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}?guest=${filterQuery.guest}&per_plate=${filterQuery.per_plate}&per_budget=${filterQuery.per_budget}&multi_localities=${filterQuery.multi_localities}`;
    const getlocalitiesURL = `${process.env.SERVER_DOMAIN}/api/locations/${city}`;

    // let response = await fetch(url)
    // const result = await response.json();

    // let localities = await fetch(getlocalitiesURL);
    // localities = await localities.json();

    const fetchData = async (url) => {
      const response = await fetch(url);

      try {
        const data = await response.json();

        console.log("-----------------------------------------------------");
        console.log("page data  " + data);
        console.log("-----------------------------------------------------");

        return data;
      } catch (error) {
        console.log("-----------------------------------------------------");
        console.log(" Invalid response while fetching the data .");
        console.log(response);
        console.log("-----------------------------------------------------");
        throw error;
      }
    };

    const fetchLocality = async (url) => {
      const response = await fetch(url);

      try {
        const data = await response.json();

        console.log("-----------------------------------------------------");
        console.log("locality data " + data);
        console.log("-----------------------------------------------------");

        return data;
      } catch (error) {
        console.log("-----------------------------------------------------");
        console.log("Invalid response while fetching the locality.");
        console.log(response);
        console.log("-----------------------------------------------------");
        throw error;
      }

      // const data = await response.json();
      // console.log("locality data " + data)

      // return data;
    };

    const result = await fetchData(url);
    const localities = await fetchLocality(getlocalitiesURL);

    // // Use Promise.all to fetch data from both APIs concurrently
    // const [result, localities] = await Promise.all([
    //     fetchData(url),
    //     fetchData(getlocalitiesURL),
    // ]);

    return {
      props: {
        result: result || null,
        city: city || null,
        locality: locality || null,
        category: category || null,
        localities: localities || null,
        filterQuery,
      },
    };
  } catch (error) {
    console.log("Error from listing page line number 183");
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default Venue;
