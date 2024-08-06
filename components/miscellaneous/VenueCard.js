import styled from "styled-components";
import Image from "next/image";
import { IoIosCall } from "react-icons/io";
import Veg from "./Veg";
import { useRouter } from "next/router";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "./Assured";
import { memo } from "react";
import RatingCardDynamic from "./RatingCardDynamic";

function VenueCard({ venue, openLeadModel, callConversion, selectedCity }) {
  const image = venue.images?.split(",")[0];

  const router = useRouter();

  async function handleAnchorClick(e, slug) {
    e.stopPropagation();
    const response = await CallingRequest(slug);
  }

  return (
    <Wrapper>
      <div className="card-items">
        <div className="banner">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
            alt="An example image"
            fill={true}
            sizes="(100vw)"
            onClick={(e) => {
              router.push(`/${selectedCity}/${venue.slug}`);
            }}
          />
          {venue?.wb_assured && <Assured />}

          <div className="rate">
            <RatingCardDynamic
              rating={venue?.place_rating}
              ratingcount={venue?.reviews_count}
              slug={venue.slug}
            />
          </div>
        </div>
        <div
          onClick={(e) => {
            router.push(`/${selectedCity}/${venue.slug}`);
          }}
        >
          <div className="name-city">
            <h3 className="venue-name">{`${venue.name}`}</h3>
            <p className="venue-city">{venue.venue_address}</p>
          </div>
          <div className="details">
            <div className="detail">
              <div className="detail-title">
                <Image
                  src="/icons/team.png"
                  alt="An example image"
                  width={"20"}
                  height={"20"}
                />
                <p className="title">Capacity: </p>
              </div>
              <p className="desc">
                {venue.min_capacity} to {venue.max_capacity}
              </p>
            </div>
            <div className="detail">
              <div className="detail-title">
                <span className="icon">
                  <Veg color={"green"} />
                </span>
                <p className="title">Vegetarian:</p>
              </div>
              <div className="detail-content">
                <p className="desc">
                  <del> {venue.veg_price}</del>/plate
                </p>
              </div>
            </div>
            {venue.nonveg_price !== "null" ? (
              <div className="detail">
                <div className="detail-title">
                  <span className="icon">
                    <Veg color={"red"} />
                  </span>
                  <p className="title">Non Vegetarian:</p>
                </div>
                <div className="detail-content">
                  <p className="desc">
                    <del> {venue.nonveg_price}</del>/plate
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="action-btns">
            <button
              className="venue-card-btn"
              onClick={(e) => {
                openLeadModel(e, venue.slug, venue.id);
                e.stopPropagation();
              }}
            >
              Get Quotation
            </button>

            <span className="call-btn">
              {/* This is how earlier I am handling the conversion request, by opening the lead model */}
              {/* <a href={`tel:${venue.phone}`} onClick={(e) => {handleAnchorClick(e, venue.slug);openLeadModel(e,venue.slug,venue.id,"call")}} aria-label="call icon ">
                            <IoIosCall className="call-icon" size={30} />
                        </a> */}
              <a
                href={`tel:0${venue.phone}`}
                onClick={(e) => {
                  handleAnchorClick(e, venue.slug);
                  callConversion(e, venue.slug, venue.id);
                }}
                aria-label="call icon "
              >
                <IoIosCall className="call-icon" size={30} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default memo(VenueCard);
const Wrapper = styled.div`
  min-width: 250px;
  background-color: white;
  border-radius: 1.2rem;
  cursor: pointer;
//   padding: 1rem;
  overflow: hidden;

  .card-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .banner {
    position: relative;
    height: 200px;

    .venue-card-img {
      width: 100%;
      height: 100%;
    }

    .rate {
      position: absolute;
      z-index: 1;
      bottom: 10px;
      right: 10px;
    }
    .liked {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      cursor: pointer;

      .liked-icon {
        color: red;
        font-size: 3rem;
      }
    }
  }

  .name-city {
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .venue-name {
      font-family: "Poppins";
      font-size: 2rem;
      color: var(--primary-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .venue-city {
      font-size: 1.5rem;
      font-family: "Poppins";
      color: var(--primary-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .details {
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .detail {
      display: flex;
      justify-content: space-between;
    }
    .detail-title {
      display: flex;
      gap: 0.5rem;
    }
    .icon {
      position: relative;
      width: 20px;
      height: 20px;
      display: flex;
      gap: 1rem;
    }

    .title {
      color: var(--para);
      font-family: "Poppins";
      font-size: 1.5rem;
    }
    .desc {
      color: var(--para);
      font-family: "Poppins";
      font-weight: bold;
      color: black;
      font-size: 1.5rem;
    }
  }

  .action-btns {
    padding: 2rem 1rem;

    display: flex;
    z-index: 1;
    justify-content: space-between;
    .venue-card-btn {
      border: none;
      white-space: nowrap;
      background: none;
      border: 1px solid #f33232;
      color: #f33232;
      padding: 1rem 2.5rem;
      text-transform: uppercase;
      border-radius: 0.5rem;
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.3s linear;
      &:hover {
        background: #f33232;
        color: white;
      }
    }
    .call-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--phone);
      padding: 0rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s linear;

      .call-icon {
        color: var(--phone);
      }

      &:hover {
        background-color: var(--phone);

        .call-icon {
          color: white;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .banner {
      height: 180px;
    }

    .name-city {
      padding: 0rem 1rem;

      .venue-name {
        font-family: "Poppins";
        font-size: 2rem;
        color: var(--primary-color);
      }

      .venue-city {
        font-size: 1.8rem;
        font-family: "Poppins";
        color: var(--primary-color);
      }
    }

    .details {
      padding: 0rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .desc {
        color: var(--para);
        font-family: "Poppins";
        font-size: 1.5rem;
      }
    }

    .action-btns {
      padding: 1rem;

      display: flex;
      justify-content: space-between;
      .venue-card-btn {
        border: none;
        white-space: nowrap;
        background: none;
        border: 1px solid #f33232;
        color: #f33232;
        padding: 0.7rem 1.8rem;
        text-transform: uppercase;
        border-radius: 0.5rem;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s linear;
        &:hover {
          background: #f33232;
          color: white;
        }
      }
    }
  }
`;
