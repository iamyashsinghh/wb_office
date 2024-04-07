
import styled from "styled-components";
import PhotoCard from "../photo/PhotoCard";
import NavigationButton from "@/components/miscellaneous/NavigationButton";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation } from "swiper";
import Heading from "@/components/miscellaneous/Heading";


export default function PhotoGrid({ images }) {

    // console.log(images)
    return (

        <Wrapper className="seciton ">
            <div className="container">

                <Heading text={"Business Photos"}/>

                <div className="slider-container">



                    <Swiper

                        slidesPerView={1.2}
                        spaceBetween={5}
                        freeMode={true}
                        breakpoints={{

                            500: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            800: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 3.5,
                                spaceBetween: 10,
                            },
                        }}
                        // navigation={true}
                        modules={[FreeMode, Navigation]}
                        className="mySwiper"
                    >

                        {
                            images?.split(",").map((img, i) => {
                                return <SwiperSlide key={i}><PhotoCard url={img} key={i} /></SwiperSlide>
                            })
                        }
                        <NavigationButton direction={"left"} />
                        <NavigationButton direction={"right"} />


                    </Swiper>

                </div>
            </div>


        </Wrapper>
    )
}


const Wrapper = styled.section`

margin-bottom: 2rem;

.slider-container{
    background-color: var(--bg-color);
    padding: 1rem;
    border-radius: 2rem;

}

`