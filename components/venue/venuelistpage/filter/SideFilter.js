import styled, { css } from "styled-components";

import { useGlobalContext } from "@/context/MyContext";
import { useSwipeable } from "react-swipeable";
import {AiOutlineClose} from 'react-icons/ai';
import Filter from "./Filter";
import { BsArrowRight } from 'react-icons/bs'

export default function SideFilter({ city, locality, category, localities, venueCategories, filterQuery }) {


    const { showFilter, setShowFilter } = useGlobalContext();



    const handlers = useSwipeable({
        //Un-comment the line for swiper event on home page.

        // onSwipedLeft: (eventData) => { setShowFilter(false) },

    });

    return (
        <Wrapper show={showFilter} {...handlers}>
            <div className="filter-container">

                <div className="header">
                    <h2>Filter</h2>
                    <span onClick={e=>setShowFilter(false)}>
                        <AiOutlineClose className="icon"/>
                    </span>
                </div>

                <Filter locality={locality} filterQuery={filterQuery} localities={localities} venueCategories={venueCategories} city={city} category={category} />
                <div className="footer" onClick={e=>setShowFilter(false)}>
                    <h2 className="filter-label">Apply</h2>
                    <BsArrowRight className="arrow-icon" />

                </div>
            </div>

        </Wrapper >)





}


const Wrapper = styled.div`

transform: translateX(-100%);
/* background-color: white; */
visibility: hidden;
opacity: 0;
z-index: 10;
position: relative;
position: fixed;
transform: translateX(-100);
transition: all .3s linear;
top: 0;
left: 0;
right: 0;
width: 100%;
min-height: 100vh;
max-height: 100vh;
/* padding: 1rem; */
/* background-color:transparent; */

${({ show }) =>
        show &&
        css`
      opacity: 1;
      visibility: visible;
      transform: translateX(0%);
      
      `}
      
/* .header{
    background-color:var(--primary-color);
} */
      
.filter-container{
    box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
    max-width:90%;
    background-color:white;
    padding:1rem 2rem;
    /* max-height:195vh; */
    padding-bottom:8rem;
    position:relative;
    height:100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* border:12px solid black; */

    .header{
        display:flex;
        align-items:center;
        justify-content:space-between;

        h2{
            font-size:2.5rem;
            font-family:"Poppins";
            /* color:var(--primary-color); */
            font-weight:400;
        }

        .icon{
            font-size:3rem;
            /* color:var(--para); */

        }

    }

    .footer{
        /* box-shadow:var(--shadow) */
        border:1px solid var(--primary-color);
        font-size:1.7rem;
        display:flex;
        flex-direction:row;
        gap: 2rem;
        align-items:center;
        width:90%;
        margin:auto;
        justify-content:center;
        padding:.5rem;
        background-color:var(--primary-color);

        .filter-label{
            font-size:1.7rem;
            color:white;
        }
        
        .arrow-icon{
            color:white;
            font-size:1.7rem
        }
    }
}







`