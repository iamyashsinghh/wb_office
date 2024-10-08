  import React from "react";
  import styled from "styled-components";
  import FetureImg from "./description/FetureImg";
  import PopularPost from "./sidebar/PopularPost";
  import LatestPost from "./sidebar/LatestPost";
  import Ad from "./sidebar/Ad";
  import AuthorCard from "./authorcard/AuthorCard";

  const BlogDetail = ({ data }) => {
    const blog = data.data;
    const popular = data.popular;
    const latest = data.latest;
    const author = data.author;

    return (
      <Wrapper>
        <Container>
          <Description>
            <Heading>{blog.heading}</Heading>
            <FetureImg image={blog.image} image_alt={blog.image_alt} />
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: blog.summary }}
            />
            <AuthorCard {...author} />
          </Description>
          <RightSidebar>
            <PopularPost popular={popular}/>
            <LatestPost latest={latest} />
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
    line-height: 1.6;
    p,
      span {
        font-family: "Poppins" !important;
        font-size: 1.8rem !important;
        color: var(--para) !important;
      }
         ul li {
          list-style-type: disc;
          margin-left: 3rem;
        }
        h1 {
          font-size: 32px !important;
        }
        h2 {
          font-size: 28px !important;
        }
        h3 {
          font-size: 24px !important;
        }

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
