import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/context/MyContext';

import CityVenueHall from '@/components/miscellaneous/footer/CityVenueHall';
import FooterVendors from '@/components/miscellaneous/footer/FooterVendors';
import VendorListPage from '@/components/vendor/vendorlistpage/VendorListPage';
import VenueListPage from '@/components/venue/venuelistpage/VenueListPage';
import FooterLocalities from '@/components/miscellaneous/footer/FooterLocalites';
import FooterRelatedSearch from '@/components/miscellaneous/footer/FooterRelatedSearch';
import FooterKeyword from '@/components/miscellaneous/footer/FooterKeyword';
import Faqs from '@/components/venue/venuedetailspage/faqs/Faqs';

function Venue(props) {
  const { setSelectedCity, localities } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (props.city) {
      setSelectedCity(props.city);
    }
  }, [props.city]);
  return (
    <>
      <Head>
        <title>{props.result.meta?.meta_title}</title>
        <meta name="description" content={props.result.meta?.meta_description} />
        <meta name="keywords" content={props.result.meta?.meta_keywords} />
        <link rel="canonical" href={`https://weddingbanquets.in${router.asPath}`} />
        <meta property="og:title" content={props.result.meta?.meta_title} />
        <meta property="og:description" content={props.result.meta?.meta_description} />
        <meta property="og:image" content={
          props.result && props.result.data && props.result.data.length > 0 && props.result.data[0].images
            ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${props.result.data[0].images.split(',')[0]}`
            : 'https://weddingbanquets.in/twitter-img.png'
        }
        />
        <meta property="og:url" content={`https://weddingbanquets.in${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.result.meta?.meta_title} />
        <meta name="twitter:description" content={props.result.meta?.meta_description} />
        <meta name="twitter:image" content={
          props.result && props.result.data && props.result.data.length > 0 && props.result.data[0].images
            ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${props.result.data[0].images.split(',')[0]}`
            : 'https://weddingbanquets.in/twitter-img.png'
        }
        />
        <meta name="twitter:site" content="@yourtwitterhandle" />
      </Head>
      {props.result.tag === "venues" ? (
        <>
          <VenueListPage data={{ ...props, localities }} />
          {props.result.meta?.faq && (
            <Faqs faqs={props.result.meta?.faq} name={`${props.category} in ${props.city}`} />
          )}
          <FooterKeyword city={props?.city} locality={props?.locality} category={props.category} />
          {props.locality === "all" && (
            <FooterLocalities city={props.city} category={props.category} localities={props.localities?.data} />
          )}
          <FooterRelatedSearch city={props?.city} locality={props?.locality} />
        </>
      ) : (
        <>
          <VendorListPage data={{ ...props, localities }} />
          <FooterVendors />
        </>
      )}
      <CityVenueHall cities={props.result.cities} />
    </>
  );
}

export async function getServerSideProps({ query, req, res }) {
  try {
    const { category, city, locality } = query;
    const {
      guest,
      per_plate,
      per_budget,
      multi_localities,
      search_value,
      makeup_bridal_budget,
      makeup_occasion,
      photographer_service,
      photographer_service_budget,
      mehndi_package_budget,
      banquet_decor_package_budget,
      home_decor_package_budget,
      band_baja_ghodiwala_budget,
      photographer_occation,
      makeup_service,
      experience,
      events_completed,
      days
    } = query;

    const filterQuery = {
      guest: guest || "",
      per_plate: per_plate || "",
      per_budget: per_budget || "",
      multi_localities: multi_localities || "",
      search_value: search_value || "",
      locality: locality || "",
      makeup_service: makeup_service || "",
      makeup_bridal_budget: makeup_bridal_budget || "",
      makeup_occasion: makeup_occasion || "",
      photographer_service: photographer_service || "",
      photographer_service_budget: photographer_service_budget || "",
      mehndi_package_budget: mehndi_package_budget || "",
      banquet_decor_package_budget: banquet_decor_package_budget || "",
      home_decor_package_budget: home_decor_package_budget || "",
      band_baja_ghodiwala_budget: band_baja_ghodiwala_budget || "",
      photographer_occation: photographer_occation || "",
      experience: experience || "",
      events_completed: events_completed || "",
      days: days || ""
    };

    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}?guest=${filterQuery.guest}&per_plate=${filterQuery.per_plate}&per_budget=${filterQuery.per_budget}&multi_localities=${filterQuery.multi_localities}&search_value=${filterQuery.search_value}&locality=${filterQuery.locality}&makeup_service=${filterQuery.makeup_service}&makeup_bridal_budget=${filterQuery.makeup_bridal_budget}&makeup_occasion=${filterQuery.makeup_occasion}&photographer_service=${filterQuery.photographer_service}&photographer_service_budget=${filterQuery.photographer_service_budget}&mehndi_package_budget=${filterQuery.mehndi_package_budget}&banquet_decor_package_budget=${filterQuery.banquet_decor_package_budget}&home_decor_package_budget=${filterQuery.home_decor_package_budget}&band_baja_ghodiwala_budget=${filterQuery.band_baja_ghodiwala_budget}&photographer_occation=${filterQuery.photographer_occation}&experience=${filterQuery.experience}&events_completed=${filterQuery.events_completed}&days=${filterQuery.days}`;
    const getlocalitiesURL = `${process.env.SERVER_DOMAIN}/api/locations/${city}`;

    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    };

    const result = await fetchData(url);
    const localities = await fetchData(getlocalitiesURL);

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
    console.error("Error from listing page:", error);
    return {
      notFound: true,
    };
  }
}

export default Venue;
