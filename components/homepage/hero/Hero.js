import styled from "styled-components";
import Image from "next/image";
import SearchBar from "@/components/miscellaneous/Searchbar";
import Offer from "@/components/miscellaneous/Offer";
import SearchBar3 from "@/components/miscellaneous/SearchBar3";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";

function Hero({ vendor_list, venue_list, venueCategogies, cities }) {
  let venueObject = [];
  let vendorObject = [];
  // console.log(cities);
  const { vendorCategories, selectedCity } = useGlobalContext();
  let venueNames = venueCategogies.map((category) => category.name);
  let cityNames = cities.map((city) => city.name);
  let vendorNames = vendorCategories.map((category) => category.name);
  let vendorBrandNames = vendor_list.map((category) => category.brand_name);
  let allVenues = venue_list.map((category) => category.name);
  let allVenuesSlug = venue_list.map((category) => category.slug);
  let allVendorsSlug = vendor_list.map((category) => category.slug);
  const [backgroundImage, setBackgroundImage] = useState("");
  const suggestions = [
    ...venueNames,
    ...vendorNames,
    ...vendorBrandNames,
    ...allVenues,
  ];
  for (let i = 0; i < allVenues.length; i++) {
    let obj = {};
    obj[allVenues[i]] = allVenuesSlug[i];
    venueObject.push(obj);
  }
  for (let i = 0; i < vendorBrandNames.length; i++) {
    let obj = {};
    obj[vendorBrandNames[i]] = allVendorsSlug[i];
    vendorObject.push(obj);
  }
  useEffect(() => {
    const cityImagePath = `/banner/${selectedCity.toLowerCase()}.png`;

    // Define an asynchronous function to check if the image exists
    async function checkImageExists(url) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
      } catch (error) {
        return false;
      }
    }

    // Call the asynchronous function and set the state based on the result
    checkImageExists(cityImagePath).then((imageExists) => {
      const backgroundImage = imageExists
        ? cityImagePath
        : "/banner/banner.png";
      setBackgroundImage(backgroundImage);
    });
  }, [selectedCity, setBackgroundImage]);
  return (
    <Section className="section-hero">
      <div className="hero-container">
        <Image
          src={backgroundImage}
          alt="An example image"
          fill={true}
          priority={true} //Remove Lazy Loading
          quality={100}
          sizes="(100vw)"
        />
        <div className="hero-title-container">
          {/* <h1 className="title">10,000 + Venues & Vendors Get Everything You Need Here!</h1> */}
          <h1 className="title">Weddings are for Life</h1>
          <h1 className="title"> Make it Larger than Life!</h1>
          <p className="description">
            Explore over 10,000+ Venues and Vendors with reviews, pricing and
            more.
          </p>
        </div>

        {/* <SearchBar
          venueCategogies={venueCategogies}
          vendorCategories={vendorCategories}
          cities={cities}
        /> */}
        <SearchBar3
          suggestions={suggestions}
          selectedCity={selectedCity}
          vendorBrandNames={vendorBrandNames}
          allVenues={allVenues}
          allVenuesSlug={allVenuesSlug}
          venueObject={venueObject}
          vendorObject={vendorObject}
        />
      </div>

      <Offer />
    </Section>
  );
}

export default Hero;

const Section = styled.section`
  width: 100%;
  /* border: 5px solid black; */
  height: auto;

  .hero-container {
    position: relative;
    width: 100%;
    height: 85vh;
    /* height: 600px; */

    .hero-title-container {
      /* border: 1px solid red; */
      position: absolute;
      top: 40%;
      right: 50%;
      transform: translate(50%, -50%);
      min-width: 70rem;
      /* padding: 0rem 1rem; */

      h1 {
        text-align: center;
        /* font-style: italic; */
        color: white;
        font-size: 4rem;
        font-family: "Montserrat";
      }
      p {
        text-align: center;
        color: white;
        /* color: var(--secoundary-color); */
        font-size: 2rem;
        font-weight: 500;
        margin-top: 1rem;
        font-family: "Montserrat";
      }
    }
  }

  @media (max-width: 800px) {
    .hero-container {
      position: relative;
      width: 100%;
      height: 450px;
    }
  }

  @media (max-width: 550px) {
    .hero-container {
      position: relative;
      width: 100%;
      height: 350px;
    }

    .hero-title-container {
      position: absolute;
      top: 40%;
      right: 50%;
      transform: translate(50%, -50%);
      min-width: 90% !important;

      h1 {
        font-size: 2.5rem !important;
      }
      P {
        font-size: 1.8rem !important;
        padding: 0.5rem 1rem;
      }
    }
  }
`;
