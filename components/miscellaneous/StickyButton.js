import styled from "styled-components"
import {IoIosCall} from 'react-icons/io'
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import useCallConversion from "@/lib/hook/useCallConversion";

export default function StickyButton({ openLeadsModel,phone,slug,id }) {

    const {callConversion} = useCallConversion();         //For call conversion

    async function handleAnchorClick(e,slug) {
        // e.stopPropagation();
        await CallingRequest(slug);

    }

    return (
        <Wrapper>
            <button className="btn-dark" onClick={openLeadsModel}>See Price</button>
   
        
            <a href={`tel:0${phone}`} className="btn-outline" onClick={(e) => { handleAnchorClick(e, slug); callConversion(e, slug, id) }} aria-label="call icon ">
                <IoIosCall className="icon" />Call Us
            </a>

            

            {/* <button className="btn-outline" onClick={openLeadsModel}> <IoIosCall className="icon"/>Call Us</button> */}

            
        </Wrapper>
    )
}

const Wrapper = styled.div`
/* opacity: 0;
visibility: hidden; */
position: sticky;
display: flex;
align-items: center;
justify-content: space-around;
gap: 3rem;
bottom: 0;
left: 0;
right: 0;
width: 100%;
background-color:white;
z-index: 1;
padding: 2rem;
display: none;


.btn-outline{
    /* border: 1px solid var(--secoundary-color); */
    border: 1px solid var(--primary-color);
    /* color: var(--secoundary-color); */
    color: var(--primary-color);
    font-size: 2rem;
    font-family: "Poppins";
    border-radius:.5rem;
    padding: 1rem 3rem;
    width: 50%;

}
.btn-dark{
    /* background-color: var(--secoundary-color); */
    background-color: var(--primary-color);
    border: none;
    color: white;
    font-size: 2rem;
    font-family: "Poppins";
    border-radius:.5rem;
    padding: 1rem 3rem;
    width: 50%;

}

.icon{
    position: relative;
    top: 2px;
    font-size: 2.3rem;
    margin-right: 5px;
}

.call-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--phone);
        padding:  0rem 1rem;
        border-radius: .5rem;
        transition:all .2s linear;
        
        /* width: 40px;
        height: 40px; */
        /* border-radius: 50%; */
        .call-icon{
            font-size: 4rem;
            color: var(--phone);
        }

        &:hover{
            background-color: var(--phone);

            .call-icon{
                color: white;
            }
        }

    }
@media (max-width:600px) {
    /* opacity: 1;
    visibility: visible; */
    display: flex;

    /* display: block; */
}


`