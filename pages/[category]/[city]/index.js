import VendorDetailsPage from "@/components/vendor/vendordetailspage/VendorDetailsPage";
import VenueDetailsPage from "@/components/venue/venuedetailspage/VenueDetailsPage";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page({ response }) {
  const router = useRouter();

  if (response.tag === 'venue') {
   
    return (
      <>
        <Head>
          <title>{response.data.venue.meta_title}</title>
          <meta name="description" content={response.data.venue.meta_description} />
          <meta name="keywords" content={response.data.venue.meta_keywords} />
          <meta
            name="og:image"
            content={
              response.data.venue && response.data.venue.images
                ? `${process.env.MEDIA_PREFIX}/${response.data.venue.images.split(',')[0]}`
                : 'https://weddingbanquets.in/twitter-img.png'
            }
          />
          <meta property="og:title" content={response.data.venue.meta_title} />
          <meta property="og:description" content={response.data.venue.meta_description} />
          <meta property="og:url" content={`https://weddingbanquets.in${router.asPath}`} />
        </Head>
        <VenueDetailsPage response={response} />
      </>
    )
  }
  else {
    
    return (
      <>
        <Head>
          <title>{response.data.vendor.meta_title}</title>
          <meta name="description" content={response.data.vendor.meta_description} />
          <meta name="keywords" content={response.data.vendor.meta_keywords} />
          <meta
            name="og:image"
            content={
              response.data.vendor && response.data.vendor.images
                ? `${process.env.MEDIA_PREFIX}/${response.data.vendor.images.split(',')[0]}`
                : 'https://weddingbanquets.in/twitter-img.png'
            }
          />
          <meta property="og:title" content={response.data.vendor.meta_title} />
          <meta property="og:description" content={response.data.vendor.meta_description} />
          <meta property="og:url" content={`https://weddingbanquets.in${router.asPath}`} />
        </Head>
        <VendorDetailsPage response={response} />
      </>
    )
  }
}

export async function getServerSideProps({ query, req, res }) {
  try {
    const { category: city, city: slug } = query;
    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_details/${slug}`;
    let response = await fetch(url);
    response = await response.json();

    if (!response || !response.success || !response.city || !response.data) {
      return { notFound: true };
    }
    if (response.city.slug !== city) {
      return {
        redirect: {
          permanent: true,
          destination: `/${response.city.slug}/${slug}`,
        },
      };
    }
    // console.log(response.is_redirect)
    if(response.is_redirect == 1){
      return {
        redirect: {
          permanent: true,
          destination: `/${response.redirect_url}`,
        },
      };
    }

    return { props: { response } };
  } catch (error) {
    return { notFound: true };
  }
}
