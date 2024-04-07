import styled from "styled-components";
import Heading from "../../miscellaneous/Heading";
import Image from "next/image";
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

function HowItWorks() {



    return (
        <Section className="section howitwork-section">

            <div className="howitwork-container">

                <div className="details">
                    <Heading text={"How it Works"} desc={"Make your event planning experience a breeze!"} />
                    <div className="how-it-work-items">
                        <div className="how-it-work-item">
                        <div className="icon">
                                <Image
                                    src={'/howitwork/1.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">SHORTLIST VENUES </h2>
                                <p className="description">Fill in the details of your preferences and get customised recommendations and pricing options.</p>
                            </div>

                        </div>
                        <div className="how-it-work-item">
                            <div className="icon">
                                <Image
                                    src={'/howitwork/2.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">GUIDED VISITS </h2>
                                <p className="description">Our Venue Manager will give you a brief tour of the site, as we firmly believe in transparency and honesty.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} />

                        </div>
                        <div className="how-it-work-item">
                        <div className="icon">
                                <Image
                                    src={'/howitwork/3.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">BOOK VENUE</h2>
                                <p className="description">Finalise with the vendor the best deals we have for you in our Pandora’s Box.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} />

                        </div>
                        <div className="how-it-work-item">
                        <div className="icon">
                                <Image
                                    src={'/howitwork/4.png'}
                                    fill={true}
                                    sizes="(100vw)"
                                    alt="icon"
                                />
                            </div>
                            <div className="item-details">
                                <h2 className="title">BOOK VENDORS</h2>
                                <p className="description">Experience enriching wedding planning with our 100% trusted and verified vendors.</p>
                            </div>
                            <BsThreeDotsVertical className="dot" sizes={30} />
                        </div>
                    </div>
                </div>
                <div className="img">
                    <Image
                        src="/howitwork/9.png"
                        alt="An example image"
                        fill={true}
                        sizes="(100vw)"
                    />
                </div>
            </div>

        </Section>
    )
}

export default HowItWorks;




const Section = styled.section`

.img{
    
    position:relative;
    max-width: 70rem;
    height:600px;
}

.howitwork-container{

    display:grid;
    /* grid-template-columns:55fr 45fr; */
    grid-template-columns:1fr 1fr;
    align-items: center;

    /* gap: 5rem; */
}

.details{
    /* border: 1px solid black; */
    padding: 5rem 1rem;
}

.how-it-work-items{
    margin-top:4rem;
    display: flex;
    flex-direction:column;
    align-items: center;
    /* border: 1px solid red; */
    gap: 4rem;
    
    .how-it-work-item{
        position: relative;
        display: flex;
        justify-content: start;
        gap: 2rem;
        max-width:50rem;
        /* padding: 1rem; */
        /* border: 1px solid red; */

        .title{
            font-size:2rem;
        }
        .description{
            font-family: "Poppins";
            font-size:1.5rem;
            color:var(--para);
        }

        .icon{
            /* border: 1px solid black; */
            position: relative;
            overflow: hidden;
            /* border-radius:50%; */
            /* height: 65px; */
            min-width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            /* background:var(--primary-color); */

            &:first-child{
                color:white;
            }
        }
        .dot{
            font-size: 4rem;
            color:var(--primary-color);
            position: absolute;
            left:8px;
            top:-45px;
        }
    }
}

@media (max-width:900px) {
    .img{
    position:relative;
    height:450px;
}

.howitwork-container{


    grid-template-columns:1fr 1fr;
}

}
@media (max-width:700px) {

.img{
    display: none;
}
.details{
    padding: 4rem;

}
.howitwork-container{

    display:grid;
    grid-template-columns:1fr;
}


}

@media (max-width:600px) {


.details{
    padding: 2rem;

}


}

`