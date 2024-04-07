import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import VenueSlider from "@/components/miscellaneous/VenueSlider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function SimilarVenue({similar_packages}) {

    return (
        <Section className="section similar-venue-section">
            <div className="container">
                <Heading text={"Browse Similar Wedding Venues"} />
                <VenueSlider venues={similar_packages}/>
            </div>
        </Section>
    )
}

export default SimilarVenue;

const Section = styled.section`

background-color: var(--bg-color);
position: relative !important;



`