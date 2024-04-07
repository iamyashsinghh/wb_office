import Heading from '@/components/miscellaneous/Heading'
import React from 'react'
import styled from 'styled-components'
import FeaturesCard from './FeaturesCard'


export default function VenueFeatures() {
    return (
        <Section>


            <div className="container">
                <Heading text={"Features Of Venue"} />

                <div className="features-card-container">
                    
                    <FeaturesCard img_url={"/vfeature/staff.png"} data={"Lovely and humble staff"}/>
                    <FeaturesCard img_url={"/vfeature/food.png"} data={"Serves Vegetarian and Non-vagetarian meals"}/>
                    <FeaturesCard img_url={"/vfeature/nearby.png"} data={"30 mins away from Indira Gandhi International Airport"}/>
                    <FeaturesCard img_url={"/vfeature/parking.png"} data={"Ample parking space plus valet"}/>


                </div>
                
            </div>
        </Section>
    )
}

const Section = styled.section`
padding: 1rem 0rem;
background: var(--bg-color);
.features-card-container{
    padding: 1.5rem 0rem;
    display: grid;
    /* align-items: start; */
    justify-content: start;
    grid-template-columns: repeat(4,1fr);
    gap: 5rem;
}


@media (max-width:950px) {
    .features-card-container{
        padding: 1.5rem 0rem;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 5rem;
    }
    
}
`