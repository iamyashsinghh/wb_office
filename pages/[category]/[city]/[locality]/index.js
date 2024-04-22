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
  useEffect(() => {
    if (props.city) {
      setSelectedCity(props.city);
    }
  }, [props.city]);
  const jsonLdData = {
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": "Wedding Banquets",
      "url": "https://weddingbanquets.in/"
    },
    "author": {
      "@type": "Person",
      "name": "User"
    },
    "reviewRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.4,
      "reviewCount": 3956,
      "bestRating": 5.0,
      "worstRating": 1.0
    }
  };

  const jsonLdData2 = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": { "@id": "https://weddingbanquets.in", "name": "Wedding Banquets" }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@id": `https://weddingbanquets.in/${props.category}`,
          "name": props.category.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@id": `https://weddingbanquets.in/${props.city}`,
          "name": props.city.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@id": `https://weddingbanquets.in/${props.locality}`,
          "name": props.locality.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
        }
      },
    ]
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData2) }}
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
           <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData2) }}
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
    const { guest, per_plate, per_budget, multi_localities , serch_value } = query;
    const filterQuery = {
      guest: guest || "",
      per_plate: per_plate || "",
      per_budget: per_budget || "",
      multi_localities: multi_localities || "",
      serch_value: serch_value || "",
    };
    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}?guest=${filterQuery.guest}&per_plate=${filterQuery.per_plate}&per_budget=${filterQuery.per_budget}&multi_localities=${filterQuery.multi_localities}&serch_value=${filterQuery.serch_value}`;
    const getlocalitiesURL = `${process.env.SERVER_DOMAIN}/api/locations/${city}`;
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
    };

    const result = await fetchData(url);
    const localities = await fetchLocality(getlocalitiesURL);
  
      const url2 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_vendor`;
      let vendor_list = await fetch(url2);
      vendor_list = await vendor_list.json();
      const url3 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_venue`;
      let venue_list = await fetch(url3);
      venue_list = await venue_list.json();
    return {
      props: {
        result: result || null,
        city: city || null,
        locality: locality || null,
        category: category || null,
        localities: localities || null,
        filterQuery,
        vendor_list: vendor_list || null,
        venue_list: venue_list || null,
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
