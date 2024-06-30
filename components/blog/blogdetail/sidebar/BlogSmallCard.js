import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Router from 'next/router';


import { FaUser } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";

function BlogSmallCard({heading, image, image_alt, publish_date, author_name, slug}) {
    const handleCardClick = () => {
        Router.push(`/yash/${slug}`); 
      };

  return (
    <Wrapper >
      <Row onClick={handleCardClick}>
        <Heading>
          {heading}
        </Heading>
        <ImageContainer>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${image}`}
            width={100}
            height={70}
            alt={image_alt}
          />
        </ImageContainer>
      </Row>
      <Row2>
        <Date><BsCalendarDateFill />&nbsp;{publish_date}</Date>
        <Author><FaUser />&nbsp;By {author_name}</Author>
      </Row2>
    </Wrapper>
  );
}

export default BlogSmallCard;

const Wrapper = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--secoundary-color);
  &:last-child {
    border-bottom: none;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const Heading = styled.h4`
  font-size: 1.5rem;
  max-width: 200px;
  color: var(--primary-color);
`;

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #000;
  background: #ddd;
  padding: 3px 5px;
  border-radius: 5px;
`;

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #000;
  background: #ddd;
  padding: 3px 5px;
  border-radius: 5px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 70px;
  border-radius: 3px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 80px;
    height: 56px;
  }
`;