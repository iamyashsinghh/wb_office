import styled from "styled-components";
import Image from "next/image";
import Offer from "@/components/miscellaneous/Offer";
import SearchBar3 from "@/components/miscellaneous/SearchBar3";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import Head from "next/head";

function Hero({ venueCategogies, cities }) {
  let venueObject = [];
  let vendorObject = [];

  const { venue_list, vendor_list, vendorCategories, selectedCity } = useGlobalContext();
  let venueNames = venueCategogies.map((category) => category.name);
  let vendorNames = vendorCategories.map((category) => category.name);
  let vendorBrandNames = vendor_list.map((category) => category.brand_name);
  let allVenues = venue_list.map((category) => category.name);
  let allVenuesSlug = venue_list.map((category) => category.slug);
  let allVendorsSlug = vendor_list.map((category) => category.slug);
  
  const [backgroundImage, setBackgroundImage] = useState("/banner/delhi.avif");

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
    const cityImagePath = `/banner/${selectedCity.toLowerCase()}.avif`;

    async function checkImageExists(url) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
      } catch (error) {
        return false;
      }
    }

    checkImageExists(cityImagePath).then((imageExists) => {
      const backgroundImage = imageExists
        ? cityImagePath
        : "/banner/delhi.avif";
      setBackgroundImage(backgroundImage);
    });
  }, [selectedCity, setBackgroundImage]);

  return (
    <Section className="section-hero">
      <div className="hero-container">
        <Image
          src={backgroundImage}
          alt="Wedding Banquets, Banquet halls, Wedding Venues"
          fill={true}
          priority={true} 
          quality={100}
          sizes="(100vw)"
        />
        <div className="overlay"></div>
        <div className="hero-title-container">
          <h1 className="title">Weddings are for Life
          <br /> Make it Larger than Life!</h1>
          <p className="description">
            Explore over 50,000+ Venues and Vendors with reviews, pricing and
            more.
          </p>
        </div>
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
  height: auto;

  .hero-container {
    position: relative;
    width: 100%;
    height: 85vh;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%);
    }

    .hero-title-container {
      position: absolute;
      top: 40%;
      right: 50%;
      transform: translate(50%, -50%);
      min-width: 70rem;

      h1 {
        text-align: center;
        color: white;
        font-size: 4rem;
        font-family: "Montserrat";
      }
      p {
        text-align: center;
        color: white;
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
