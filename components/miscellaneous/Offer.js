import styled from "styled-components";



function Offer(){



    return (<Section>
            <div className="container">
                <marquee className="main-offer">Get Up to 40% Discount On All Our Services | Guaranteed Unbeatable Prices! </marquee>
            </div>
        
    </Section>)
}

export default Offer;


const Section = styled.div`

background: var(--primary-color);
color: white;

.main-offer{
    padding: 0rem 1rem;
    /* text-align: center; */
    font-family: "Poppins";
    font-size: 1.8rem;
    
}


`