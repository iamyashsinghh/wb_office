import Heading from "@/components/miscellaneous/Heading";
import Image from "next/image";
import styled from "styled-components";

export default function Showcase() {


    return (<Wrapper className="section section-showcase">
        <div className="container">
            <Heading text={"Make your business presence impactful"} />

            <div className="showcase-container">
                <div className="showcase-content-container">
                    <ul className="showcase-content-items">
                        <li  className="showcase-content-item">
                        Make your presence visible to couples on top search engines with your tailor made, mobile friendly Wedding Banquets shopfront.</li>

                        <li className="showcase-content-item">Reach out to more engaged couples and generate lead details immediately to your phone and email. </li>

                        <li className="showcase-content-item">Keep in check your performance and get expert advice to help you with your listings.</li>
                    </ul>

                </div>
                <div className="showcase-banner-container">
                    <div className="showcase-banner">
                        <Image
                            src={'/business/round.png'}
                            fill={true}
                            alt="image"
                            sizes="(100vw)"
                        />
                    </div>
                </div>
            </div>
        </div>

    </Wrapper>)
}


const Wrapper = styled.section`



.showcase-container{
    display: grid;
    grid-template-columns: 1fr 1fr;


}

.showcase-content-container{
    /* border: 1px solid red; */
    display: flex;
    padding: 8rem 5rem;
    align-items: center;

    .showcase-content-items{
        display: flex;
        flex-direction: column;
        gap: 1rem;

    }
    .showcase-content-item{
        list-style: disc;
        color:var(--para);
        font-family: "Poppins";
        font-size: 1.8rem;
        
    }
}

.showcase-banner-container{
    /* border: 1px solid red; */

    .showcase-banner{
        position: relative;
        height: 400px;
        margin: auto;
        max-width: 45rem;
        /* margin: auto; */
        border-radius:50%;
        overflow: hidden;
        /* border: 1px solid red; */
        box-shadow: 1px 1px 15px 0px silver;
    }
}

@media (max-width:800px) {

    .showcase-container{
    display: grid;
    grid-template-columns: 1fr ;


}
@media (max-width:600px) {

    .showcase-banner{
        /* border: 1px solid black; */
        height: 350px !important;
        margin: auto;
        /* max-width: 10rem; */
    }
    .showcase-content-container{
    /* border: 1px solid red; */
    
    padding: 2rem 5rem 5rem 5rem;
    }


}

    
}

`