import styled from "styled-components";
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react';
import Heading from "@/components/miscellaneous/Heading";


function Faqs({ faqs,name }) {

    const faqs_contant = JSON.parse(faqs);
    const [activeIndex, setActiveIndex] = useState(null);
    const onItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (

        <Section className="section faqs-section"  >

            <div className="container faqs-container">
                <Heading text={`FAQs about ${name}`}/>
                {
                    faqs_contant?.map((item, index) => {
                        return (
                            <Wrapper key={index}>
                                <div className='faqs-header' onClick={() => { onItemClick(index) }}>
                                    <span className='faqs-ques'>{item.question}</span>
                                    <BsChevronDown className={`icon ${activeIndex === index ? 'rotate' : ''}`} size={20} />
                                </div>
                                <ul className={`list-unstyled ${activeIndex === index ? 'active' : ''} `}>

                                    <li>{item.answer}</li>
                                </ul>
                            </Wrapper>
                        )
                    })
                }
            </div>
        </Section>

    )
}

const Section = styled.div`
background-color: var(--bg-color);
/* max-width: 60rem; */
/* margin: auto; */

.faqs-container{
    display: grid;
    row-gap: 2rem;
    grid-template-columns: repeat(1,1fr);
}
`;

const Wrapper = styled.div`
    background-color: white;
    padding: 1rem;
    display: flex;  
    flex-direction: column;
    gap: 1.5rem;
    
    .active{
        display: block;
    }
    .faqs-header{
        cursor: pointer;
        

        .rotate{
            transform: rotateX(180deg)
            
        }
        /* border: 1px solid var(--primary-color); */
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon{
        display: block;
        transition: all .3s linear;
        /* ${(props) => props.show ? '  transform: rotateX(180deg)' : ' transform: rotate(0deg)'} */
    }
    
    .faqs-ques{
        font-family: Poppins;
        font-weight: 500;
        font-size: 1.8rem;
    }
    .venue-title{
        font-size: 1.5rem;
    }
    ul{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* display: ${(props) => props.show ? "block" : 'none'}; */
        display: none;


        li{
            font-size: 1.6rem;
            font-family: Poppins;
            transition: all .3s linear;
            padding: 1rem;

        }
    }



`
export default Faqs;