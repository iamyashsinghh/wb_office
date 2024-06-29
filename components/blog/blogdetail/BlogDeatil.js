  import React from "react";
  import styled from "styled-components";
  import FetureImg from "./description/FetureImg";
  import PopularPost from "./sidebar/PopularPost";
  import LatestPost from "./sidebar/LatestPost";
  import Ad from "./sidebar/Ad";

  const BlogDetail = ({ data }) => {
    return (
      <Wrapper>
        <Container>
          <Description>
            <Heading>{data.heading}</Heading>
            <FetureImg image={data.image} image_alt={data.image_alt} />
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </Description>
          <RightSidebar>
            <PopularPost />
            <LatestPost />
            <Ad />
          </RightSidebar>
        </Container>
      </Wrapper>
    );
  };

  export default BlogDetail;

  const Wrapper = styled.div`
    background: var(--bg-color);
  `;

  const Container = styled.div`
    padding: 2rem 0;
    margin: 0 3rem;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 3rem;

    @media (max-width: 768px) {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
    }
  `;

  const Description = styled.div`
    margin-top: 10rem;
    @media (max-width: 768px) {
      margin-top: 6rem;
    }
  `;

  const RightSidebar = styled.aside`
    padding: 1rem;
    margin-top: 10rem;
    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  `;

  const Heading = styled.h1`
    margin: 1rem;
    font-size: 4rem;
    text-align: center;
      color: var(--primary-color);
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  `;
