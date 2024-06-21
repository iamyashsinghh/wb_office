import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/context/MyContext';

const CityVenueHall = dynamic(() => import('@/components/miscellaneous/footer/CityVenueHall'));
const FooterVendors = dynamic(() => import('@/components/miscellaneous/footer/FooterVendors'));
const VendorListPage = dynamic(() => import('@/components/vendor/vendorlistpage/VendorListPage'));
const VenueListPage = dynamic(() => import('@/components/venue/venuelistpage/VenueListPage'));
const FooterLocalities = dynamic(() => import('@/components/miscellaneous/footer/FooterLocalites'));
const FooterRelatedSearch = dynamic(() => import('@/components/miscellaneous/footer/FooterRelatedSearch'));
const FooterKeyword = dynamic(() => import('@/components/miscellaneous/footer/FooterKeyword'));
const Faqs = dynamic(() => import('@/components/venue/venuedetailspage/faqs/Faqs'));

function Venue(props) {
  const { setSelectedCity, localities } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (props.city) {
      setSelectedCity(props.city);
    }
  }, [props.city]);

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

  return (
    <>
      <Head>
        <title>{props.result.meta?.meta_title}</title>
        <meta name="description" content={props.result.meta?.meta_description} />
        <meta name="keywords" content={props.result.meta?.meta_keywords} />
        <meta
          name="og:image"
          content={
            props.result && props.result.data && props.result.data.length > 0 && props.result.data[0].images
              ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${props.result.data[0].images.split(',')[0]}`
              : 'https://weddingbanquets.in/twitter-img.png'
          }
        />
        <meta property="og:title" content={props.result.meta?.meta_title} />
        <meta property="og:description" content={props.result.meta?.meta_description} />
        <meta property="og:url" content={`https://weddingbanquets.in/${router.asPath}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData2) }} />
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
    const { guest, per_plate, per_budget, multi_localities, serch_value } = query;

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
