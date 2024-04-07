import styled from "styled-components";

export default function Features() {


    return (
        <Wrapper className="section">


            <div className="container">
                <div className="card-container">

                    <div className="card">
                        <h2 className="card-title">Our Company </h2>
                        <p className="card-desc">Wedding Banquets is one-stop solution for all your wedding requirements, an expert in orchestrating seamless experiences of venue and vendor booking. Known for its commitment to excellence and client satisfaction, Wedding Banquets stands out as a trusted name in the arena of the wedding industry. Emerged as a veteran name, Wedding Banquets is dedicated to deliver exceptional outcomes on time.</p>
                    </div>
                    <div className="card">
                        <h2 className="card-title">Our Value </h2>
                        <p className="card-desc">Integrity, Honesty, and  Client-Centricity are the core values of Wedding Banquets that reflects in our work ethics. Setting the bar high in terms of professionalism, we prioritize these principles in every aspect of our functionality. Our unwavering commitment ensures that each client's experience aligns seamlessly with our foundational principles.</p>
                    </div>
                    <div className="card">
                        <h2 className="card-title">Our People </h2>
                        <p className="card-desc">At WeddingBanquets, our team consists of passionate and skilled professionals committed to transforming events into extraordinary experiences. Infused with creativity and expertise, our people embody the values that define us. With a customer-first approach, they ensure flawless event execution, surpassing expectations and creating enduring memories.</p>
                    </div>
  

                </div>
            </div>

        </Wrapper>
    )
}



const Wrapper = styled.section`


.card-container{
    display: flex;
    /* grid-template-columns: 1fr 1fr 1fr; */
    flex-wrap: wrap;
    gap: 2rem;
    /* align-items: center;s */
    justify-content: center;


    .card{
        /* min-width: 40rem; */
        max-width: 45rem;
        padding: 2rem;
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        border-radius: 10px;


        .card-title{
            font-size: 2.5rem;
            font-weight:400;
            font-family: "poppins";
        }
        .card-desc{
            font-family: "Poppins";
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 1.8;
            /* color: var(--secoundary-color); */
            /* color: white; */
            text-align: center;
        }
        
    }
}


`