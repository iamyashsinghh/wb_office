import styled from "styled-components";

function Description({text}) {

    return (
    <Div className="container">

        <p className="description">{text}</p>

    </Div>)
}

export default Description;

const Div = styled.div`

.description{
    padding: 2rem 20rem;
    font-size:1.8rem;
    font-family:'Poppins';
    /* max-width:100rem; */
    /* margin:auto; */
    text-align:center;
}

`

