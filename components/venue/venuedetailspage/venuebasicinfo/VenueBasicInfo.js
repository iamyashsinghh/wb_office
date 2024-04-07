import styled from "styled-components";

import PriceListCard from "./PriceListCard";
import DemandCard from "@/components/miscellaneous/DemandCard";
import DiscountCard from "./DiscountCard";
import { useState } from "react";
import Head from "next/head";
import AreaCapacity from "./AreaCapacity";

//For Testing only.
// import { parse } from 'node-html-parser';    ////This nm package is not install to use this first install from npm 

export default function VenueBasicInfo({ venue,openLeadsModel,openAvailableCheck,id }) {

    // const htmldata = parse('<ul id="list"><li>Hello World</li></ul>');
    // console.log(venue.summary)

    const [showSummary, setShowSumary] = useState(false);
    // console.log(venue)
    // const venue_summary = parse(venue.summary)

    return (<Section className="section section-venue-basic-info">
        
        <div className="basic-venue-info-container">
            <div className="basic-venue-info-content">
                <div className="venue-details">
                    <h2 className="basic-venue-info-name">{venue.name || ""}</h2>
                    <p className="basic-venue-info-address">{venue.venue_address || " "}</p>

                </div>
                <div className="price-details-card">
                    <PriceListCard min_capacity={venue.min_capacity} max_capacity={venue.max_capacity} nonveg_price={venue.nonveg_price} veg_price={venue.veg_price} phone={venue.phone} slug={venue.slug} id={id} openLeadsModel={openLeadsModel}/>
                </div>
                <div className="about">
                    <h2 className="about-title">
                        About
                    </h2>
                    <div className="about-desSc"  dangerouslySetInnerHTML={{ __html: showSummary ? venue.summary : venue.summary.slice(0,500)}}></div>
                    <span className="read-more-btn" onClick={() => { setShowSumary(!showSummary) }}>  {showSummary ? "Read less" : "Read more"}</span> 

                    {/* <p className="about-desc">{`${showSummary ? venue_summary.text : venue_summary.text.slice(0, 250)} `}<span className="read-more-btn" onClick={() => { setShowSumary(!showSummary) }}>  {showSummary ? "Read less" : "Read more"}</span> */}
                    {/* </p> */}
                   
                </div>
                <div className="cards">

                    <AreaCapacity venue={venue} openAvailableCheck={openAvailableCheck}/>
                    <DemandCard />
                    <DiscountCard openLeadsModel={openLeadsModel} />

                </div>
            </div>
            <div className="venue-price-list">
                <PriceListCard min_capacity={venue.min_capacity} max_capacity={venue.max_capacity} nonveg_price={venue.nonveg_price} veg_price={venue.veg_price} phone={venue.phone} slug={venue.slug} openLeadsModel={openLeadsModel}/>
            </div>
        </div>
    </Section>)
}

const Section = styled.section`
padding: 1rem 0rem !important;
background-color: var(--bg-color);

.basic-venue-info-container{
    /* padding: 1rem; */
    /* border: 2px solid red; */
    max-width: 155rem;
    margin: auto;
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 5rem;
}

.basic-venue-info-content{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .venue-details{
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 1rem 1.5rem;


        .basic-venue-info-name{
            font-family: "Montserrat";
            font-size: 2.5rem;
            color: var(--primary-color);
            font-weight: 700;
        }
        
        .basic-venue-info-address{
            font-family: "Poppins";
            font-size: 1.7rem;
            color: var(--primary-color);
            font-weight: 400;
        }
    }
    
    .price-details-card{
        display: none;
        /* border: 1px solid black; */
    }
    
    .about{
        margin-top: 15px;
        display: flex;
        flex-direction: column; 
        gap: 1rem;
        padding: 1rem 1.5rem;

        .about-title{
            font-family: "Montserrat";
            font-size: 2.5rem; 
            color: var(--primary-color);
            font-weight: 700;
        }
        .about-desc,span,p{
            font-family: "Poppins" !important;
            font-size: 1.8rem !important;
            color: var(--para);
            text-align: justify;
            line-height: 2;
            font-weight: 400;

        }
        .read-more-btn{

    
            font-family: "Poppins" !important;
            font-size: 1.8rem !important;
            font-weight: 400;
            color: var(--info-color);
            cursor: pointer;
        }
    }

    .cards{
        display: flex;
        gap: 2rem;
        flex-direction: column;
        padding: 1rem 1.5rem;
    }
    
}


@media (max-width:700px) {
    .basic-venue-info-container{
        grid-template-columns:1fr;
    
    }
    .venue-price-list{
        display: none;
    }
    .price-details-card{
        display: block !important;
    }

    
}


`