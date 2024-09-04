import styled from "styled-components";
import { IoIosCall } from "react-icons/io";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Image from "next/image";
import TabsComponent from "../tabsComponent/TabsComponent";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";

export default function VendorBasicInfo({ vendor, openLeadsModel }) {
  const [showSummary, setShowSummary] = useState(false);
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const packages = vendor.package_option
    ?.split(",")
    .map((item) => item.trim())
    .filter((item) => item);

  const hasValidPrice =
    vendor.albums_price ||
    vendor.pre_wedding_photoshoot_price ||
    vendor.traditional_video_price ||
    vendor.traditional_photography_price ||
    vendor.candid_photography_price ||
    vendor.cinematography_price ||
    vendor.party_makeup_price ||
    vendor.engagement_makeup_price ||
    vendor.hd_bridal_makeup_price ||
    vendor.air_brush_makeup_price ||
    vendor.bridal_mehndi_price ||
    vendor.engagement_mehndi_price;

  async function handleAnchorClick(e, slug) {
    e.stopPropagation();
    await CallingRequest(slug);
  }
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <>
      <Wrapper className="section-venue-basic_info info-section">
        <div className="container-l">
          <div className="info-container">
            <div className="card info-card">
              <div className="v-header">
                <div>
                  <h2 className="v-name">{vendor.brand_name}</h2>
                  <p className="address">{vendor.vendor_address || " "}</p>
                </div>
                <div className="action-btns">
                  <a
                    href={`tel:+${vendor.phone}`}
                    onClick={(e) => handleAnchorClick(e, vendor?.slug)}
                    className="call-btn-header"
                    aria-label="call icon"
                  >
                    <IoIosCall className="call-icon" />
                  </a>
                  <button
                    className="venue-card-btn-header"
                    onClick={(e) => openLeadsModel()}
                  >
                    Get Quotation
                  </button>
                </div>
              </div>
              <div className="vendor-aditional-info">
                <div className="detail-circle">
                  <BsFillSuitcaseLgFill className="icon" />
                  <p>
                    Exp.{" "}
                    {`${
                      vendor?.yrs_exp !== undefined &&
                      vendor?.yrs_exp !== null &&
                      vendor?.yrs_exp !== 0
                        ? vendor.yrs_exp
                        : "5+"
                    } Yr's`}
                  </p>
                </div>
                <div className="detail-circle">
                  <MdEventAvailable className="icon" />
                  <p>
                    Event Completed:
                    <span className="price">
                      &nbsp;
                      {`${
                        vendor?.event_completed !== undefined &&
                        vendor?.event_completed !== null &&
                        vendor?.event_completed !== 0
                          ? vendor.event_completed
                          : 150
                      }+`}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card info-card info-cardd">
                <h3 className="v-name">About</h3>
                <div
                  className="v-desc"
                  dangerouslySetInnerHTML={{
                    __html: showSummary
                      ? vendor.summary
                      : `${vendor.summary.slice(0, 500)}...`,
                  }}
                ></div>
                <span
                  className="read-more-btn"
                  onClick={() => {
                    setShowSummary(!showSummary);
                  }}
                >
                  {showSummary ? "Read less" : "Read more"}
                </span>
              </div>
              <div className="info-cardd">
                <TabsComponent images={vendor.images} />
              </div>
            </div>
            <div className="vendor-ad">
              <AccordionContainer>
                <AccordionItem>
                  <AccordionTitle onClick={() => toggleAccordion(1)}>
                    <div className="d-flex">
                      <div>Packages</div>
                      {openIndex === 1 ? (
                        <div className="see-pricing">Hide Pricing</div>
                      ) : (
                        <div className="see-pricing">See Pricing</div>
                      )}
                    </div>
                  </AccordionTitle>
                  <AccordionContent isOpen={openIndex === 1}>
                    {hasValidPrice ? (
                      <div className="venue-category">
                        {vendor.air_brush_makeup_price && (
                          <div className="category-item">
                            <p>Air Brush Makeup</p>
                            <p>
                              ₹ {numberFormat(vendor.air_brush_makeup_price)}
                            </p>
                          </div>
                        )}
                        {vendor.hd_bridal_makeup_price && (
                          <div className="category-item">
                            <p>HD Bridal Makeup</p>
                            <p>
                              ₹ {numberFormat(vendor.hd_bridal_makeup_price)}
                            </p>
                          </div>
                        )}
                        {vendor.engagement_makeup_price && (
                          <div className="category-item">
                            <p>Engagement Makeup</p>
                            <p>
                              ₹ {numberFormat(vendor.engagement_makeup_price)}
                            </p>
                          </div>
                        )}
                        {vendor.party_makeup_price && (
                          <div className="category-item">
                            <p>Party Makeup</p>
                            <p>₹ {numberFormat(vendor.party_makeup_price)}</p>
                          </div>
                        )}
                        {vendor.cinematography_price && (
                          <div className="category-item">
                            <p>Cinematography</p>
                            <p>₹ {numberFormat(vendor.cinematography_price)}</p>
                          </div>
                        )}
                        {vendor.candid_photography_price && (
                          <div className="category-item">
                            <p>Candid Photography</p>
                            <p>
                              ₹ {numberFormat(vendor.candid_photography_price)}
                            </p>
                          </div>
                        )}
                        {vendor.traditional_photography_price && (
                          <div className="category-item">
                            <p>Traditional Photography</p>
                            <p>
                              ₹{" "}
                              {numberFormat(
                                vendor.traditional_photography_price
                              )}
                            </p>
                          </div>
                        )}
                        {vendor.traditional_video_price && (
                          <div className="category-item">
                            <p>Traditional Videography</p>
                            <p>
                              ₹ {numberFormat(vendor.traditional_video_price)}
                            </p>
                          </div>
                        )}
                        {vendor.pre_wedding_photoshoot_price && (
                          <div className="category-item">
                            <p>Pre Wedding Photoshoot</p>
                            <p>
                              ₹{" "}
                              {numberFormat(
                                vendor.pre_wedding_photoshoot_price
                              )}
                            </p>
                          </div>
                        )}
                        {vendor.albums_price && (
                          <div className="category-item">
                            <p>Albums Price</p>
                            <p>₹ {numberFormat(vendor.albums_price)}</p>
                          </div>
                        )}
                        {vendor.bridal_mehndi_price && (
                          <div className="category-item">
                            <p>Bridal Mehndi</p>
                            <p>₹ {numberFormat(vendor.bridal_mehndi_price)}</p>
                          </div>
                        )}
                        {vendor.engagement_mehndi_price && (
                          <div className="category-item">
                            <p>Engagement Mehndi</p>
                            <p>
                              ₹ {numberFormat(vendor.engagement_mehndi_price)}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      packages?.map((price_package, i) => (
                        <p key={i}>{price_package}</p>
                      ))
                    )}
                  </AccordionContent>
                </AccordionItem>
              </AccordionContainer>
              <div className="package-card card">
                <h2 className="price">
                  <BiRupee className="rupee-icon" />
                  <div className="cut-price">
                    {vendor?.package_price ? (
                      <del>{numberFormat(vendor.package_price)}</del>
                    ) : (
                      "On Demand"
                    )}
                  </div>
                </h2>
                <div className="action-btns">
                  <button
                    className="venue-card-btn"
                    onClick={(e) => openLeadsModel()}
                  >
                    Get Quotation
                  </button>
                  <a
                    href={`tel:+${vendor.phone}`}
                    onClick={(e) => handleAnchorClick(e, vendor?.slug)}
                    className="call-btn"
                    aria-label="call icon"
                  >
                    <IoIosCall className="call-icon" />
                  </a>
                </div>
                <div className="banner-img">
                  <Image
                    src="/common/vendor.jpg"
                    alt="An example image"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  background-color: var(--bg-color);
  position: relative;
  padding: 2rem 0;

  .info-cardd {
    margin-top: 25px;
  }

  .v-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vendor-aditional-info {
    margin-top: 20px;
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
      margin-right: 20px;
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

  .vendor-ad {
    position: sticky;
    top: 0;
  }

  .venue-card-btn-header {
    border: none;
    white-space: nowrap;
    background: none;
    border: 1px solid #f33232;
    padding: 1rem 2.5rem;
    text-transform: uppercase;
    border-radius: 0.5rem;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s linear;
    color: #f33232;
    display: none;

    &:hover {
      background-color: #f33232;
      color: white;
    }
    @media (min-width: 1100px) {
      display: block;
    }
  }

  .call-btn-header {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid green;
    padding: 0.2rem 0.8rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: none;

    .call-icon {
      font-size: 30px;
      color: var(--phone);
    }

    &:hover {
      background-color: var(--phone);
      .call-icon {
        color: white;
      }
    }

    @media (max-width: 1100px) {
      display: block;
    }
  }

  .info-container {
    display: grid;
    grid-template-columns: 7fr 3fr;
    align-items: start;
    gap: 2rem;
    .info-card {
      display: flex;
      flex-direction: column;
      .v-name {
        font-family: "Montserrat";
        font-size: 2.5rem;
        color: var(--primary-color);
        font-weight: 700;
      }
      .address {
        font-family: "Poppins";
        font-size: 1.7rem;
        color: var(--primary-color) !important;
        font-weight: 400;
      }
      .v-desc,
      p,
      span {
        font-family: "Poppins" !important;
        font-size: 1.8rem !important;
        color: var(--para) !important;
      }
      .v-desc {
        ul li {
          list-style-type: disc;
          margin-left: 3rem;
        }
        h1 {
          font-size: 24px !important;
        }
        h2 {
          font-size: 22px !important;
        }
        h3 {
          font-size: 20px !important;
        }
      }
      .read-more-btn {
        font-family: "Poppins" !important;
        font-size: 1.8rem !important;
        font-weight: 400;
        color: var(--info-color) !important;
        cursor: pointer;
      }
    }
  }

  .package-card {
    padding-top: 2rem !important;
    max-width: 50rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .price {
      font-family: "Montserrat";
      display: flex;
      align-items: center;
      font-size: 2.5rem;
      color: var(--primary-color);
      font-weight: 700;

      .rupee-icon {
        font-size: 3rem;
      }
    }

    .price-label {
      font-size: 1.6rem;
      line-height: normal;
      font-family: "Poppins";
      font-weight: 500;
      color: var(--para);
    }

    .action-btns {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0rem 2rem 1rem 2rem;
      width: 100%;

      .venue-card-btn {
        border: none;
        white-space: nowrap;
        background: none;
        border: 1px solid #f33232;
        padding: 1rem 2.5rem;
        text-transform: uppercase;
        border-radius: 0.5rem;
        font-size: 1.8rem;
        cursor: pointer;
        transition: all 0.3s linear;
        color: #f33232;

        &:hover {
          background-color: #f33232;
          color: white;
        }
      }
      .call-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid green;
        padding: 0.2rem 0.8rem;
        border-radius: 0.5rem;
        cursor: pointer;
        .call-icon {
          font-size: 30px;
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
    .banner-img {
      position: relative;
      width: 100%;
      height: 400px;
    }
  }

  @media (max-width: 800px) {
    .info-container {
      padding: 0rem 1rem;
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
`;

const AccordionItem = styled.div`
  &:first-of-type {
    border-top: none;
  }
`;

const AccordionTitle = styled.div`
  width: 100%;
  padding: 15px;
  text-align: left;
  background: #f7f7f7;
  border: none;
  cursor: pointer;
  font-size: 1.9rem;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  .d-flex {
    display: flex;
    justify-content: space-between;
  }

  .see-pricing {
    font-size: 1.6rem;
    color: var(--info-color);
  }
`;

const AccordionContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  font-size: 1.8rem;
  color: var(--primary-color);
  transition: max-height 0.6s ease-in;
  padding: 5px 15px;
  background: #fff;

  .venue-category {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 5px;
  }

  .category-item {
    flex: 1 1 calc(50% - 1rem); /* Two items per row */
    background-color: #f1f1f1;
    padding: 0.3rem;
    border-radius: 5px;
    text-align: center;
  }

  .category-item p {
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;
