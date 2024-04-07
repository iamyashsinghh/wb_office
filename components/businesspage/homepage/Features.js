import Image from "next/image";
import { AiFillAccountBook } from "react-icons/ai";
import styled from "styled-components";

export default function Features(){



    return(<Wrapper className="section">
        <div className="container">

            <div className="feature card">
                <div className="icon-box">
                    <Image src={'/vendor-dashboard/couple.png'} alt="icon" fill sizes="(100vw)"/>
                </div>
                <h2>Reach Engaged Couples</h2>
                <p>Couples can find your shopfront and ask for information about your business.</p>
            </div>

            <div className="feature card">
                <div className="icon-box">
                    <Image src={'/vendor-dashboard/lead.png'} alt="icon" fill sizes="(100vw)"/>
                </div>
                <h2>Get More Leads </h2>
                <p>Answer directly to potential clients via email or your account dashboard.</p>
            </div>

            <div className="feature card">
                <div className="icon-box">
                    <Image src={'/vendor-dashboard/booking.png'} alt="icon" fill sizes="(100vw)"/>
                </div>
                <h2>Book More Weddings</h2>
                <p>Grow your business with Wedding Banquets by advertising on our platform.</p>
            </div>
        </div>
    
    </Wrapper>)
}

const Wrapper = styled.section`     
background-color: var(--bg-color);


.container{
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    /* align-items: start !important;  */

    .card{
        max-width: 40rem;
        border: 1px solid var(--primary-color);
        padding: 2rem;
        max-width: 40rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: white;
        flex-direction: column;

        .icon-box{
            position: relative;
            /* border: 1px solid red; */
            width: 150px;
            height: 100px;
        }
        h2{
            font-size: 2.2rem;
            font-family: "Montserrat";
            font-weight:500;
            color: var(--primary-color);
        }
        p{
            color: var(--para);
            font-family: "Poppins";
            font-size: 1.7rem;
            text-align: center;
        }
    }
}

@media (max-width:800px) {
    
    .icon-box{
            width: 100px !important;
            height: 70px !important;
        }
}

@media (max-width:600px) {

    .container{
        flex-direction: column;
        align-items: center;
    }

    
}


`