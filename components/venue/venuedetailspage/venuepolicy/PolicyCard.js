import styled from "styled-components";
import Image from "next/image";

export default function PolicyCard({img_url,name,data}){

    return (<Div>

        {/* <MdOutlinePolicy className="icon"/> */}
        <div className="img_vector">
            <Image 
            src={img_url}
            fill
            sizes="(100vw)"
            alt="img"
            />
        </div>
        <h2>{name}</h2>
        <div className="description"  dangerouslySetInnerHTML={{ __html: data }} />
        {/* <p>25% at the time of booking, Advance can be adjusted against future bookings in NA months.</p> */}
    
    </Div>)
}

const Div = styled.div`
/* border: 1px solid red; */
padding: 1rem 2rem;
display: flex;
flex-direction:column;
/* justify-content: center; */
align-items: center;
gap: 1rem;
/* background-color: white; */

&:hover{
    /* box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1); */
}



.img_vector{
    position: relative;
    width: 100px;
    height: 100px;
}

h2{
    font-size: 1.8rem;
    font-family: "Poppins";
    font-weight: 500;
}

.description{
    font-size: 1.6rem;
    font-family: "Poppins";
    font-weight: 500;
    color: var(--para);
    /* text-align: center; */
    
    li{
        /* list-style: square; */
        /* text-align: center; */

    }
}


@media (max-width:600px) {
    padding: 1.5rem;
    padding-left: 2rem;
    gap: .5rem;
    background-color: white;

    p{
        font-size: 1.6rem;
    }
    .img_vector{
        position: relative;
        width: 80px;
        height: 80px;
    }
    
}

`