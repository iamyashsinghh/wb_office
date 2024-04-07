import styled from "styled-components";
import {BiSlider} from 'react-icons/bi'

import { useGlobalContext } from "@/context/MyContext"
export function FilterButton() {
    

    const { setShowFilter} = useGlobalContext();
    return (<Button onClick={()=>{setShowFilter(true)}}>
        <BiSlider className="filter-icon"/> 
        <span className="filter-label">Filter</span>
    </Button>)
}


const Button = styled.div`
display: none;
position: fixed;
bottom: 30px;
/* right: 30px; */
left: 30px;
background-color: var(--secoundary-color);
background-color: var(--primary-color); 
/* background-color: white; */
border-radius: 3rem;
padding: .5rem .8rem ;
border: 2px solid var(--primary-color);
display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
padding: 1rem 3rem;

.filter-icon{
    color: white;
    /* color: gray; */
    font-size: 3rem;
}

.filter-label{
    font-size: 2rem;
    font-family: "Poppins";
    color: white;
}

@media (max-width:1000px) {
    /* display: block; */
    
}
`