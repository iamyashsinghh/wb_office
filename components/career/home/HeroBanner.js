import styled from "styled-components";
import Image from "next/image";

export default function HeroBanner() {


    return (

        <Wrapper>

            <Image src={'/career/23.png'} alt="icon" fill sizes="(100vw)" />
            <div className="overlay">
            </div>
            <div className="overlay-content">
                <h2>Work Where You Matter</h2>
                <p>Come and create something extraordinary together.</p>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
position: relative;
height: 500px;


.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .4;

}
.overlay-content{
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: .5rem;

    /* width: 100%;
    height: 100%; */
    /* z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center; */

    h2{
        color: white;
        font-family: "montserrat";
        font-size: 5rem;
        font-weight: 600;
    }
    p{
        color: white;
        font-family: "Poppins";
        font-size: 2rem;
        font-weight: 400;
    }
    
}


@media (max-width:100px) {

    height: 350px;
    
}
@media (max-width:800px) {

    height: 250px;
    
}
@media (max-width:600px) {
    height: 200px;

    .overlay-content{
   

    h2{
        font-size: 3rem;
    }
    p{
        
        text-align: center;
        font-size: 1.7;
    }
    
}
    
}
`