// This slider doesn't have width, wrap in container other wise it will take full width.
// import NavigationButton from "./NavigationButton";
import VenueCard from "./VenueCard";
import styled from "styled-components";
import useLeadModel from "@/lib/hook/useLeadModel";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalContext } from "@/context/MyContext";
import useCallConversion from "@/lib/hook/useCallConversion";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Autoplay } from "swiper";

export default function VenueSlider({venues}) {
    // console.log(venues)

    const {selectedCity} = useGlobalContext();      //will pass to the card for card href 
    const {openLeadModel} = useLeadModel();         //To open the lead, openeadModel function is optimised with useCallback
    const {callConversion} = useCallConversion();         //For call conversion

    return (<>
        <Div className="popular-venue-container">

            <Swiper
                slidesPerView={2}
                // centeredSlides={true}
                spaceBetween={180}
                loop={true}
                // centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}

                breakpoints={{
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 100,
                    },

                    500: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {
                    venues?.map((venue)=>{      //VenueCard is memoised with memo(). now it will only rerender when the props change.
                        return( <SwiperSlide key={venue.id}><VenueCard venue={venue} openLeadModel={openLeadModel} callConversion={callConversion} selectedCity={selectedCity}/></SwiperSlide>)
                    })

                }
            </Swiper>
        </Div>
    </>)
}



const Div = styled.div`

.mySwiper{
    position: static;
    overflow: hidden;


}

`