import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUser } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import Router from 'next/router';
import Image from 'next/image';

function BlogCard({ image, heading, excerpt, publish_date, slug, image_alt, author_name }) {
  const handleCardClick = () => {
    Router.push(`/blog/${slug}`); // Corrected the route path
  };
  
  return (
    <Card onClick={handleCardClick}>
      <ImgWrapper>
        <Img src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${image}`} 
        alt={image_alt} 
        fill={true}
        quality={50}
        sizes="(max-width: 600px) 100vw, 600px" 
         />
      </ImgWrapper>
      <Content>
        <Title>{heading}</Title>
        <Description>{excerpt}...<span className='read-more-btn'>Read More</span></Description>
        <Meta>
          <Date><BsCalendarDateFill />&nbsp;{publish_date}</Date>
          <Author><FaUser />&nbsp;By {author_name}</Author>
        </Meta>
      </Content>
    </Card>
  );
}

export default BlogCard;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  width: 350px;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-out;
  transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 230px; /* Adjust height as per your design */
`;

const Img = styled(Image)`
  border-radius: 8px 8px 0 0; /* Ensure rounded corners at the top */
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
  transition: color 0.3s ease;
  color: var(--primary-color);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  .read-more-btn {
    font-family: "Poppins" !important;
    font-weight: 400;
    color: var(--info-color);
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
  margin-top: 10px;
`;

const Date = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #000;
  background: #ddd;
  padding: 3px 5px;
  border-radius: 5px;
`;

const Author = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #000;
  background: #ddd;
  padding: 3px 5px;
  border-radius: 5px;
`;
