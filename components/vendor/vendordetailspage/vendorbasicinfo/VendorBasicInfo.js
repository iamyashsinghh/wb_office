import styled from "styled-components";
import { IoIosCall } from 'react-icons/io'
import { useState } from "react";
// import { parse } from 'node-html-parser';  //This nm package is not install to use this first install from npm 
import { BiRupee } from 'react-icons/bi'
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Image from "next/image";
import TabsComponent from "../tabsComponent/TabsComponent";

export default function VendorBasicInfo({ vendor, openLeadsModel }) {
    // console.log(vendor)

    const [showSummary, setShowSumary] = useState(true);


    // const vendor_summary = parse(vendor.summary);




    async function handleAnchorClick(e, slug) {
        e.stopPropagation();
        await CallingRequest(slug);

    }

    return (<Wrapper className="section info-section">

        <div className="container-l">

            <div className="info-container">

                <div className="card info-card">

                    <h2 className="v-name">{vendor.brand_name}</h2>
                    <div className="v-desc" dangerouslySetInnerHTML={{ __html: showSummary ? vendor.summary : vendor.summary.slice(0, 500) }}></div>


                    {/* To set the read more just uncomment this make initialize showSummary with false */}
                    {/* <span className="read-more-btn" onClick={() => { setShowSumary(!showSummary) }}>  {showSummary ? "Read less" : "Read more"}</span> */}




                </div>
                <div className="package-card card">

                    <h2 className="price"><BiRupee className="rupee-icon" />{vendor.package_price}</h2>
                    <span className="price-label">Package price</span>

                    <div className="action-btns">
                        <button className="venue-card-btn" onClick={(e) => openLeadsModel()} >Get Quatation</button>
                        <a href={`tel:0${vendor.phone}`} onClick={(e) => handleAnchorClick(e, vendor?.slug)} className="call-btn" aria-label="call icon ">
                            <IoIosCall className="call-icon" />
                        </a>

                    </div>

                    <div className="bannar-img">
                        <Image
                            src="/common/vendor.jpg"
                            alt="An example image"
                            fill={true}
                            sizes="(10vw)"
                        />
                    </div>


                </div>
                <TabsComponent images={vendor.images} />



            </div>
        </div>
    </Wrapper>)
}


const Wrapper = styled.section`

background-color: var(--bg-color);

.info-container{
    padding: 0rem 1rem;
    display: grid;
    grid-template-columns: 7fr 3fr;
    align-items: start;
    gap: 2rem;

    .card{
        /* border: 2px solid var(--primary-color); */
        padding: 1rem;
    }


    .info-card{
        display: flex;
        flex-direction:column;
        gap: 1rem;

        .v-name{
            font-family: "Montserrat";
            font-size: 2.5rem;
            color: var(--primary-color);
            font-weight: 700;
        }
        .address{
            font-family: "Poppins";
            font-size: 1.7rem;
            color: var(--primary-color);
            font-weight: 400;
        }
        .v-desc,p,span{
            font-family: "Poppins" !important;
            font-size: 1.8rem !important;
            color: var(--para) !important;
            font-weight: 400 !important;

            ul,li{
                margin-top: 1rem;
                padding: 0px !important;
                list-style:none !important;
                margin-bottom: 10px;
                font-family: "Poppins" !important;
                font-size: 1.8rem !important;
                color: var(--para) !important;
                font-weight: 400 !important;
                
            }
        }

        .read-more-btn{
            color: var(--info-color);
            cursor: pointer;
            font-family: "Poppins" !important;
            font-size: 1.8rem !important;
            font-weight: 400 !important;
        }
    }
}

.package-card{
    padding-top: 2rem !important;
    /* border: 2px solid var(--primary-color); */
    max-width: 50rem;
    /* margin: auto; */
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .price{
            font-family: "Montserrat";
            display: flex;
            align-items: center;
            font-size: 2.5rem;
            color: var(--primary-color);
            font-weight: 700;

            .rupee-icon{
                font-size: 3rem;
                /* color: black; */
            }
        }
    
    .price-label{
        /* font-style: italic; */
        font-size: 1.6rem;
        line-height: normal;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);

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
                color: var(--phone);
            }

            &:hover{
                background-color:  var(--phone);

                .call-icon{
                    color: white;
                }
            }

        }

    }
    .bannar-img{
        position: relative;
        width: 100%;
        height: 400px;
    }
}

@media (max-width:800px) {

        
    .info-container{
        padding: 0rem 1rem;
        display: grid;
        grid-template-columns: 1fr;
    }
}
`