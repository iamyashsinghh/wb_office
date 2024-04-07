import { useState } from "react";
import styled from "styled-components";

export default function Pagedescription({ caption }) {
  // console.log(caption.slice(0,500))

  const [showCaption, setShowCaption] = useState(false);
  return (
    <Wrapper className=" footer-description-section">
      <div className="container">
        <div
          className="footer-description"
          dangerouslySetInnerHTML={{
            __html: showCaption ? caption : caption?.slice(0, 800),
          }}
        ></div>
        {caption && (
          <span
            className="read-more-btn"
            onClick={() => {
              setShowCaption(!showCaption);
            }}
          >
            {" "}
            {showCaption ? "Read less" : "Read more"}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .footer-description {
    span,
    p,
    ul {
      font-size: 1.5rem !important;
      color: var(--para);
      font-family: "Poppins";
      font-weight: 400;
      letter-spacing: 1px;
      line-height: 25px;
    }
    ul {
      li {
        list-style: disc !important;
        margin-left: 1.5rem;
      }
    }

    a {
      color: blue !important;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-size: 3rem;
      font-weight: 400;
    }
  }
  .read-more-btn {
    font-family: "Poppins" !important;
    font-size: 1.8rem !important;
    font-weight: 400;
    color: var(--info-color);
    cursor: pointer;
  }

  @media (max-width: 600px) {
  }
`;
