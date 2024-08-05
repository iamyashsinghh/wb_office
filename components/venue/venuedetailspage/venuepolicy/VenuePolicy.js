import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import PolicyCard from "./PolicyCard";


export default function VenuePolicy({venue}) {

    // console.log(venue)


    return (<Section className="section">

        <div className="container">

            <Heading text={"Venue Policy"} />

            <div className="policy-container">

                <PolicyCard  img_url={"/vpolicy/timing.png"} name={"Timming"} data={`<ul><li>Morning : ${venue.start_time_morning || '11:00:00'}-${venue?.end_time_morning || '16:00:00'}</li><li>Evening : ${venue?.start_time_evening || '19:00:00'}-${venue?.end_time_evening || '23:59:59'}</li> </ul>`}/>

                <PolicyCard  img_url={"/vpolicy/advance.png"} name={"Advance"} data={"25% at the time of booking"}/>

                <PolicyCard  img_url={"/vpolicy/alcohol.png"} name={"Alcohol"} data={`<p style="text-align: center;">Alcohol not allowed at the venue&nbsp;</p><p style="text-align: center;">Outside Alcohol allowed at the venue after getting the P-10 licence</p>`}/>

                <PolicyCard  img_url={"/vpolicy/food.png"} name={"Food"} data={`<p style="text-align: center;">Food provided by the venue&nbsp;</p><p style="text-align: center;">No outside food/caterer is allowed at the venue&nbsp;</p>`}/>

                <PolicyCard  img_url={"/vpolicy/tax.png"} name={"Tax"} data={"Taxes on F&B 5.00%"}/>

                <PolicyCard  img_url={"/vpolicy/parking.png"} name={"Parking"} data={`<p style="text-align: center;">Valet provided by the Venue&nbsp;</p> <p style="text-align: center;">Parking Space available for ${venue?.parking_space || "approx 50 - 100"} vehicles</p>`}/>

                <PolicyCard  img_url={"/vpolicy/cancellation.png"} name={"Cancellation"} data={`<div style="text-align: center;"><span>Non-cancellation</span></div>`}/>

                <PolicyCard  img_url={"/vpolicy/decoration.png"} name={"Decoration"} data={`<p style="text-align: center;">Decorators allowed at the venue without royalty&nbsp;</p><p style="text-align: center;">Decor provided by the venue&nbsp;</p>`}/>



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