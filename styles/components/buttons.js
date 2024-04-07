
import styled from "styled-components";

export const ButtonOutline= styled.button`

background: none;
color: var(--primary-color);
font-size: 1.8rem;
border: 2px solid var(--primary-color);
padding: .8rem 3rem;
border-radius: .5rem;
cursor: pointer;
text-transform: uppercase;
white-space: nowrap;
transition: all .3s linear;
&:hover{
    background-color: var(--primary-color);
    color: white;
}
`

export const ButtonDark = styled.button`
background-color: var(--primary-color);
white-space: nowrap;
color:white;
font-size: 1.8rem;
border:none;
padding: .8rem 3rem; 

border-radius: .5rem;
cursor: pointer;
text-transform: uppercase;


`