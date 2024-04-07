import styled from "styled-components";
import { useState } from "react";
import { IoIosCall } from 'react-icons/io'
import { useGlobalContext } from "@/context/MyContext";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";

export default function Tabs({ vendor,openLeadsModel}) {

    // console.log(vendor.package_option.split(","))
    // console.log(vendor.package_option)

    // const packages = vendor.package_option.split(",").filter(pack=>pack);
    const packages = vendor.package_option?.split(",").map((item)=>item.trim()).filter((item)=>item)

    // console.log(packages)

    const [activeTabId, setActiveTab] = useState(1);

    // console.log(packages)

    async function handleAnchorClick(e,slug) {
        e.stopPropagation();
        await CallingRequest(slug);

    }

    return (
        <Wrapper>
            <div className="container">

                <div className="tabs-container">
                    <div className="tab-btn-container">
                        <button className={`tab-btn ${activeTabId === 1 && "selected-tab-btn"}`} onClick={() => setActiveTab(1)}>Package</button>
                        <button className={`tab-btn ${activeTabId === 2 && "selected-tab-btn"}`} onClick={() => setActiveTab(2)}>Contact Info</button>
                        <button className={`tab-btn ${activeTabId === 3 && "selected-tab-btn"}`} onClick={() => setActiveTab(3)}>About</button>

                    </div>
                    <div className="tab-content-container">
                        {
                            activeTabId === 1 && (<>
                                <ul className="first-grid-container">
                                    {
                                        packages?.map((price_package, i) => {
                                            return (
                                                <li className="info" key={i}>
                                                    {price_package}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="secound-grid-container">


                                </div>
                            </>)
                        }
                        {
                            activeTabId === 2 && (<>
                                <div className="first-grid-container">
                                    <h2 className="label">Address</h2>
                                    <p className="info">{vendor.vendor_address}</p>
                                </div>
                                <div className="secound-grid-container">
                                    <h2 className="label">Phone</h2>
                                    <p className="info">0{vendor.phone}</p>

                                </div>
                            </>)
                        }
                        {
                            activeTabId === 3 && (
                                <>
                                    <div className="first-grid-container">
                                        <h2 className="info">Years Of Experience: <span className="label">5</span></h2>

                                    </div>
                                    <div className="secound-grid-container">
                                        <h2 className="info">Events Completed: <span className="label">100</span></h2>


                                    </div>
                                </>
                            )
                        }


                        <div className="action-btns">
                            <button className="venue-card-btn" onClick={(e) => {openLeadsModel()} }>Get Quotation</button>
                            <a href={`tel:0${vendor.phone}`} onClick={(e)=>{handleAnchorClick(e,vendor?.slug)}} className="call-btn" aria-label="call icon ">
                                <IoIosCall className="call-icon" />
                            </a>

                        </div>
                    </div>
                </div>
            </div>


        </Wrapper>
    )
}


const Wrapper = styled.section`

background-color: var(--bg-color);

.tabs-container{
    /* width: 100%; */
    /* border: 1px solid black; */
    border: 2px solid var(--primary-color);

    .tab-btn-container{
        border-bottom:2px solid var(--primary-color);
        display: grid;
        grid-template-columns:repeat(3,1fr);

        .tab-btn{
            text-align: center;
            color: var(--primary-color);
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
            padding: 1rem;
            cursor: pointer;
            background-color: transparent;
            outline: none;
            border: none;
            border-left: 2px solid var(--primary-color);

        }
        .selected-tab-btn{
            color: white;
            background-color: var(--primary-color);
            border-bottom: none;
        }
    }

    .tab-content-container{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        padding: 2rem;

        .label{
            font-size: 2rem;
            font-family: "Poppins";
            font-weight: 500;
            color: var(--primary-color);
        }
        .info{
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
            color: var(--para);
            
            list-style: inside;

        }
        
    }
}





.action-btns{
    /* padding: 2rem 1rem; */
    margin-top: 1rem;
    /* padding-right: 3rem; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rem 2rem 1rem 2rem ;
    width: 100%;

    .venue-card-btn{
        border: none;
        white-space: nowrap;
        background:none;
        border: 1px solid #F33232;
        padding: 1rem 2.5rem;
        text-transform: uppercase;
        border-radius:.5rem;
        font-size: 1.8rem;
        /* width: 100%; */
        cursor: pointer;
        transition: all .3s linear;
        color: #F33232;

        &:hover{
            background-color: #F33232;
            color: white;
        }

    }
    .call-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid green;
        padding: .2rem .8rem;
        border-radius: .5rem;
        cursor: pointer;
        .call-icon{

            font-size: 30px;
            color:  var(--phone);
        }

        &:hover{
            background-color:  var(--phone);

            .call-icon{
                color: white;
            }
        }

    }


}

@media (max-width:850px) {
    .tab-content-container{
        
        grid-template-columns: repeat(1,1fr) !important;
        gap: 2rem;
        padding: 2rem;
    }
    
}

`