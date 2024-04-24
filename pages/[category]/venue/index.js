import Header from "@/components/layout.js/Header"
import FooterRelatedSearch from "@/components/miscellaneous/footer/FooterRelatedSearch"
import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription"
import PopularVenue from "@/components/miscellaneous/popular venue/PopularVenue"
import VenueCardGridPage from "@/components/miscellaneous/venue_vendor_page_cards/VenueCardGridPage"
import { useGlobalContext } from "@/context/MyContext"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"

function Venue({popularVenues, validCity, caption, metadata}) {
  const { selectedCity, setSelectedCity } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
     setSelectedCity(validCity.name);
  }, [validCity, setSelectedCity]);
  console.log(metadata);
  return (
    <>
    <Head>
    <title>{metadata?.meta_title}</title>
          <meta
            name="description"
            content={metadata?.meta_description}
          />
          <meta name="keywords" content={metadata?.meta_keywords} />
          <meta
            name="og:image"
            content={
              metadata && metadata.data && metadata.data.length > 0 && metadata.data[0].images
                ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${metadata.data[0].images.split(',')[0]}`
                : 'https://weddingbanquets.in/twitter-img.png'
            }
          />
          <meta property="og:title" content={metadata?.meta_title} />
          <meta
            property="og:description"
            content={metadata?.meta_description}
          />
          <meta
            property="og:url"
            content={`https://weddingbanquets.in${router.asPath}`}
          />
    </Head>
    <Header />
    <Wrapper>
      <VenueCardGridPage className="container" />
      <PopularVenue popularVenues={popularVenues} />
      <Pagedescription caption={caption} />
      <FooterRelatedSearch city={selectedCity} locality="all" />
    </Wrapper>
    </>
  )
}
export default Venue

export async function getServerSideProps({ params, req, res }) {
  const { category: slug } = params;
        try {
      const url = `${process.env.SERVER_DOMAIN}/api/home_page/`;
      let homePageData = await fetch(url);
      homePageData = await homePageData.json();
      const validCity = homePageData.data.cities.find(city => city.slug === slug);

      const url1 = `${process.env.SERVER_DOMAIN}/api/venues_vendor_page_data/${slug}/venue`;
      let listdata = await fetch(url1);
      listdata = await listdata.json();

      return {
        props: {
          venueCategogies: homePageData.data.venue_categories || null,
          vendorCategories: homePageData.data.vendor_categories || null,
          cities: homePageData.data.cities || null,
          popularVenues: homePageData.data.popular_venues || null,
          validCity,
          caption : listdata.data.caption,
          metadata : listdata.data,
        },
      };
    }catch{
    }
}

const Wrapper = styled.div`
// padding: 2rem 3rem;
h1{
font-weight:500;
font-size: 3rem;
}
`;

