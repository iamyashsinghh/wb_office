import styled from "styled-components";
import {MdSupportAgent} from 'react-icons/md'
import Link from "next/link";
export default function Contactus(){


    return(<Wrapper>
        <MdSupportAgent className="icon"/>
        <h2>Contact a Wedding Expert in Free</h2>
        <p>We had love to assist you! 7 days a week</p>
        <p>Call<Link href={`tel:01800 889 0082`} className="phone">1800 889 0082</Link></p>

    
    </Wrapper>)
}


const Wrapper = styled.section`
padding: 5rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap:1rem;

.icon{
    font-size: 5rem;
    color: var(--primary-color);
}
h2{
    font-size: 2.5rem;
    font-family: "Montserrat";
    color: var(--primary-color);
    font-weight: 600;

}
p{
    color: var(--para);
    font-family: "Poppins";
    font-size: 1.8rem;

}
.phone{
    color: var(--primary-color);
    margin: 0rem 10px;
}
`