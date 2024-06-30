import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function FetureImg({image, image_alt}) {
  return (
    <Wrapper>
      <Image 
        src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${image}`} 
        layout="responsive" 
        height={500}
        width={700} 
        alt={image_alt}
        priority
      />
    </Wrapper>
  )
}

export default FetureImg;

const Wrapper = styled.div`
  background: var(--bg-color);
`;
