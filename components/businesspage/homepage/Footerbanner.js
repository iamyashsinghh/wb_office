import { ButtonDark } from "@/styles/components/buttons";
import Image from "next/image";
import styled from "styled-components";

export default function Footerbanner() {


    return (<Wrapper className=" section-footer-banner">
        <Image
            src={'/business/footer-banner.png'}
            alt="image"
            fill={true}
            sizes="(100vw)"

        />
        <div className="overlay-content">
            <h2>Grow your business with Wedding Banquets!</h2>
            <ButtonDark>Signup</ButtonDark>
        </div>

    </Wrapper>)
}


const Wrapper = styled.section`

position: relative;
width: 100%;
height: 400px;
/* border: 1px solid red; */


.overlay-content{
    position: absolute;
    top: 40%;
    left: 10%;
    /* border: 1px solid red; */
    min-width:50rem ;
    max-width:60rem ;
    text-align: center;
    color: white;

    h2{
        font-size: 3rem;
        font-family: "Montserrat";
        font-weight: 600;
        margin-bottom: 20px;
    }
    
}

`