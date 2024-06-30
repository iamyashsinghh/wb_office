import React from "react";
import styled from "styled-components";
import BlogSmallCard from "./BlogSmallCard";

function PopularPost({popular}) {
  return (
    <>
      <Heading>Some Popular Post</Heading>
      <PopularBlogContainer>
      {popular.map((data, index) => (
        <BlogSmallCard key={index} {...data} />
      ))}
      </PopularBlogContainer>
    </>
  );
}

export default PopularPost;

const Heading = styled.h3`
  margin: 0 0 1rem 0;
  font-weight: 600;
  font-size: 2.5rem;
color: var(--primary-color);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PopularBlogContainer = styled.div`
  padding: 1rem 1rem;
  background: #fff;
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;