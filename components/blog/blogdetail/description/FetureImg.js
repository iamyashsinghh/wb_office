import React from "react";
import styled from "styled-components";
import Image from "next/image";

function FetureImg({ image, image_alt }) {
  return (
    <Wrapper>
      <StyledImage
        src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${image}`}
        alt={image_alt}
        fill={true}
        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 600px"
        priority
      />
    </Wrapper>
  );
}

export default FetureImg;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* 16:9 aspect ratio (adjust as needed) */
  background: var(--bg-color);
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px; /* Optional: Add border-radius or other styles */
`;
