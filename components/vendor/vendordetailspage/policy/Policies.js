import styled from "styled-components";


export default function Policies() {


    return (<Wrapper className="section">
        <div className="container">
            <div className="policies-container">
                <div className="booking-policy policy">
                    <h2 className="policy-title">Booking Policy </h2>
                    <p className="policy-description">Payment of 40% of the package is needed to be paid in advance, the rest can be paid later to the vendor on the day of the event.</p>
                </div>
                <div className="cancellation-policy policy">
                    <h2 className="policy-title">Cancellation Policy</h2>
                    <p className="policy-description">The booking is non-cancellable. However, the booking can be shifted to another date with no extra charge.</p>
                </div>
                <div className="terms policy">
                    <h2 className="policy-title">
                        Terms
                    </h2>
                    <p className="policy-description">TRANSPORTATION CHARGES PROVISION: No transportation costs shall be applicable within the city. However, if the event is staged outside the city, then Travel & Stay Charge shall be paid by the client.</p>
                </div>
            </div>
        </div>



    </Wrapper>)
}



const Wrapper = styled.section`

background-color: var(--bg-color);


.policies-container{

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    .policy{
        padding: 2rem 5rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        /* border: 2px solid var(--primary-color); */
        border: 8px solid #f9f9f9;

        align-items: center;
    

        .policy-title{
            font-size: 2rem;
            color: var(--primary-color);
            font-weight: 500;

        }
        .policy-description{
            color: var(--para);
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 400;
            line-height: 2;
        }


    }
}
@media (max-width:1000px) {
    .policies-container{
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
}

`