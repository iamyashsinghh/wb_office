import styled ,{css} from "styled-components";
import { AiOutlineDown } from 'react-icons/ai'
import {useState} from'react';
import { useEffect } from "react";
import { useRef } from "react";
import {MdKeyboardDoubleArrowUp} from 'react-icons/md'

export default function ScrollToTopButton() {

const [isVisible, setIsVisible] = useState(false);
const oldScrollValue = useRef(0);

const ScrollToTopButtonHandler = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const scrollToTop = () => {
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
      });
    };
}
const toggleVisibility = () => {
    if(window.scrollY > 300){
        
        if(oldScrollValue.current > window.scrollY){
            setIsVisible(true);
        }
    
        else{
            setIsVisible(false);
        }
    
        oldScrollValue.current = window.scrollY;
    }
    else{
        setIsVisible(false)
    }
   

};


useEffect(()=>{

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);

    })



    return (<Button show={isVisible} onClick={ScrollToTopButtonHandler}>
        {/* <AiOutlineDown className="icon" /> */}
        Go To Top
        <MdKeyboardDoubleArrowUp className="icon"/>
    </Button>)
}

const Button = styled.div`

 width: 100px;
 margin: auto;
/* height: 40px; */ 
position: fixed;
display: flex;
align-items: center;
justify-content: center;
transform: scale(.8);
opacity: 0;
visibility: hidden;
transition: all .3s linear;
bottom:30px ; right :30px;
cursor: pointer;
z-index: 99;
bottom:80px ; left:10%;


/* background:var(--secoundary-color);   fallback for old browsers */

border-radius:2rem;
padding: 5px 10px;
border: 1px solid var(--info-color);
background-color: var(--info-color);
color: white;
font-size: 1.5rem;


${({ show }) =>
    show &&
    css`
      opacity: 1;
      visibility: visible;
      transform: scale(1);

    `}

&:hover{
    opacity:.8
}


.icon{
    position:absolute;
    top:-30px;
    left:35px;
    color:var(--info-color);
    font-size:3rem;
}

`