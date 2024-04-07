import styled from "styled-components";
import {GiSandsOfTime} from 'react-icons/gi'
export default function DemandCard() {

    return (
        <Wrapper>

            <GiSandsOfTime size={30}/><h2>Hurry UP! This Venue Is In High Demand</h2>

        </Wrapper>
    )

}


const Wrapper = styled.div`
max-width: 100%;
display: flex;
gap: 2rem;
border-radius: 1.5em;
align-items: center;
background-image: url("/common/high_demand.png");
padding: 1rem 2rem;
margin-top: 1rem;
h2{
    font-size: 2rem;
    font-family: "Poppins";
    font-weight: 500;
    color:var(--primary-color);

}



`