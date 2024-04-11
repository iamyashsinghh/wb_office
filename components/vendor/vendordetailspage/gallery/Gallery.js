import styled from "styled-components";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Assured from "@/components/miscellaneous/Assured";


function Gallery({ images }) {
  images = images ? images.split(",") : [];
  const [visibleImages, setVisibleImages] = useState(12);
  const [open,setOpen]=useState(false);

  const slides = images.map(image => ({ src: `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}` }));

  const itemData = images.map((url, i) => ({
    img: `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${url}`,
  }));

  const showViewLess = visibleImages === images.length && visibleImages > 12;

  return (
    <Wrapper className="info-section">
      <div className="container">
        {itemData.slice(0, visibleImages).map((item, i) => (
          <a key={i} onClick={()=>setOpen(true)} className="image-link">
            <img
              src={item.img}
              alt="venue-img"
              loading="lazy"
              className="gallery-img"
            />
          </a>
        ))}
      </div>
      {showViewLess && (
        <div className="btn">
          <button className="view-button" onClick={() => setVisibleImages(12)}>
            View Less
          </button>
        </div>
      )}
      {!showViewLess && visibleImages < images.length && (
        <div className="btn">
          <button
            className="view-button"
            onClick={() =>
              setVisibleImages(Math.min(images.length, visibleImages + 12))
            }
          >
            View More
          </button>
        </div>
      )}
      <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Zoom,Fullscreen,Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0,fontSize:"2rem" } } }}
                slides={slides}
            />
    </Wrapper>
  );
};
export default Gallery;

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
    width: 100%;
  }

  .image-link {
    width: calc(25% - 15px);
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
  }

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.5s;
  }

  .gallery-img:hover {
    transform: scale(1.05);
  }

  .btn {
    display: flex;
    justify-content: center;
  }

  .view-button {
    background-color: #870808;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .image-link {
      width: calc(33.33% - 15px);
    }
  }

  @media (max-width: 500px) {
    .image-link {
      width: calc(50% - 15px);
    }
  }
`;