// Import necessary modules and components
import Image from "next/image";
import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import "swiper/swiper-bundle.min.css";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import RatingForm from "./RatingForm";

// Define the main component
function VenueReview({ venue_place_id, venue }) {
  // State variables
  const [reviewData, setReviewData] = useState(null);
  const [siteReviewData, setSiteReviewData] = useState(null);
  const [showFullText, setShowFullText] = useState([]);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isOffCanvasReviewOpen, setIsOffCanvasReviewOpen] = useState(false);
  const venueData = venue;

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetch venue-specific reviews
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_json_reviews/${venue_place_id}`
      );
      const data = await response.json();
      setShowFullText(Array(data.reviews.length).fill(false));
      setReviewData(data);
    } catch (error) {
      console.error(error);
      setReviewData(null);
    }

    try {
      // Fetch site-wide reviews
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_json_reviews_site/${venueData.id}`
      );
      const dataReview = await response.json();
      setSiteReviewData(dataReview);
    } catch (error) {
      console.error(error);
      setSiteReviewData(null);
    }
  };

  // Fetch data when component mounts or when dependencies change
  useEffect(() => {
    fetchData();
  }, [venue_place_id, venueData]);

  // Function to toggle full text display
  const toggleFullText = (index) => {
    setShowFullText((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Functions to open and close off-canvas panels
  const openOffCanvas = () => {
    setIsOffCanvasOpen(true);
  };

  const closeOffCanvas = () => {
    setIsOffCanvasOpen(false);
  };

  const openOffCanvasReview = () => {
    setIsOffCanvasReviewOpen(true);
  };

  const closeOffCanvasReview = () => {
    setIsOffCanvasReviewOpen(false);
  };

  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const goldStars = Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} color="#FFD700" />
    ));
    const grayStars = Array.from(
      { length: totalStars - rating },
      (_, index) => <FaStar key={index} color="#A9A9A9" />
    );
    return [...goldStars, ...grayStars];
  };

  // Function to render an individual review card
  const renderReviewCard = (review, index) => (
    <div className="card" key={index}>
      {/* Your existing card rendering logic here */}
    </div>
  );

  // Function to render the container for review cards
//   const renderReviewCardsContainer = () => (
//     {reviewData.reviews.slice(0, 4).map((review, index) =>
//         review.rating >= 4 ? (
//           <div className="cardR" key={index}>
//             <div className="card-top">
//               <div className="card-bottom">
//                 <div className="prof">
//                   <Image
//                     src={review.profile_photo_url}
//                     width={50}
//                     height={50}
//                     alt="review-img"
//                   />
//                 </div>
//                 <div className="prof-detail">
//                   <div className="reviewer_name">{review.author_name}</div>
//                   <div style={{ display: "flex" }} className="review_stars">
//                     {renderStars(review.rating)}
//                   </div>
//                 </div>
//                 <div className="verified">
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
//                       fill="#57A4FF"
//                     ></path>
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
//                       fill="white"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>
//               <p>
//                 {showFullText[index]
//                   ? review.text
//                   : `${review.text.split(" ").slice(0, 20).join(" ")} ...`}
//                 <br />
//                 <a
//                   onClick={() => toggleFullText(index)}
//                   className="g_review"
//                 >
//                   {showFullText[index] ? "Read Less" : "Read More"}
//                 </a>
//               </p>
//             </div>
//           </div>
//         ) : null
//       )}
//       {siteReviewData.map((review) =>
//           <div className="cardR" key={review.id}>
//             <div className="card-top">
//               <div className="card-bottom">
//                 <div className="prof">
//                 </div>
//                 <div className="prof-detail">
//                   <div className="reviewer_name">{review.users_name}</div>
//                   <div style={{ display: "flex" }} className="review_stars">
//                     {renderStars(review.rating)}
//                   </div>
//                 </div>
//                 <div className="verified">
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
//                       fill="#57A4FF"
//                     ></path>
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
//                       fill="white"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>
//               <p>
//                 {showFullText[review.id]
//                   ? review.comment
//                   : `${review.comment.split(" ").slice(0, 20).join(" ")} ...`}
//                 <br />
//                 <a
//                   onClick={() => toggleFullText(review.id)}
//                   className="g_review"
//                 >
//                   {showFullText[review.id] ? "Read Less" : "Read More"}
//                 </a>
//               </p>
//             </div>
//           </div>
//       )}
//   );

  // Function to render the "Write a review" button
  const renderWriteReviewButton = () => (
    <div className="write-a-review">
      <div className="heading">Have something to share about the venue?</div>
      <button className="add-review-btn" onClick={openOffCanvas}>
        Write a review
      </button>
    </div>
  );

  // Function to render the off-canvas section
  const renderOffCanvas = () => (
    <section>
          <div id="sidebar">
            <div className="row close-and-heading">
              <div className="close-btn reviewer_name" onClick={closeOffCanvas}>
                X
              </div>
              <div className="reviewer_name">Write A Review & Ratings</div>
            </div>
            <div className="rating-card">
            <RatingForm venue_id={venue.id} onCloseOffCanvas={closeOffCanvas} />
            </div>
          </div>
        </section>
  );
  const renderReviewOffCanvas = () => (
   
    <section>
    <div id="sidebar">
    <div className="row close-and-heading">
          <div className="close-btn reviewer_name" onClick={closeOffCanvasReview}>
            X
          </div>
          <div className="reviewer_name">See All Verified Review & Ratings</div>
        </div>
        <div className="rating-card">
        <div className="review-cards-container">
        {reviewData.reviews.slice(0, 4).map((review, index) =>
          review.rating >= 4 ? (
            <div className="cardR" key={index}>
              <div className="card-top">
                <div className="card-bottom">
                  <div className="prof">
                    <Image
                      src={review.profile_photo_url}
                      width={50}
                      height={50}
                      alt="review-img"
                    />
                  </div>
                  <div className="prof-detail">
                    <div className="reviewer_name">{review.author_name}</div>
                    <div style={{ display: "flex" }} className="review_stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="verified">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
                        fill="#57A4FF"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p>
                  {showFullText[index]
                    ? review.text
                    : `${review.text.split(" ").slice(0, 20).join(" ")} ...`}
                  <br />
                  <a
                    onClick={() => toggleFullText(index)}
                    className="g_review"
                  >
                    {showFullText[index] ? "Read Less" : "Read More"}
                  </a>
                </p>
              </div>
            </div>
          ) : null
        )}
        {siteReviewData.map((review) =>
            <div className="cardR" key={review.id}>
              <div className="card-top">
                <div className="card-bottom">
                  <div className="prof">
                  </div>
                  <div className="prof-detail">
                    <div className="reviewer_name">{review.users_name}</div>
                    <div style={{ display: "flex" }} className="review_stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="verified">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
                        fill="#57A4FF"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p>
                  {showFullText[review.id]
                    ? review.comment
                    : `${review.comment.split(" ").slice(0, 20).join(" ")} ...`}
                  <br />
                  <a
                    onClick={() => toggleFullText(review.id)}
                    className="g_review"
                  >
                    {showFullText[review.id] ? "Read Less" : "Read More"}
                  </a>
                </p>
              </div>
            </div>
        )}
      </div></div>
    </div>
  </section>
  );

  // Render the main component
  return (
    <Section className="section">
      <div className="container">
        {/* Heading for ratings and reviews */}
        <Heading text={`Latest Ratings & Reviews`} />

        {/* Check if there are no reviews */}
        {!reviewData && !siteReviewData ? (
          renderWriteReviewButton()
        ) : (
          <>
            <div className="rating-heading">
              <h2 className="review-rating-heading">{venueData.name || ""}</h2>
              <div className="row review-rating-details">
                {!reviewData && !siteReviewData ? (
                  renderWriteReviewButton()
                ) : (
                  <>
                    <div className="rating-heading">
                      <h2 className="review-rating-heading">
                        {venueData.name || ""}
                      </h2>
                      <div className="row review-rating-details">
                      <div className="see-all-reviews">
              <a onClick={openOffCanvasReview} >See all verified reviews </a>
              <span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L1 9"
                    stroke="#000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </div>
                        {reviewData &&
                          reviewData.reviews.slice(0, 4).map((review, index) =>
                            review.rating >= 4 ? (
                              <div className="card" key={index}>
                                <div className="card-top">
                                  <div className="card-bottom">
                                    <div className="prof">
                                      <Image
                                        src={review.profile_photo_url}
                                        width={50}
                                        height={50}
                                        alt="review-img"
                                      />
                                    </div>
                                    <div className="prof-detail">
                                      <div className="reviewer_name">
                                        {review.author_name}
                                      </div>
                                      <div
                                        style={{ display: "flex" }}
                                        className="review_stars"
                                      >
                                        {renderStars(review.rating)}
                                      </div>
                                    </div>
                                    <div className="verified">
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
                                          fill="#57A4FF"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
                                          fill="white"
                                        ></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <p>
                                    {showFullText[index]
                                      ? review.text
                                      : `${review.text
                                          .split(" ")
                                          .slice(0, 20)
                                          .join(" ")} ...`}
                                    <br />
                                    <a
                                      onClick={() => toggleFullText(index)}
                                      className="g_review"
                                    >
                                      {showFullText[index]
                                        ? "Read Less"
                                        : "Read More"}
                                    </a>
                                  </p>
                                </div>
                              </div>
                            ) : (
                              siteReviewData &&
                              siteReviewData.map((review) => (
                                <div className="card" key={review.id}>
                                  <div className="card-top">
                                    <div className="card-bottom">
                                      <div className="prof">
                                      </div>
                                      <div className="prof-detail">
                                        <div className="reviewer_name">
                                          {review.users_name}
                                        </div>
                                        <div
                                          style={{ display: "flex" }}
                                          className="review_stars"
                                        >
                                          {renderStars(review.rating)}
                                        </div>
                                      </div>
                                      <div className="verified">
                                        <svg
                                          width="25"
                                          height="25"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M18.6613 5L16.1279 3.87305L15 1.3387L12.243 1.62663L10 0L7.7557 1.62663L5 1.3387L3.87288 3.87191L1.33854 5L1.62663 7.757L0 10L1.62663 12.2443L1.33854 15L3.87191 16.127L5 18.6613L7.757 18.3734L10 20L12.2443 18.3734L15 18.6613L16.127 16.1279L18.6613 15L18.3732 12.243L20 10L18.3732 7.7557L18.6613 5Z"
                                            fill="#57A4FF"
                                          ></path>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.5731 6.58705C13.457 6.47098 13.269 6.47098 13.1529 6.58705L8.32091 11.419L6.84923 9.95012C6.73331 9.83449 6.54558 9.83449 6.42966 9.95012L5.58734 10.7874C5.53148 10.8431 5.5 10.9188 5.5 10.9977C5.5 11.0767 5.53148 11.1524 5.58734 11.2081L8.10997 13.7307C8.22589 13.8466 8.41405 13.8466 8.53012 13.7307L14.4131 7.84764C14.529 7.73172 14.529 7.54355 14.4131 7.42749L13.5731 6.58705Z"
                                            fill="white"
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <p>
                                      {showFullText[review.id]
                                        ? review.comment
                                        : `${review.comment
                                            .split(" ")
                                            .slice(0, 20)
                                            .join(" ")} ...`}
                                      <br />
                                      <a
                                        onClick={() =>
                                          toggleFullText(review.id)
                                        }
                                        className="g_review"
                                      >
                                        {showFullText[review.id]
                                          ? "Read Less"
                                          : "Read More"}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              ))
                            )
                          )}
                      </div>
                    </div>
                    {renderWriteReviewButton()}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {isOffCanvasOpen && renderOffCanvas()}
      {isOffCanvasReviewOpen && renderReviewOffCanvas()}
    </Section>
  );
}

const Section = styled.div`
  background-color: var(--bg-color);
  .card {
    width: 48%;
    padding: 15px 30px 15px 0px;
    cursor: pointer;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
  }
  .cardR {
    width: 90%;
    padding: 15px 30px 15px 0px;
    cursor: pointer;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
  .review-rating-heading {
    font-size: 22px;
    line-height: 32px;
    color: #000;
    font-weight: 500 !important;
    word-break: break-word;
  }
  .review-rating-details {
    justify-content: space-between;
  }
  .rating-heading {
    margin: 15px 0 25px 0;
  }
  .review-rating-rating {
    font-size: 20px;
    margin-top: -4px;
    margin-right: 4px;
    color: #000;
    font-weight: 800 !important;
    word-break: break-word;
  }
  .row {
    display: flex;
  }
  .review-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .verified {
    margin-left: 5px;
  }

  .reviewer_name {
    font-family: "Poppins";
    font-weight: 500 !important;
    font-size: 1.8rem !important;
  }
  .see-all-reviews {
    font-family: "Poppins";
    font-weight: 500 !important;
    font-size: 1.8rem !important;
  }
  .g_review {
    font-family: "Poppins" !important;
    font-size: 1.8rem !important;
    font-weight: 400;
    color: var(--info-color);
    cursor: pointer;
  }

  .review_stars svg {
    height: 20px;
    width: 20px;
  }
  .card-bottom .review_stars svg {
    height: 15px;
    width: 15px;
  }
  p {
    font-weight: 400 !important;
    font-size: 1.7rem !important;
    padding-top: 5px;
  }

  .card-top p:nth-child(1),
  h3 {
    font-family: "DM Sans", sans-serif;
  }
  .card-hading {
    padding-bottom: 20px;
  }
  .card-bottom {
    padding-top: 20px;
    display: flex;
    align-items: center;
  }
  .prof {
    border-radius: 50%;
    background-color: #eee;
  }
  .prof img {
    width: 40px;
    height: 40px;
    max-width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .prof-detail {
    padding-left: 10px;
  }
  .prof-detail p {
    font-family: "Ephesis", cursive;
  }
  .write-a-review {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    background: #f8dddd;
    margin-top: 8px;
    border-radius: 6px;
    padding: 16px;
  }
  .write-a-review .heading {
    font-weight: 400 !important;
    font-size: 2rem !important;
    padding-top: 2px;
  }
  .add-review-btn {
    border: none;
    font-size: 1.8rem;
    background: var(--primary-color);
    z-index: 1;
    grid-column: 1/-1;
    color: white;
    font-size: 1.8rem;
    font-family: "Poppins";
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
    border-radius: 0.3rem;
    margin-left: 15px;
  }

  //   offcanvas
  #main-content {
    transition: margin-left 0.5s;
    padding: 16px;
  }

  #sidebar {
    height: 100%;
    width: 500px;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
  }

  .close-and-heading {
    background: var(--primary-color);
    color: #fff;
    padding: 8px 0px;
  }
  .close-btn {
    padding: 0 20px;
    cursor: pointer;
  }
  @media only screen and (max-width: 730px) {
    #sidebar {
      width: 300px !important;
    }
    .card {
      width: 100%;
      padding: 25px 0px 25px 0px;
      cursor: pointer;
      border-top: 1px dashed rgba(0, 0, 0, 0.1);
    }
    .review-rating-heading {
      font-size: 16px;
    }
    .rating-heading {
      margin: 0px 0 25px 0;
    }
  }
`;

export default VenueReview;
