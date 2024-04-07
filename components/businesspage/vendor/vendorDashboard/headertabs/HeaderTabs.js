import styled from "styled-components";
// import Image from "next/image";
import { useState } from "react";
import {RxDashboard} from 'react-icons/rx'
import {MdOutlineContactPage} from 'react-icons/md'
import {TiBusinessCard} from 'react-icons/ti'
import {RiPriceTag2Line} from 'react-icons/ri'
import {BiPhotoAlbum} from 'react-icons/bi'
import {AiOutlineSetting} from 'react-icons/ai'
export default function HeaderTabs(props) {

    const {selectedIndex,setSelectedIndex} = props;
    return (
        <Wrapper className="section">
            <div className="container">
                <div className="tabs-container">
                    <div className={`tab ${selectedIndex == 1 ? "selected" : ""}`} onClick={()=>setSelectedIndex(1)}>
                        <RxDashboard className="tab-icon"/>
                        <span className="tab-title"> Dashboard</span>
                    </div>
                    <div className={`tab ${selectedIndex == 2 ? "selected" : ""}`} onClick={()=>setSelectedIndex(2)}>
                        <MdOutlineContactPage className="tab-icon"/>
                        <span className="tab-title"> Perosnal</span>
                    </div>
                    <div className={`tab ${selectedIndex == 3 ? "selected" : ""}`} onClick={()=>setSelectedIndex(3)}>
                        <TiBusinessCard className="tab-icon"/>
                        <span className="tab-title"> Business</span>
                    </div>
                    <div className={`tab ${selectedIndex == 4 ? "selected" : ""}`} onClick={()=>setSelectedIndex(4)}>
                        <RiPriceTag2Line className="tab-icon"/>
                        <span className="tab-title"> Pricing</span>
                    </div>
                    <div className={`tab ${selectedIndex == 5 ? "selected" : ""}`} onClick={()=>setSelectedIndex(5)}>
                        <BiPhotoAlbum className="tab-icon"/>
                        <span className="tab-title">Photos</span>
                    </div>
                    <div className={`tab ${selectedIndex == 6 ? "selected" : ""}`} onClick={()=>setSelectedIndex(6)}>
                        <AiOutlineSetting className="tab-icon"/>
                        <span className="tab-title">Setting</span>
                    </div>
                </div>
            </div>


        </Wrapper>
    )

}

const Wrapper = styled.section`

/* background-color: var(--bg-color); */
padding: 1rem 1rem 0rem 1rem !important;
border-bottom : 1px solid silver;
border-top : 1px solid silver;

.container{
    padding: 0rem 1rem !important;

}
.tabs-container{
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 2rem;
    .tab{
        /* border: 1px solid red; */
       
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 1rem;
        gap: .5rem;
        .tab-icon{
            font-size: 5rem;
            color: var(--para);
        }

        .tab-title{
            font-size: 1.8rem;
            color: var(--para);
            text-align: center;
            /* white-space: nowrap; */

            font-family: "Poppins";

        }

    }

    .selected{
        border-bottom: 3px solid var(--primary-color);
    }
}

@media (max-width:600px) {

    .tabs-container{
        /* width: 100%; */
        overflow-x: scroll;
        &::-webkit-scrollbar {
           display: none;
}
        /* overflow-x: hidden; */
    }

    .tab{

        .tab-icon{
            font-size: 4rem !important;
            color: var(--para);
        }

        .tab-title{
            font-size: 1.8rem;
            color: var(--para);
            text-align: center;
            font-family: "Poppins";
            white-space: nowrap;

        }

    }
}
`