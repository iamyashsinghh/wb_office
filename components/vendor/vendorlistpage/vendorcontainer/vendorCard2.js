import styled, { keyframes } from "styled-components";
import { useMemo, useState } from "react";
import { IoLogoWhatsapp, IoIosCall } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Thumbs, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "@/components/miscellaneous/Assured";
import { useGlobalContext } from "@/context/MyContext";
import Head from "next/head";
import RatingCardDynamic from "@/components/miscellaneous/RatingCardDynamic";
import { BsFillSuitcaseLgFill } from "react-icons/bs";

function VenueCard2({
  vendor,
  city,
  openLeadModel,
  locality,
  category,
  callConversion,
  index,
}) {
  const images = vendor.images?.split(",");
  const { selectedCity } = useGlobalContext();

  function removeHTMLTags(text = "") {
    return text.replace(/<.*?>/g, "");
  }

  async function handleAnchorClick(e, slug) {
    e.stopPropagation();
    await CallingRequest(slug);
  }

  function shareViaWhatsApp(e) {
    const venueUrl = `https://weddingbanquets.in/${selectedCity}/${vendor.slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918882198989&text=${encodeURIComponent(
      venueUrl
    )}`;
    window.open(whatsappUrl, "_blank");
    e.stopPropagation();
  }

  const vendor_summary = useMemo(() => {
    return removeHTMLTags((vendor && vendor["summary"]) || "");
  }, [vendor]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const router = useRouter();

  // const categoryValues = vendor.venue_category_ids;
  // const mapCategoryNames = (categoryValues) => {
  //   return categoryValues.split(',').map(category => category.trim());
  // };

  // const categories = mapCategoryNames(categoryValues)
  return (
    <Wrapper>
      <div className="image-slider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          pagination={{ dynamicBullets: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs, Pagination, Autoplay]}
          className="mySwiper2"
          onClick={() => {
            router.push(`/${city}/${vendor?.slug}`);
          }}
        >
          {images?.slice(0, 4).map((image, index) => (
            <SwiperSlide key={index} className="image-container">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                fill
                sizes="(100vw)"
                quality={100}
                title={locality === "all" ? `${category.replaceAll( "-", " ")} in ${city.replaceAll("-", " ")}` : `${category.replaceAll( "-", " ")} in ${locality.replaceAll("-", " ")}`}
                alt={locality === "all" ? `${category.replaceAll( "-", " ")} in ${city.replaceAll("-", " ")}` : `${category.replaceAll( "-", " ")} in ${locality.replaceAll("-", " ")}`}
              />
            </SwiperSlide>
          ))}

          <div className="rate">
            <RatingCardDynamic
              rating={vendor?.place_rating}
              ratingcount={vendor?.reviews_count}
              slug={vendor?.slug}
            />
          </div>
          {vendor?.wb_assured && <Assured />}
        </Swiper>

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
          {images?.slice(0, 4).map((image, index) => (
            <SwiperSlide key={index} className="image-container">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                fill
                sizes="(100vw)"
                quality={100}
                title={locality === "all" ? `${category.replaceAll( "-", " ")} in ${city.replaceAll("-", " ")}` : `${category.replaceAll( "-", " ")} in ${locality.replaceAll("-", " ")}`}
                alt={locality === "all" ? `${category.replaceAll( "-", " ")} in ${city.replaceAll("-", " ")}` : `${category.replaceAll( "-", " ")} in ${locality.replaceAll("-", " ")}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="content"
        onClick={() => {
          router.push(`/${city}/${vendor?.slug}`);
        }}
      >
        <div className="venue-basic-info">
          <div className="name-address">
            <h2 className="venue-name">{vendor?.brand_name}</h2>
            <address>{vendor?.vendor_address}</address>
          </div>
          <div className="phone">
            <div className="" onClick={(e) => shareViaWhatsApp(e)}>
              <div className="whatsapp-btn">
                <IoLogoWhatsapp className="whatsapp-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="venue-aditional-info">
          <div className="location detail-circle">
            <IoLocationSharp className="icon" />
            <p>{`${vendor?.get_locality.name} , ${vendor?.get_city.name}`}</p>
          </div>
          <div className="guests detail-circle">
            <BsFillSuitcaseLgFill className="icon" />
            <p>
              Exp.{" "}
              {`${vendor?.yrs_exp != undefined &&
                vendor?.yrs_exp != null &&
                vendor?.yrs_exp != 0
                ? vendor.yrs_exp
                : "5+"
                } Yr's`}
            </p>
          </div>
        </div>
        <p className="venue-description">
          {`${vendor_summary?.slice(0, 100)} `}
          <span className="read-more-btn">read more...</span>
        </p>
        <div className="venue-category">
          {vendor['air_brush_makeup_price'] && (
            <div className="category">
              <p>Air Brush Makeup</p>
            </div>
          )}
          {vendor['hd_bridal_makeup_price'] && (
            <div className="category">
              <p>HD Bridal Makeup</p>
            </div>
          )}
          {vendor['engagement_makeup_price'] && (
            <div className="category">
              <p>Engagement Makeup</p>
            </div>
          )}
          {vendor['party_makeup_price'] && (
            <div className="category">
              <p>Party Makeup</p>
            </div>
          )}
          {vendor['cinematography_price'] && (
            <div className="category">
              <p>Cinematography</p>
            </div>
          )}
          {vendor['candid_photography_price'] && (
            <div className="category">
              <p>Candid Photography</p>
            </div>
          )}
          {vendor['traditional_photography_price'] && (
            <div className="category">
              <p>Traditional Photography</p>
            </div>
          )}
          {vendor['traditional_video_price'] && (
            <div className="category">
              <p>Traditional Videography</p>
            </div>
          )}
          {vendor['pre_wedding_photoshoot_price'] && (
            <div className="category">
              <p>Pre Wedding Photoshoot</p>
            </div>
          )}
          {vendor['albums_price'] && (
            <div className="category">
              <p>Albums Price</p>
            </div>
          )}
          {vendor['engagement_mehndi_price'] && (
            <div className="category">
              <p>Engagement Mehndi</p>
            </div>
          )}
          {vendor['bridal_mehndi_price'] && (
            <div className="category">
              <p>Bridal Mehndi</p>
            </div>
          )}
        </div>
        <div className="d-flex">
          <div className="price-contianer">
            <div className="veg-price">
              <p>
                Package Price:{" "}
                <span className="price">
                  {vendor?.package_price ? (
                    <del>₹ {vendor.package_price}</del>
                  ) : (
                    "On Demand"
                  )}
                </span>
              </p>
            </div>
            <div className="price-second">
              <p>
                Event Completed:
                <span className="price">
                  &nbsp;
                  {`${vendor?.event_completed != undefined &&
                    vendor?.event_completed != null &&
                    vendor?.event_completed != 0
                    ? vendor.event_completed
                    : 150
                    }+`}
                </span>
              </p>
            </div>
          </div>
          <div className="cts-contianer">
            <div className="action-btns">
              <button
                className="venue-card-btn phone"
                onClick={(e) => {
                  openLeadModel(e, vendor?.slug, vendor?.id);
                  e.stopPropagation();
                }}
              >
                See Best
                <br /> Prices
              </button>
              <button
                className="venue-card-btn pc"
                onClick={(e) => {
                  openLeadModel(e, vendor?.slug, vendor?.id);
                  e.stopPropagation();
                }}
              >
                See Best Prices
              </button>
              <a
                className="call-us-btn"
                href={`tel:0${vendor.phone}`}
                onClick={(e) => {
                  handleAnchorClick(e, vendor.slug);
                  callConversion(e, vendor.slug, vendor.id);
                }}
                aria-label="call icon"
              >
                <div className="">
                  <IoIosCall className="phone-icon" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default memo(VenueCard2);

const ringingAnimationn = keyframes`
    0% {
      box-shadow: 0 4px 10px rgba(23, 196, 52, 0.2), 0 0 0 0 rgba(23, 196, 52, 0.2), 0 0 0 5px rgba(23, 196, 52, 0.2), 0 0 0 0px rgba(23, 196, 52, 0.2); }
    100% {
      box-shadow: 0 4px 10px rgba(23, 196, 52, 0.2), 0 0 0 5px rgba(23, 196, 52, 0.2); } 
      }
`;
const ringingAnimation = keyframes`
 0% {
    transform: rotateY(-25deg);
  }
  25% {
    transform: rotateX(-25deg);
  }
  50% {
    transform: rotateY(-25deg);
  }
  75% {
    transform: rotateX(-25deg);
  }
  100% {
    transform: rotateY(-25deg);
  }
`;

const Wrapper = styled.div`
  .whatsapp-icon {
    font-size: 2.5rem;
    color: #fff;
  }
  .phone-icon {
    cursor: pointer;
    color: white;
    font-size: 3.5rem;
    animation: ${ringingAnimation} 1s ease-in-out infinite;
  }
  .phone {
    border: 1px solid var(--phone);
    background-color: var(--phone);
    color: white;
    padding: 0.7rem 1.8rem;
    text-transform: uppercase;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s linear;
    outline: none;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .venue-card-btn {
    border: none;
    white-space: nowrap;
    background: none;
    width: 100%;
    border: 1px solid #f33232;
    padding: 0.5rem 1.2rem;
    text-transform: uppercase;
    border-radius: 0.5rem;

    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s linear;
    background: #f33232;
    color: white;
  }

  .call-us-btn {
    border: none;
    white-space: nowrap;
    background: none;
    width: 100%;
    border: 1px solid var(--phone);
    padding: 0.5rem 1.2rem;
    text-transform: uppercase;
    border-radius: 0.5rem;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s linear;
    background: var(--phone);
    color: white;
    animation: ${ringingAnimationn} 1s ease-in-out infinite;
  }

  .action-btns {
    display: flex;
    gap: 1rem;
    .phone {
      display: none;
    }
  }

  .price-contianer {
    flex: 1;
    display: flex;
    flex-direction: column;

    .price-second,
    .veg-price {
      align-items: center;
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
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .cts-contianer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  border: 8px solid #f2f2f2;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1rem;
  gap: 1rem;

  .image-slider {
    position: relative;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      .name-address {
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
          color: var(--para);
          max-width: 400px;
          font-family: "Poppins";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .venue-category {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .category {
        display: flex;
        gap: 3px;
        align-items: center;
        padding: 3px 7px;
        border-radius: 5px;
        color: var(--para);
        background-color: #f1f5fa;
        p {
          font-family: "Poppins";
          font-size: 1.5rem;
        }
      }
    }
    .venue-aditional-info {
      display: flex;
      flex-wrap: wrap;
      .location {
        margin: 0 20px 0 0;
        p,
        .icon {
          color: var(--info-color);
        }
      }
      .detail-circle {
        display: flex;
        gap: 3px;
        align-items: center;
        padding: 3px 7px;
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
    .action-btns {
      display: flex;
      gap: 1rem;
      .phone {
        display: block;
      }
      .pc {
        display: none;
      }
    }
  }

  @media (max-width: 450px) {
    max-width: 100%;
  }
`;
