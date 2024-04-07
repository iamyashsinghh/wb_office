import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import PolicyCard from "./PolicyCard";


export default function VenuePolicy({venue}) {

    // console.log(venue)


    return (<Section className="section">

        <div className="container">

            <Heading text={"Venue Policy"} />

            <div className="policy-container">

                <PolicyCard  img_url={"/vpolicy/timing.png"} name={"Morning/Evening"} data={`<ul><li>${venue.start_time_morning}-${venue?.end_time_morning}</li><li>${venue?.start_time_evening}-${venue?.end_time_evening}</li> </ul>`}/>

                <PolicyCard  img_url={"/vpolicy/advance.png"} name={"Advance"} data={venue?.advance || "30% at the time of booking"}/>

                <PolicyCard  img_url={"/vpolicy/alcohol.png"} name={"Alcohal"} data={venue?.alcohol}/>

                <PolicyCard  img_url={"/vpolicy/food.png"} name={"Food"} data={venue?.food}/>

                <PolicyCard  img_url={"/vpolicy/tax.png"} name={"Tax"} data={venue?.tax || "Taxes on F&B 18.00%"}/>

                <PolicyCard  img_url={"/vpolicy/parking.png"} name={"Parking"} data={venue?.parking_at}/>

                <PolicyCard  img_url={"/vpolicy/cancellation.png"} name={"Cancellation"} data={venue?.cancellation_policy}/>

                <PolicyCard  img_url={"/vpolicy/decoration.png"} name={"Decoration"} data={venue?.decoration}/>



                {/* <PolicyCard  img_url={"2.jpeg"}/>
                <PolicyCard  img_url={"7.jpeg"}/>
                <PolicyCard  img_url={"7.jpeg"}/>
                <PolicyCard  img_url={"15.jpeg"}/>
                <PolicyCard  img_url={"10.jpeg"}/>
                <PolicyCard  img_url={"12.jpeg"}/>
                <PolicyCard  img_url={"13.jpeg"}/> */}
            </div>
        </div>

    </Section>)
}

const Section = styled.div`

background: var(--bg-color);

.policy-container{
    /* border: 2px solid black; */
    display: grid;
    grid-template-columns:repeat(4,1fr);
    gap: 5rem;
}



@media (max-width:1000px) {

    .policy-container{
        display: grid;
        grid-template-columns:repeat(3,1fr);
        gap: 5rem;
    }

    
}
@media (max-width:800px) {

    .policy-container{
        gap: 3rem;
    }
}
@media (max-width:700px) {

    .policy-container{

        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
}
`