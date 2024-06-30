import Image from "next/image";
import React from "react";
import styled from "styled-components";

function AuthorCard({ name, image, bio }) {
  return (
    <Wrapper>
      <Row>
        <ImageContainer>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${image}`}
            width={70}
            height={70}
            alt={`${name}'s profile image`}
          />
        </ImageContainer>
        <Description>
          <AuthorName>{name} {`(Author)`}</AuthorName>
          <AuthorDesc>{bio}</AuthorDesc>
        </Description>
      </Row>
    </Wrapper>
  );
}

export default AuthorCard;

const Wrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0 auto;   
  margin-top: 2rem;
    @media (max-width: 768px) {
      max-width: 400px;
}
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden; 
`;

const Description = styled.div`
  flex: 1
`;

const AuthorName = styled.h4`
  font-size: 1.8rem; 
  margin: 0; 
  color: var(--primary-color);
`;

const AuthorDesc = styled.p`
  font-size: 1.4rem; 
  color: #666666;
  margin: 0.5rem 0 0;
`;

