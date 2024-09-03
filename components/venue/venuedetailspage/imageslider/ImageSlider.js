//This same image slider component is used in the vendor details page.


import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { FaLayerGroup } from 'react-icons/fa'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Pagination } from "swiper";
import RatingCard from "@/components/miscellaneous/RatingCard";


//For Image Gallay 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Assured from "@/components/miscellaneous/Assured";
import RatingCardDynamic from "@/components/miscellaneous/RatingCardDynamic";


export default function ImageSlider({ images, wb_assured, altname, rating, ratingcount }) {

    const [open, setOpen] = useState(false);


    //conveting the images into array. images are in string sepreated by comms, some images may container value, To handle the runtime error we do this.
    images = images ? images.split(",") : [];



    //For image gallary
    const slides = images.map(image => ({ src: `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}` }));

    return (
        <Section className="section section-image-slider">
            <div className="slider-container">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    grabCursor={true}
                    // keyboard={{
                    //     enabled: true,
                    // }}
                    breakpoints={{
                        769: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                    }}
                    // scrollbar={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Keyboard, Scrollbar, Pagination]}
                    className="mySwiper"
                >
                    {
                        images?.slice(0,4).map((url, i) => {
                            return (

                                <SwiperSlide className="img-container" key={i}>
                                    {/* <img src="/img-slider1.png" /> */}
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${url}`}
                                        fill
                                        sizes="(100vw)"
                                        alt={altname}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }

                    {/* <IoIosShareAlt className="share-icon" title="Share venue"/> */}

                    <div className="rate">
                        <RatingCardDynamic rating={rating} ratingcount={ratingcount} slug={0} />
                    </div>


                        {
                            wb_assured==1 && (<Assured/>)
                        }

               
                    <div className="view-gellary-contianer" onClick={() => setOpen(true)}>
                        <FaLayerGroup className="gallary-icon" /> <h2> View Gallery </h2>
                    </div>


                </Swiper>
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                plugins={[Zoom,Fullscreen,Counter]}
                counter={{ container: { style: { top: "unset", bottom: 0,fontSize:"2rem" } } }}
                slides={slides}
            />
        </Section>
    );
}


const Section = styled.div`
background-color:var(--bg-color);
/* border: 5px solid red; */
z-index: 0;
padding: 0px 0px !important;

.slider-container{       
    //max-width: 155rem;
    margin: auto;   
}

.mySwiper{
    position: relative;


    .rate{
        position: absolute;
        z-index: 1;
        bottom: 10px;
        right: 10px;
    }

    .img-container ,img{
        position: relative;
        height: 450px;
        width: 100%;
    }



    .view-gellary-contianer{
        cursor: pointer;
        position: absolute;
        left: 15px;
        bottom: 10px;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: white;
        /* border:3px solid var(--secoundary-color) ; */
        border:1px solid white;
        padding:.5rem 1.5rem;
        color: var(--secoundary-color);
        transition: linear .3s all;
        background-color: #00B28A;
        
        &:hover{
            transform: scale(1.05,1.05);
        }
    }
    .gallary-icon{
        color: var(--secoundary-color);
        font-size: 1.8rem;
        color: #fdcd00;


    }
    h2{
        font-family: "Poppins";
        font-weight: 600;
        font-size: 1.5rem;
        color: white;
    }
}


@media (max-width:600px) {
    .mySwiper{
        position: relative;
        /* border: 1px solid red; */

        .img-container,img{
            height: 250px;
            width: 100%;
        }
    }

}
`