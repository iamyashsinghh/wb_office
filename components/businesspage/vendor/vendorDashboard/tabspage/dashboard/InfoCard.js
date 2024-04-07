import styled from "styled-components";


export default function InfoCard({data}) {


    return (
        <Wrapper>
            <div className="card-title">
                <h2 className="card-title-text">Business Details</h2>
            </div>
            <div className="card-item">
                <p>Name of business:</p>
                <h2>{data?.brand_name}</h2>
            </div>
            <div className="card-item">
                <p>Business Category:</p>
                <h2>{data?.vendor_category}</h2>
            </div>
            <div className="card-item">
                <p>Years of Exp:</p>
                <h2>{data?.yrs_exp}</h2>
            </div>
            <div className="card-item">
                <p>Event Completed:</p>
                <h2>{data?.event_completed}</h2>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
/* min-width: 30rem; */
width: 30%;
flex-direction: column;
background-color: var(--bg-color);
padding: 2rem;
border-radius:1rem;
display: flex;
gap: 2rem;

.card-title-text{
    font-size: 2rem;

}
.card-item{
    p{
        font-size: 1.8rem;
        color: var(--para);
        font-family: "Poppins";
    }
    h2{
        font-size: 1.8rem;
        font-family: "Poppins";

    }
}


@media (max-width:800px) {
    width: 90%;
    /* max-width: 50rem; */
    
}
`