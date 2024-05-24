import styled from "styled-components";
import { useMemo, useState } from "react";
import { IoIosPeople, IoLogoWhatsapp } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { useRouter } from "next/router";
import Veg from "@/components/miscellaneous/Veg";
import { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCall } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Thumbs, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "@/components/miscellaneous/Assured";
import { useGlobalContext } from "@/context/MyContext";
import Head from "next/head";
import RatingCardDynamic from "@/components/miscellaneous/RatingCardDynamic";

function VenueCard2({ venue, city, openLeadModel, locality, category, callConversion }) {
  const images = venue.images?.split(",");
  const { selectedCity } = useGlobalContext();

  // console.log("from venue card")

  // Remove the html tags
  function removeHTMLTags(text = "") {
    // console.log("Inside the funtion")
    return text.replace(/<.*?>/g, "");
  }

  async function handleAnchorClick(e, slug) {
    e.stopPropagation();
    await CallingRequest(slug);
  }

  function shareViaWhatsApp(e) {
    const venueUrl = `https://weddingbanquets.in/${selectedCity}/${venue.slug}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(venueUrl)}`;
    window.open(whatsappUrl, "_blank");
    e.stopPropagation();
  }

  // const venue_summary = removeHTMLTags(venue?.summary);
  const venue_summary = useMemo(() => {
    return removeHTMLTags((venue && venue["summary"]) || "");
  }, [venue]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const router = useRouter();

  return (
    <Wrapper>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weddingbanquets" />
        <meta name="twitter:url" content="https://weddingbanquets.in" />
        <meta
          name="twitter:description"
          content="Your one-stop shop for all of your wedding needs. Browse 1000+ party halls &amp; wedding banquets. Get budget-friendly photographers, mehndi artists, makeup artists, &amp; more..."
        />
        <meta
          name="twitter:image"
          content="https://weddingbanquets.in/twitter-img.png"
        />
      </Head>
      <div className="image-slider">
        {/* Top image thumbnail */}
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          pagination={
            {
              // dynamicBullets: true,
            }
          }
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, Pagination, Autoplay]}
          className="mySwiper2"
          onClick={() => {
            router.push(`/${city}/${venue?.slug}`);
          }}
        >
          {images?.slice(0, 4).map((image, index) => {
            return (
              <SwiperSlide key={index} className="image-container">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                  fill
                  sizes="(100vw)"
                  alt={locality === 'all' ? '' : `${category.replaceAll("-", " ")} in ${locality.replaceAll("-", " ")}`}
                />
              </SwiperSlide>
            );
          })}

          <div className="rate">
            <RatingCardDynamic rating={venue?.place_rating} ratingcount={venue?.reviews_count} slug={venue?.slug} />
          </div>

          {venue?.wb_assured && <Assured />}
        </Swiper>

        {/* //botton thumb Image slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={5}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper"
        >
          {images?.slice(0, 4).map((image, index) => {
            return (
              <SwiperSlide key={index} className="image-container">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                  fill
                  sizes="(100vw)"
                  alt={locality === 'all' ? '' : `${category} in ${locality}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div
        className="content"
        onClick={() => {
          router.push(`/${city}/${venue?.slug}`);
        }}
      >
        <div className="venue-basic-info">
          <div className="name-address">
            <h2 className="venue-name">{venue?.name}</h2>
            <address>{venue?.venue_address}</address>
          </div>
          <div className="phone">
            <div className="" onClick={(e) => shareViaWhatsApp(e)} >
              <div className="whatsapp-btn">
                <IoLogoWhatsapp className="whatsapp-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="venue-aditional-info">
          <div className="guests detail-circle">
            <IoIosPeople className="icon" />
            <p>{`${venue?.min_capacity}-${venue?.max_capacity} guest`}</p>
          </div>
        </div>
        <p className="venue-description">
          {`${venue_summary?.slice(0, 80)} `}
          <span className=" read-more-btn">read more...</span>
        </p>

        <div className="price-contianer">
          <div className="veg-price">
            <Veg color={"green"} />{" "}
            <p>
              Veg: <del className="price">₹{venue?.veg_price}</del>/Plate
            </p>
          </div>
          {/* This line will only the the non veg rate if availabe otherwise it show blank */}
          {venue?.nonveg_price != "0" && (
            <div className="nonveg-price">
              <Veg color={"red"} />{" "}
              <p>
                Non Veg: <del className="price">₹{venue?.nonveg_price}</del>
                /Plate
              </p>
            </div>
          )}
        </div>

        <div className="action-btns">
          {/* <button className="venue-card-btn" onClick={(e) => { setSelectedCard(venue.slug); setIsLeadsModelOpen(true); e.stopPropagation(); }}>GET QUOTATION</button> */}
          <button
            className="venue-card-btn"
            onClick={(e) => {
              openLeadModel(e, venue?.slug, venue?.id);
              e.stopPropagation();
            }}
          >
            GET QUOTATION
          </button>
          <a className=" call-us-btn share-btn"
            href={`tel:0${venue.phone}`}
            onClick={(e) => {
              handleAnchorClick(e, venue.slug);
              callConversion(e, venue.slug, venue.id);
            }}
            aria-label="call icon "
          >
              <div className="">
                <IoIosCall className="phone-icon" />
                <span>Call Us Now</span>
              </div>
          </a>
        </div>
      </div>
    </Wrapper>
  );
}
export default memo(VenueCard2);

const Wrapper = styled.div`
.whatsapp-icon{
  font-size: 2.5rem;
  color: #fff;
}
.phone-icon {
  cursor: pointer;
  color: white;
  margin-bottom: -4px;
  font-size: 2.1rem;
  margin-right: 5px;
}
.phone{
  border: 1px solid var(--phone);
  background-color: var(
    --phone
  ); 
  color: white;
  padding: 0.7rem 1.8rem;
  text-transform: uppercase;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s linear;
  outline: none;
}
.call-us-btn {
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(23, 196, 52, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(23, 196, 52, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(23, 196, 52, 0);
  }
}
  border: 8px solid #f2f2f2;
  /* border: 6px solid green; */
  display: grid;
  grid-template-columns: 3fr 6fr;
  padding: 1rem;
  //max-width: 110rem;
  /* max-height: 400px; */
  //margin: 0rem auto 1rem auto;
  gap: 1rem;

  .image-slider {
    position: relative;
    /* width: 100%; */
    height: 280px;
    z-index: 0;

    .mySwiper2 {
      position: relative;
      max-width: 35rem;
      margin-bottom: 2px;
      cursor: pointer;
      height: 80%;

      .rate {
        position: absolute;
        z-index: 1;
        bottom: 10px;
        left: 10px;
      }
    }
    .mySwiper {
      max-width: 35rem;
      height: 20%;
      cursor: pointer;
    }
    .image-container {
      position: relative;
    }
  }

  .content {
    /* border: 2px solid black; */
    padding: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .venue-basic-info {
      /* border: 1px solid blue; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      .name-address {
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .venue-name {
          font-size: 2.2rem;
          color: var(--primary-color);
          font-weight: 600;
          font-family: "Montserrat";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        address {
          font-size: 1.6rem;
          font-style: normal;
          font-weight: 500;
          /* color: var(--primary-color);
                */
          color: var(--para);
          max-width: 400px;
          /* border: 1px solid black; */
          font-family: "Poppins";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .venue-aditional-info {
      display: flex;
      flex-wrap: wrap;

      .detail-circle {
        display: flex;
        gap: 3px;
        align-items: center;
        /* border: 1px solid gray; */
        padding: 2px 5px;
        border-radius: 5px;
        color: var(--para);
        background-color: #f1f5fa;

        .icon {
          font-size: 2.2rem;
        }
        p {
          font-family: "Poppins";
          font-size: 1.5rem;
        }
      }
    }
    .venue-description {
      font-size: 1.6rem;
      color: var(--para);
      white-space: break-spaces;
      font-family: "Poppins";

      .read-more-btn {
        color: var(--info-color);
        cursor: pointer;
      }
    }
  }

  .price-contianer {
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    gap: 2rem;

    .nonveg-price,
    .veg-price {
      align-items: center;
      justify-content: center;
      display: flex;
      gap: 1rem;
    }
    p {
      color: var(--para);
      font-size: 1.5rem;
    }
    .price {
      color: black;
      font-family: "Poppins";
      font-size: 1.8rem;
      font-weight: 600;

      font-size: 2.2rem;
      font-family: "Montserrat";
      /* font-weight: bold; */
    }
  }

  .action-btns {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 4px;
    width: 100%;
    .venue-card-btn {
      border: none;
      white-space: nowrap;
      background: none;
      width: 50%;
      border: 1px solid #f33232;
      padding: 1rem 2.5rem;
      text-transform: uppercase;
      border-radius: 0.5rem;
      font-size: 1.8rem;
      cursor: pointer;
      transition: all 0.3s linear;
      background: #f33232;
      color: white;
    }
    .share-btn {
      border: 1px solid var(--phone);
      background-color: var(
        --phone
      ); 
      color: white;
      padding: 0.7rem 1.8rem;
      text-transform: uppercase;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s linear;
      outline: none;
      display: flex;
      font-size: 1.8rem;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 45%;

      &:hover {
        background-color: #128c7e; /* Darker shade of WhatsApp color */
        border-color: #128c7e; /* Darker shade of WhatsApp color */
      }
      .whatsapp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .share-icon {
        font-size: 2.5rem;
        margin-right: 0.5rem; /* Add margin to separate icon from text */
      }
    }

    .know-more {
      color: var(--info-color);
      font-size: 1.7rem;
      font-family: "Poppins";
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 850px) {
    .image-slider {
      height: 250px;

      .mySwiper2 {
        max-width: 30rem;
      }
      .mySwiper {
        max-width: 30rem;
      }
    }
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    display: grid;
    padding: 1rem;
    max-width: 45rem;
    .image-slider {
      max-width: 100%;
      height: 200px;
      overflow: hidden;

      .mySwiper2 {
        /* max-width: 40rem; */
        max-width: 100%;
        height: 100%;
      }
      .mySwiper {
        display: none;
      }
    }
    .whatsapp-btn {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 450px) {
    max-width: 100%;
  }
  
`;

