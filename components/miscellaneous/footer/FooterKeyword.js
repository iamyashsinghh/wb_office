import React from "react";
import styled from "styled-components";
import Link from "next/link";

function FooterKeyword({ category, locality, city }) {
  const category_name = category.split("-").join(" ");
  const new_category_name = "banquet hall";

    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Frequent Searches Leading To This Page</h2>
                <div className="vendors-container">
                    <div className="vendors-list">

                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Affordable {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            AC {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Top {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Best {category_name} with price in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            {category_name} with review in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Luxury {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Best {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            List of {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            Cheap {category_name} in {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            {category_name} nearby {locality === "all" ? city : locality}
                        </Link>
                        <Link className='vendor-link' href={`/${category}/${city}/${locality}`}>
                            {category_name} near {locality === "all" ? city : locality}
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
  margin-top: 2rem;
  .vendors-heading {
    font-size: 2rem;
    letter-spacing: 1px;
  }
  .vendors-container {
    padding: 1rem 0rem;
    .vendors-title {
      font-family: Poppins;
      font-size: 1.8rem;
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

export default FooterKeyword;
