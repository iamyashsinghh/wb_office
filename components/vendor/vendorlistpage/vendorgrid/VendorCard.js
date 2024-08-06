import Image from "next/image";
import styled from "styled-components";
import { IoIosCall, IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineWhatsapp } from "react-icons/md";
import RatingCard from "@/components/miscellaneous/RatingCard";
import { useRouter } from "next/router";
import { BiRupee } from "react-icons/bi";
import { memo } from "react";
import PropTypes from "prop-types";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "@/components/miscellaneous/Assured";

function VendorCard({ vendor, openLeadModel, city, category, locality }) {
  const imageUrl = vendor?.images?.split(",")[0];
  const router = useRouter();

  const handleAnchorClick = async (e, slug) => {
    e.stopPropagation();
    await CallingRequest(slug);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const currentUrl = `https://weddingbanquets.in/delhi/${vendor?.slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const sliceAddress = (address, length) => {
    return address.length > length ? `${address.slice(0, length)}...` : address;
  };


  return (
    <CardWrapper onClick={() => router.push(`/delhi/${vendor?.slug}`)}>
      <ImageContainer>
        <StyledImage
          src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${imageUrl}`}
          layout="fill"
          objectFit="cover"
          alt={`${category} in ${locality === "all" ? city : locality}`}
        />
        {vendor?.wb_assured && <AssuredBadge><Assured /></AssuredBadge>}
        <RatingBadge>
          <RatingCard />
        </RatingBadge>
      </ImageContainer>
      <PriceStripe>
        <span>Package price</span>
        <Price>
          <BiRupee />
          <del>{vendor?.package_price}</del>
        </Price>
      </PriceStripe>
      <Content>
        <VendorInfo>
          <VendorName>{vendor?.brand_name}</VendorName>
          <VendorAddress>{sliceAddress(vendor?.vendor_address, 35)}</VendorAddress>
        </VendorInfo>
        <ShareButton onClick={handleShareClick} aria-label="Share on WhatsApp">
          <MdOutlineWhatsapp />
        </ShareButton>
      </Content>
      
      <Actions>
        <ActionButton onClick={(e) => { openLeadModel(e, vendor?.slug, vendor?.id); e.stopPropagation(); }}>
          Get Quotation
        </ActionButton>
        <CallButton href={`tel:0${vendor?.phone}`} onClick={(e) => handleAnchorClick(e, vendor?.slug)}>
          <IoIosCall />
        </CallButton>
      </Actions>
    </CardWrapper>
  );
}

VendorCard.propTypes = {
  vendor: PropTypes.object.isRequired,
  openLeadModel: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
};

export default memo(VendorCard);

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; 
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AssuredBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
`;

const RatingBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VendorInfo = styled.div`
  max-width: 70%;
`;

const VendorName = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
`;

const VendorAddress = styled.p`
  font-size: 1.5rem;
  color: #777;
  margin: 5px 0 0;
`;

const ShareButton = styled.button`
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;

  &:hover {
    background: #1ebe57;
  }
`;

const PriceStripe = styled.div`
  background: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.6rem;
  }
`;

const Price = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  svg {
    // margin-right: 5px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 20px;
`;

const ActionButton = styled.button`
  flex: 1;
  margin-right: 10px;
  background: #f33232;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: #d72b2b;
  }
`;

const CallButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25d366;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 2.5rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #1ebe57;
  }
`;
