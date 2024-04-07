import styled from "styled-components";
import Image from "next/image";

export default function Assured() {


    return (

        <Wrapper>
            <div className="assured-img-container">

            <Image
                src="/icons/wbassured.png"
                alt="assured"
                fill
                sizes="(100vw)"
                // width={"200"}
                // height={"200"}
                title="WB ASSURED"

            />

            </div>

            {/* <h2 className="label">WB ASSURED</h2> */}


        </Wrapper>
    )
}


const Wrapper = styled.div`

position: absolute;
/* border: 3px solid #A06B14; */
padding:0.1rem 1.5rem;
padding: 0px;
/* background-color:#5C3900 ; */
/* background-color: var(--info-color); */
border-radius: 5px;
top: 10px;
gap:.5rem;
left: 5px;
display: flex;
align-items: center;
justify-content: center;
z-index: 999;


.assured-img-container{
    position: relative;
    width: 100px;
    height: 40px;
    z-index: 1;

}
.label{
    color: white;
    font-size: 1.4rem;
}

`