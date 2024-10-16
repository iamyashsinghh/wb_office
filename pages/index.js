import Blog from "@/components/homepage/blog/Blog";
import Contact from "@/components/homepage/contactUs/Contact";
import Hero from "@/components/homepage/hero/Hero";
import HowItWorks from "@/components/homepage/howitwork/HowItWorks";
import Navbar from "@/components/layout.js/Navbar";
import PopularVenue from "@/components/miscellaneous/popular venue/PopularVenue";
import VendorSlider from "@/components/miscellaneous/vendorcategoryslider/VendorSlider";
import WhyUs from "@/components/homepage/whyus/WhyUs";
import LeadForm from "@/components/homepage/leadform/LeadForm";
import CityVenueHall from "@/components/miscellaneous/footer/CityVenueHall";
import VendorCategoryCardGrid from "@/components/miscellaneous/vendorcategorycardgrid/VendorCategoryCardGrid";
import Head from "next/head";
export default function Home({
  venueCategogies,
  cities,
  popularVenues,
  blogposts,
  vendorCategories,
}) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: "https://weddingbanquets.in/banquet-halls/delhi/all",
        name: "Banquet Halls",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://weddingbanquets.in/party-halls/delhi/all",
        name: "Party Halls",
      },
      {
        "@type": "ListItem",
        position: 3,
        url: "https://weddingbanquets.in/marriage-gardens/delhi/all",
        name: "Marriage Gardens",
      },
      {
        "@type": "ListItem",
        position: 4,
        url: "https://weddingbanquets.in/top-makeup-artists/delhi/all",
        name: "Makeup Artists",
      },
      {
        "@type": "ListItem",
        position: 5,
        url: "https://weddingbanquets.in/best-wedding-photographers/delhi/all",
        name: "Photographers",
      },
      {
        "@type": "ListItem",
        position: 6,
        url: "https://weddingbanquets.in/best-mehndi-artists/delhi/all",
        name: "Mehndi Artists",
      },
    ],
  };

  return (
    <div>
      <Head>
        <link rel="canonical" href="https://weddingbanquets.in" />
        <meta name="og:image" content="https://weddingbanquets.in/twitter-img.png" />
        <meta property="og:title" content="Best Banquet Halls And Wedding Venues at 40% Discount" />
        <meta property="og:description" content="Wedding Banquet To Plan Your Wedding And Make Sure It is a Memorable Occasion. Look Over 10000+ Indian Wedding Venues For Corporate Events, Weddings And Parties" />
        <meta property="og:url" content="https://weddingbanquets.in" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}></script>
      </Head>
      <Navbar />
      <Hero
        venueCategogies={venueCategogies}
        vendorCategories={vendorCategories}
        cities={cities}
      />
      <VendorSlider vendorCategories={vendorCategories} />
      <PopularVenue popularVenues={popularVenues} />
      <HowItWorks />
      <LeadForm />
      <Blog posts={blogposts} />
      <WhyUs />
      <Contact />
      <VendorCategoryCardGrid />
      <CityVenueHall cities={cities} />
    </div>
  );
}

export async function getStaticProps() {
  try {

    const url = `${process.env.SERVER_DOMAIN}/api/home_page/`;
    let homePageData = await fetch(url);
    homePageData = await homePageData.json();

    let  blogposts = [];

    return {
      props: {
        venueCategogies: homePageData.data.venue_categories || null,
        vendorCategories: homePageData.data.vendor_categories || null,
        cities: homePageData.data.cities || null,
        popularVenues: homePageData.data.popular_venues || null,
        blogposts: blogposts || null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
