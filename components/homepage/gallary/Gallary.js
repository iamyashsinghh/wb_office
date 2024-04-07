
import styled from "styled-components"
import Heading from "../../miscellaneous/Heading";
import Image from "next/image";
import { ButtonDark, ButtonOutline } from "@/styles/components/buttons";
function Gallary() {

    return (
        <Section className="section section-gallary">
            <Heading text={"Wedding Photos"} desc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}/>
            <div className="container">
                <div className="gallary">
                    <div className="photo photo-1">
                        <Image
                            src="/img1.png"
                            alt="image"
                            fill={true}
                            sizes="(100vw)"
                        />
                    </div>
                    <div className="photo photo-2">
                        <Image
                            src="/img2.png"
                            alt="image"
                            fill={true}
                            sizes="(100vw)"
                        />
                    </div>
                    <div className="photo photo-3">
                        <Image
                            src="/img3.png"
                            alt="image"
                            fill={true}
                            sizes="(100vw)"
                        />
                    </div>
                    <div className="photo photo-4">
                        <Image
                            src="/img4.png"
                            alt="image"
                            fill={true}
                            sizes="(100vw)"
                        />
                        <span className="text-overlay">
                            <p>10,000 + </p>
                            <p>Satisfied Clients</p>
                        </span>
                    </div>
                    {/* Hello world */}
                </div>
                <div className="btn">
                    <ButtonDark>View All Venues</ButtonDark>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
background: #FFEEEE;

.gallary{
    /* border: 1px solid red; */
    padding: 2rem 0rem;
    display: grid;
    gap: 1rem;
    grid-template-columns:1fr 1fr 1fr 1fr;

    .photo-1{
        grid-column: 1 / 3;
        grid-row:1/3;
        height: 600px;
    }
    .photo-2{
        grid-row:1/3;
    }
    .photo-4{
        position: relative;

        .text-overlay{
            position: absolute;
            bottom: 20px;
            left: 20px;
            z-index: 12;
            /* border: 1px solid red; */

            p{
                color: white;
                font-family: "Poppins";
                font-weight: bold;
                font-size: 2.5rem;
            }
        }
    }

    .photo{
        /* border: 1px solid red; */
        position: relative;
        width: 100%;
        /* height: 0; */
        padding-Bottom: 50%;
        border-radius:.5rem;
        overflow:hidden;
    }
}

.btn{
    margin-top:4rem;
    text-align:center;
}


@media (max-width:750px) {

    .photo-2{
        display: none;
    }
    .photo-3{
        grid-column: 3/-1;
    }
    .photo-4{
        grid-column: 3/-1;
    }
    .photo-1{
        height: 500px !important;
    }

}
@media (max-width:600px) {


    .photo-1{
        grid-column: 1 / 3;
        grid-row:1/3;
        height: 400px !important;
    }

}
`
export default Gallary;