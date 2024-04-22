import VendorDetailsPage from "@/components/vendor/vendordetailspage/VendorDetailsPage";
import VenueDetailsPage from "@/components/venue/venuedetailspage/VenueDetailsPage";
import Head from "next/head";

export default function Page({ response }) {
  if (response.tag === 'venue') {
    const jsonLdData = {
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
            "@id": `https://weddingbanquets.in/${response.city.slug}`,
            "name": response.city.name
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": { "name": response.data.venue.name }
        }
      ]
    };
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          />
        </Head>
        <VenueDetailsPage response={response} />
      </>
    )
  }
  else {
    const jsonLdData = {
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
            "@id": `https://weddingbanquets.in/${response.city.slug}`,
            "name": response.city.name
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": { "name": response.data.vendor.brand_name }
        }
      ]
    };
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          />
        </Head>
        <VendorDetailsPage response={response} />
      </>
    )
  }
}

export async function getServerSideProps({ query, req, res }) {

  try {
    const { category: city, city: slug } = query;

    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_details/${slug}`
    let response = await fetch(url);
    response = await response.json();
    if (!response.success) {
      return ({
        notFound: true,
      })
    }
    if (response.city.slug !== city) {
      return {
        redirect: {
          permanent: true,
          destination: `/${response.city.slug}/${slug}`,
        },
      };
    }
    return ({
      props: {
        response: response || null
      }
    })
  } catch (error) {
    console.log("some error occur featching the data" + error)
    return ({
      notFound: true,
    })
  }
}