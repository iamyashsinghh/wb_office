// This page is  for old URL.
// If the url is the slug of city then it will be redirect to the home page of that city.
// If the url is the slug of old website the it will redirect to the coressponding page, using the magic box.

import Blog from "@/components/homepage/blog/Blog";
import Contact from "@/components/homepage/contactUs/Contact";
import Hero from "@/components/homepage/hero/Hero";
import HowItWorks from "@/components/homepage/howitwork/HowItWorks";
import Navbar from "@/components/layout.js/Navbar";
import PopularVenue from "@/components/miscellaneous/popular venue/PopularVenue";
import VendorSlider from "@/components/miscellaneous/vendorcategoryslider/VendorSlider";
import WhyUs from "@/components/homepage/whyus/WhyUs";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/MyContext";
import LeadForm from "@/components/homepage/leadform/LeadForm";
import CityVenueHall from "@/components/miscellaneous/footer/CityVenueHall";
import iscity from "@/lib/request/iscity/isCity";
import VendorCategoryCardGrid from "@/components/miscellaneous/vendorcategorycardgrid/VendorCategoryCardGrid";
import { query } from "@/utils/db";

export default function Home({
  venueCategogies,
  cities,
  popularVenues,
  blogposts,
  vendorCategories,
  vendor_list,
  venue_list,
  city,
}) {
  const { setSelectedCity } = useGlobalContext();

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  // City name is comming from the dynamic router (params). We are setting in the global context
  return (
    <div>
      <Navbar />
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
      <WhyUs />
      <Contact />
      <VendorCategoryCardGrid />
      <CityVenueHall cities={cities} />
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { category: slug } = params;

  //Checking if the url is city or not, iscity is the method which takes city slug and return boolean value accordingly.
  if (await iscity(slug)) {
    // console.log("City is " + slug)
    // console.log( await iscity(slug))
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
  } else {
    //This is magix box which redirect the old url to the new url with its coressponding page.

    let url = slug?.split("-in-");

    //It means its a listing page url
    if (url.length === 2) {
      if (url[1] === "delhi") {
        url[1] = "all";
      }

      return {
        redirect: {
          permanent: true, //This is permanent reirection 301. setting this permanent means telling the google that we have moved our old url to new url permanet and our old url is no more valid.
          destination: `/${url[0]}/delhi/${url[1]}`,
        },
        props: {
          status: 1,
        },
      };
    } else if (url.length === 1) {
      //It means its a details page url

      return {
        redirect: {
          permanent: true,
          destination: `/delhi/${url[0]}`,
        },
      };
    } else {
      return {
        notFound,
      };
    }
  }
}
