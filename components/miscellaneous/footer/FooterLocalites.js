import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

function FooterLocalities({ city, category, localities }) {
  const category_name = category.split("-").join(" ");
  const [showMore, setShowMore] = useState(false);

  return (
    <Section className="section-vendors">
      <div className="container">
        <h2 className="vendors-heading">
          Find {category_name} localities in{" "}
          <span className="city-name">{city}</span>
        </h2>
        <div className="vendors-container">
          <div className="vendors-list">
            {showMore
              ? localities?.map((locality, i) => {
                return (
                  <span key={locality.id}>
                    <Link
                      className="vendor-link"
                      href={`/${category}/${city}/${locality.slug}`}
                    >
                      {`${category} in ${locality.name}`}
                    </Link>
                    <Link
                      className="vendor-link"
                      href={`/${category}/${city}/${locality.slug}`}
                    >
                      {`${category.split(' ').map((word, index, array) => index === array.length - 1 ? word.slice(0, -1) : word).join(' ')} hall in ${locality.name}`}
                    </Link>
                  </span>
                );
              })
              : localities?.slice(0, 20).map((locality, i) => {
                return (
                  <span key={locality.id}>
                    <Link
                      className="vendor-link"
                      href={`/${category}/${city}/${locality.slug}`}
                    >
                      {`${category_name} in ${locality.name}`}
                    </Link>
                    <Link
                      className="vendor-link"
                      href={`/${category}/${city}/${locality.slug}`}
                    >
                      {`${category.split(' ').map((word, index, array) => index === array.length - 1 ? word.slice(0, -1) : word).join(' ').replace('-', ' ')} in ${locality.name}`}
                    </Link>
                  </span>
                );
              })}
          </div>
          <span
            className="read-more-btn"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {" "}
            {showMore ? "Read less" : "Read more"}
          </span>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  .vendors-heading {
    font-size: 2rem;
    letter-spacing: 1px;

    .city-name {
      text-transform: capitalize;
    }
  }
  .vendors-container {
    padding: 1rem 0rem;
    .read-more-btn {
      font-family: "Poppins" !important;
      font-size: 1.8rem !important;
      font-weight: 400;
      color: var(--info-color);
      cursor: pointer;
    }
    .vendors-list {
      padding: 2rem 0rem;

      .vendor-link {
        line-height: 3rem;
        font-family: "Poppins";
        margin-bottom: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s linear;
        color: var(--para);
        white-space: normal;
        overflow-wrap: break-word;

        &:hover {
          color: red;
        }

        &::after {
          content: "|";
          padding: 0 10px;
          opacity: 0.54;
          color: black;
        }
      }
    }
  }
`;

export default FooterLocalities;