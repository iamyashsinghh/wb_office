import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai'; // Importing some icons from react-icons
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';   

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out;

`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;

const CloseButton = styled(AiOutlineClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ShareLabel = styled.h2`
  text-align: center;
`;

const UrlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CopyButton = styled(AiOutlineCopy)`
  margin-left: 10px;
  cursor: pointer;
`;

//For social icon 
const SocialMediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const SocialMediaIcon = styled.div`
  cursor: pointer;
`;

export default function SharePopup({ visible=true, onClose=null }) {
    
  const urlRef = useRef(null);
  const [copied, setCopied] = useState(false);


  const copyUrl = () => {
    urlRef.current.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  const shareContent = (platform) => {
    const shareURL = "https://example.com/share"; // Change this to your desired URL
  
    if (navigator.share) {
      navigator.share({
        title: 'Share Next Project', // You can change this
        text: 'Check out this awesome project!', // And this
        url: shareURL,
      });
    } else {
      alert('Your browser does not support the Share API.');
    }
  };
  return (
    <PopupWrapper visible={visible}>
      <PopupContent>
        <CloseButton onClick={onClose} />
        <ShareLabel>Share</ShareLabel>
        <UrlWrapper>
          <UrlInput ref={urlRef} value="https://example.com/share" readOnly />
          <CopyButton onClick={copyUrl} />
        </UrlWrapper>
        <SocialMediaWrapper>
        <SocialMediaIcon onClick={() => shareContent('whatsapp')}>
          <FaWhatsapp size={28} />
        </SocialMediaIcon>
        <SocialMediaIcon onClick={() => shareContent('instagram')}>
          <FaInstagram size={28} />
        </SocialMediaIcon>
        <SocialMediaIcon onClick={() => shareContent('facebook')}>
          <FaFacebook size={28} />
        </SocialMediaIcon>
      </SocialMediaWrapper>
      </PopupContent>
    </PopupWrapper>
  );
}
