import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import VendorCard from "../../vendorlistpage/vendorgrid/VendorCard";
import useLeadModel from "@/lib/hook/useLeadModel";
import { useCallback } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay } from "swiper";


export default function SimilarVendors({vendors}) {

    const {openLeadModel} = useLeadModel();             //optimise function using useCallback();
    


    return (<Wrapper className="section similar-vendors-section">
        <Heading text={"Browse Similar Wedding Vendors"}/>
        <div className="container">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                // centeredSlides={true}

                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{

                    500: {
                        slidesPerView: 1.2,
                        spaceBetween: 20,
                    },
                    800: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView:3,
                        spaceBetween: 20,
                    },
                }}
                // navigation={true}
                modules={[Autoplay]}
                className="mySwiper"
            >

                {
                    vendors && vendors.map((vendor)=>{
                        return <SwiperSlide key={vendor.id}><VendorCard vendor={vendor} openLeadModel={openLeadModel}/></SwiperSlide>
                    })
                }
 


            </Swiper>
        </div>


    </Wrapper>)
}


const Wrapper = styled.section`

background-color: var(--bg-color);

`