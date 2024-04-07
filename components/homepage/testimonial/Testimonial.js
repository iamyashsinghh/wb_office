import styled from "styled-components";
import TestimonialCard from "./TestimonialCard";
import NavigationButton from "@/components/miscellaneous/NavigationButton";
import Heading from "@/components/miscellaneous/Heading";
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import {Autoplay, Pagination, Navigation } from "swiper";

export default function Testimonial() {


    return (
        <Section className="section section-testimonial">
            <Heading text={'What our client say'} desc={"Discover what our clients have to say about their experience with Wedding Banquets."} />
            <div className="container">
                {/* <p>Discover what our clients have to say about their experience with Wedding Banquets.</p> */}
                {/* <div className="testimonial-cards">
                    <TestimonialCard />
                    <TestimonialCard />
                    <TestimonialCard />

                </div> */}

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        450:{

                            slidesPerView:2,
                            spaceBetween: 30,
                        },
            
                        700: {
                          slidesPerView:3,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 50,
                        },
                      }}
                    // navigation={true}
                    pagination={true} 
                    modules={[ Autoplay ,Navigation,Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <SwiperSlide><TestimonialCard /></SwiperSlide>
                    <NavigationButton/>

                </Swiper>
            </div>

        </Section>
    )
}

const Section = styled.section`

position: relative !important;

.mySwiper{
    position: static;
    /* padding: 0 6rem; */
    /* width: 40rem; */
}




`