import styled from "styled-components";

export default function Heading({ text ,desc}) {


    return (
        <Wrapper className="container">

            <h2 className="heading-text">{text}</h2>
            <p className="desc">{desc || ""}</p>

        </Wrapper>
    )
}


const Wrapper = styled.div`
/* border: 1px solid black; */
position: relative;
display: flex;
flex-direction:column;  
gap: 1rem;



.heading-text{

    text-transform: capitalize;
    font-size: 3rem; 
    text-align:center;

}

.desc{
    font-family: 'Poppins', sans-serif !important;
    font-family: 'Montserrat';
    color:var(--para);
    font-size:1.7rem;
    max-width:120rem;
    margin: auto;
    padding: 0rem 2rem;
    text-align:center;

}

@media (max-width:800px) {

    .heading-text{

        padding: 1rem 2rem;
        font-size: 2.5rem;
    }
}
@media (max-width:600px) {
    padding: 3rem 0rem;


    .heading-text{

        padding: 1rem 2rem;
        font-size: 2.3rem;
        

    }
}

`