import React from "react";
import styled from "styled-components";
import BlogSmallCard from "./BlogSmallCard";

function LatestPost() {
  return (
    <>
      <Heading>Some Latest Post</Heading>
      <LatestBlogContainer>
        <BlogSmallCard />
        <BlogSmallCard />
        <BlogSmallCard />
        <BlogSmallCard />
      </LatestBlogContainer>
    </>
  );
}

export default LatestPost;

const Heading = styled.h3`
  margin: 3rem 0 1rem 0;
  font-weight: 600;
  font-size: 2.5rem;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LatestBlogContainer = styled.div`
  padding: 1rem 1rem;
  background: #fff;
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;
