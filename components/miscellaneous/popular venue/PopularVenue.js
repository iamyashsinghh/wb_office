import styled from "styled-components";
import Heading from "@/components/miscellaneous/Heading";
import { ButtonDark } from "@/styles/components/buttons";
import VenueSlider from "@/components/miscellaneous/VenueSlider";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/MyContext";
import Link from "next/link";

function PopularVenue({ popularVenues }) {


    const [popularVenuess, setPopularVenuess] = useState(popularVenues || []);
    const [selectedTab, setSelectedTab] = useState("banquet-halls")
    const { venueCategories, selectedCity } = useGlobalContext();

    const [selectedIndex, setSelectedIndex] = useState(0);

    // console.log(selectedTab)


    //This useEffect will run whenever a user change the tab. 
    useEffect(() => {

        async function getVenues() {

            // const url = `http://192.168.29.128/wedding_benquets/website/api/popular_venues/${selectedCity}/${selectedTab}`
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/popular_venues/${selectedTab}/${selectedCity}`

            // console.log(" URL is "  + url)
            let popularVenues = await fetch(url);
            popularVenues = await popularVenues.json();
            // console.log(popularVenues);
            setPopularVenuess(popularVenues.data);
        }

        getVenues();
        // console.log(selectedTab)

    }, [selectedTab, selectedCity])

    //tabHandler function, will update the selected tab and when selected tab change useEffect function will run and fetch the data.
    function tabHandler(e, i) {
        setSelectedTab(e.target.value);
        setSelectedIndex(i);

    }

    // console.log(popularVenuess);
    return (
        <Section className="section popular-venue-section">
            <div className="container">
                <Heading text={`Popular Venues in ${selectedCity}`} />
                <div className="tab-btn">
                    {
                        venueCategories?.map((cat, i) => {
                            return (<>
                                <TabButton className={selectedIndex === i && "selected"} key={i} value={cat.slug} onClick={(e) => tabHandler(e, i)}>{cat.name}</TabButton>
                            </>)
                        })
                    }

                </div>

                <VenueSlider venues={popularVenuess} />
            </div>
            <div className="btn">
                <Link href={`/${selectedTab}/${selectedCity}/all`}>
                    <ButtonDark>View All venues</ButtonDark>
                </Link>
            </div>
        </Section>
    )
}




export default PopularVenue;

const TabButton = styled.button`


background: none;
color: var(--primary-color);
font-size: 1.7rem;
border: 2px solid var(--primary-color);
padding: .6rem 1.6rem;
border-radius: .4rem;
cursor: pointer;
text-transform: uppercase;
white-space: nowrap;
transition: all .3s linear;
&:hover{
    background-color: var(--primary-color);
    color: white;
}

.selected{
    background-color: var(--primary-color);
    color: white;

}

`

const Section = styled.section`

background-color: var(--bg-color);
position: relative !important;

.tab-btn{
    margin: 1rem 0 3rem 0;
    display: flex;
    gap: 2rem;
    overflow-x: scroll;
    /* flex-wrap: wrap; */

    &::-webkit-scrollbar {
        display: none;
    }

}
.selected{
    color: white;
    background-color: var(--primary-color);
    /* background-color: white; */
}

.btn{
    margin-top:3rem;
    text-align: center;
}

/* .popular-venue-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 3rem;
} */

@media (max-width:900px) {
    .tab-btn{
        flex-wrap: nowrap;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none;
        }

    }
    
}

`