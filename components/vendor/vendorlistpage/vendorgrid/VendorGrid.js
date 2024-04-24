
import styled from "styled-components";
import VendorCard from "./VendorCard";
import { useState, useRef, useEffect } from "react";
import useLeadModel from "@/lib/hook/useLeadModel";
import { Spinner2 } from "@/styles/components/spinner";

export default function VendorGrid({ vendors, category, city, locality }) {

    const { data: vendors_list, count } = vendors;

    //To open leadModel 
    const { openLeadModel } = useLeadModel();



    let page = useRef(1)
    const [hasMore, setHasMore] = useState(true);
    const [vendorLists, setVendorLists] = useState(vendors_list || null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setVendorLists(vendors_list)
    }, [vendors_list])


    //This will update the hasmore state.
    useEffect(() => {
        setHasMore(vendorLists.length >= count ? false : true)

    }, [vendorLists])



    async function fetchMoreVendors() {
        try {
            setLoading(true)
            if (vendorLists.length >= count) {
                // console.log("Hy")
                setHasMore(false)
            }
            page.current = page.current + 1;
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}/${page.current}`
            // lists = await fetch(`http://192.168.29.128/wedding_benquets/website/api/venues_or_vendors_listing/banquet-halls/${city}/${locality}/${page.current}`);
            let lists = await fetch(url)
            lists = await lists.json();
            lists = lists.data;
            setVendorLists([...vendorLists, ...lists]);

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }




    }


    return (
        <Wrapper className="section vendor-grid-section">
            <div className="container">

                <div className="card-container">

                    {
                        vendorLists?.map((vendor) => {
                            return (<VendorCard key={vendor.key} vendor={vendor} openLeadModel={openLeadModel} />)
                        })
                    }
                </div>

                {
                    loading ? <div style={{ textAlign: "center" }}> <Spinner2 /> </div> : null
                }
                {
                    hasMore ? (<div className="load-more-btn-container"> <button className="load-more-btn" onClick={fetchMoreVendors}>View More</button></div>) : (<center style={{fontSize:"1.5rem"}}>You have seen it all</center>)
                }


            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`
padding-top: 0 !important;
/* border: 1px solid red; */
/* padding-top: 0rem !important; */ 

.container{
    /* border: 2px solid green; */

    .load-more-btn-container{
        text-align: center;
        margin-top: 1rem;
    }
    .load-more-btn{
        /* max-width: 15rem; */
        margin: auto;
        border: none;
        outline: none;
        background-color: #F1F5FA;
        font-size: 1.8rem;
        font-family: "Poppins";
        padding: 1rem 2rem;
        cursor: pointer;
        transition: all .3s linear;
        background-color: var(--secoundary-color);
        color: white;
        border-radius: 5rem;

        /* &:hover{
            color: var(--para);
        } */

        
    }
}

.card-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem;
    gap: 2rem;

}
 @media (max-width:1000px) {
    .card-container{
        grid-template-columns:repeat(auto-fit, minmax(45%, auto))
    }
}

@media (max-width:600px) {
    .card-container{
        grid-template-columns:1fr;
    }
} 
`