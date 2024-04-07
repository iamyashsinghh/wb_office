import React from 'react'
import styled from 'styled-components'
import VenueCity from './VenueCity'

function CityVenueHall({cities}) {

    return (
        <Section className='section section-city-venue'>
            <div className="container">
                <h2 className='venue-heading'>Wedding venues by location</h2>

              
                <VenueCity cities={cities}/>

            </div>
        </Section>
    )
}

const Section = styled.section`

font-family: Poppins;

.venue-heading{
    font-size: 2rem;
    padding-bottom: 3rem;
    letter-spacing: 1px;
}

`

export default CityVenueHall