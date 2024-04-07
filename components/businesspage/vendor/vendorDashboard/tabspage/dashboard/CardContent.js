import styled from "styled-components";
import { FaEdit } from 'react-icons/fa'
// import InfoCard from "./InfoCard";

export default function CardContent({ user, vendor_content, setSelectedIndex }) {

    const { business_name, event_completed, yrs_exp, package_price, package_option } = vendor_content;


    return (
        <Wrapper className="section ">
            <div className="container">

                {/* <InfoCard data={{brand_name,event_completed,yrs_exp,vendor_category}} /> */}
                <Wrapper1>
                    <div className="card-title">
                        <h2 className="card-title-text">Business Details</h2>
                    </div>
                    <div className="card-item">
                        <p>Name of business:</p>
                        <h2>{business_name}</h2>
                    </div>
                    <div className="card-item">
                        <p>Business Type:</p>
                        <h2>{user.business_type === 1 ? "Venue" : "Vendor"}</h2>
                    </div>

                    {
                        user.business_type === 2 && (
                            <>
                                <div className="card-item">
                                    <p>Years of Exp:</p>
                                    <h2>{yrs_exp}</h2>
                                </div>
                                <div className="card-item">
                                    <p>Event Completed:</p>
                                    <h2>{event_completed}</h2>
                                </div>
                            </>
                        )
                    }


                    <FaEdit className="icon" title="Edit" onClick={e => setSelectedIndex(3)} />

                </Wrapper1>
                <Wrapper1>
                    <div className="card-title">
                        <h2 className="card-title-text">Package Details</h2>
                    </div>
                    
                    {/* Rendering the price based on the business type. if it is venue we display veg and non veg . If it is vendor then we display the common price. */}
                    {
                        user.business_type === 1 ? (<>
                            <div className="card-item">
                                <p>Veg Price:</p>
                                <h2>{vendor_content?.veg_price}</h2>
                            </div>
                            <div className="card-item">
                                <p>Nonveg Price:</p>
                                <h2>{vendor_content?.nonveg_price}</h2>

                            </div>
                        </>

                        ) : user.business_type === 2 ? (
                            <div className="card-item">
                                <p>Common Package:</p>
                                <h2>{package_price}</h2>
                            </div>
                        ) : null
                    }


                    {/* Showing the list of package if the user is a vendor. This is only for business_type===vendor  */}
                    {
                        user.business_type === 2 && (

                            package_option?.split(",").map((price, i) => {

                                return (
                                    <div className="card-item" key={i}>
                                        <p>Package {i + 1}:</p>
                                        <h2>{price}</h2>
                                    </div>

                                )
                            })

                        )
                    }

                    <FaEdit className="icon" title="Edit" onClick={e => setSelectedIndex(4)} />

                </Wrapper1>
                <Wrapper1>
                    <div className="card-title">
                        <h2 className="card-title-text">Content Status</h2>
                    </div>
                    <div className="card-item">
                        <p>Photos:</p>
                        <h2>Everything upto date.</h2>
                    </div>
                    {/* <FaEdit className="icon" title="Edit" onClick={e=>setSelectedIndex(5)}/> */}

                </Wrapper1>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

.container{
    display: flex;
    justify-content: space-between;
    /* flex-direction: row; */
    gap: 2rem;
}

.icon{
        position: absolute;
        z-index: 2;
        color: var(--primary-color);
        font-size: 2.5rem;
        top: 10px;
        cursor: pointer;
        right: 10px;
       }

@media (max-width:800px) {
    .container{
        flex-direction: column;
        align-items: center;
    }
    
}

`


// Info Card Design
const Wrapper1 = styled.div`
position: relative;
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