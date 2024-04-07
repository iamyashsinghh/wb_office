

import styled from "styled-components";
import Navbar from "./Navbar";
import Image from "next/image";

export default function Header() {

    return (
        <Wrapper>
            <Navbar />
            <Image
                className="head-img"
                src="/common/head.png"
                alt="An example image"
                fill={true}
                sizes="(100vw)"
                priority
            />  
            
        </Wrapper>
    )
}



const Wrapper = styled.header`
position: relative;
z-index: 999;
width: 100%;
height: 100px;


 &::before{
     position: absolute;
     content: "";
     background-color: black;
     /* opacity: .8; */
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     right: 0;
 }

 
@media (max-width:1000px) {
    height: 8rem;
    top: 0px;
    position: sticky;
    
}

@media (max-width:600px) {
    height: 7rem;
    z-index: 9;
    
}


 `
