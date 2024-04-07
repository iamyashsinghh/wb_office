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
import { query } from "@/utils/db";
// import VendorGrid from "@/components/miscellaneous/vendorcategoryslider/VendorGrid";
// import FooterVendors from "@/components/miscellaneous/footer/FooterVendors";
// import dynamic from "next/dynamic";
// import Script from "next/script";
// import Gallary from "@/components/homepage/gallary/Gallary";
// const HowItWorks = dynamic(import("../components/homepage/howitwork/HowItWorks"))
// import Testimonial from "@/components/homepage/testimonial/Testimonial";

export default function Home({
  venueCategogies,
  cities,
  popularVenues,
  blogposts,
  vendorCategories,
  vendor_list,
  venue_list
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </Head>

      <Navbar/>
      <Hero
        venueCategogies={venueCategogies}
        vendorCategories={vendorCategories}
        vendor_list={vendor_list}
        venue_list={venue_list}
        cities={cities}
      />
      <VendorSlider vendorCategories={vendorCategories} />
      <PopularVenue popularVenues={popularVenues} />
      <HowItWorks />
      <LeadForm />
      <Blog posts={blogposts} />
      {/* <Gallary /> */}
      {/* <Testimonial /> */}
      <WhyUs />
      <Contact />
      <VendorCategoryCardGrid />
      {/* <FooterVendors/> */}
      <CityVenueHall cities={cities} />
      {/* <LeadModel/> */}
    </div>
  );
}

export async function getStaticProps() {
  try {
    //Fetch Blog Post
    // let homePageData = await fetch("http://192.168.29.128/wedding_benquets/website/api/home_page/");

    const url = `${process.env.SERVER_DOMAIN}/api/home_page/`;

    // const headers = { 'Authorization': process.env.SECRATE_TOKEN };
    // console.log(url)

    let homePageData = await fetch(url);

    homePageData = await homePageData.json();
    // console.log(homePageData)

    const url2 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_vendor`;
    let vendor_list = await fetch(url2);
    vendor_list = await vendor_list.json();

    const url3 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_venue`;
    let venue_list = await fetch(url3);
    venue_list = await venue_list.json();

    const url4 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/state_management`;
    let context_data = await fetch(url4);
    context_data = await context_data.json();

    let blogposts;
    try {
      const sql = `select wp_posts.ID, wp_posts.post_title, wp_posts.post_name as
      post_slug, DATE_FORMAT(wp_posts.post_date, '%Y-%m-%d %T.%f') as post_date, (select for_image.guid from wp_posts as
      for_image where for_image.post_parent = wp_posts.ID and for_image.post_type =
      "attachment" limit 1) as post_thumbnail from wp_posts where
      (wp_posts.post_type = 'post' and wp_posts.post_status = 'publish') order by
      wp_posts.ID desc limit 3`;

      blogposts = await query(sql);
      console.log("Blog data fetched");
    } catch (error) {
      console.log("Blog data not fetched");
      blogposts = [];
    }

    return {
      props: {
        venueCategogies: homePageData.data.venue_categories || null,
        vendorCategories: homePageData.data.vendor_categories || null,
        vendor_list: vendor_list || null,
        venue_list: venue_list || null,
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
