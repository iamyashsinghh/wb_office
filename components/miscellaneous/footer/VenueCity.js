import styled from "styled-components";
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react';
// import { useGlobalContext } from "@/context/MyContext";
import Link from "next/link";


function VenueCity({cities}) {

 

    const [activeIndex, setActiveIndex] = useState(null);

    const onItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // const { cities } = useGlobalContext();

    const data = [
        {
            name: "Banquet Halls",
            slug: "banquet-halls",
        },
        {
            name: "Party Halls",
            slug: "party-halls"
        },
        {
            name: "Marriage Halls",
            slug: "marriage-gardens"
        },
        {
            name: "Wedding Farmhouse",
            slug: 'wedding-farmhouse'
        }

    ]

    // console.log(activeIndex)

    return (

        <Div className="venue"  >

            {
                cities?.map((city, index) => {
                    return (
                        <Wrapper key={index}>
                            <div className='venue-header' onClick={() => { onItemClick(index) }}>
                                <span className='venue-city'>{city.name}</span>
                                <BsChevronDown className={`icon ${activeIndex === index ? 'rotate' : ''}`} size={20} />
                            </div>
                            <span className='venue-title'>VENUES</span>

                            <ul className={`list-unstyled ${activeIndex === index ? 'active' : ''} `}>
                                {
                                    data.map((item, i) => {
                                        return (
                                            <li key={i}>
                                                <Link href={`/${item.slug}/${city.slug}/all`} className="link-item">
                                                    {`${item.name} in ${city.name}`}
                                                </Link>
                                            </li>
                                        )
                                    })

                                }

                                <li>
                                    <Link href={`/banquet-halls/${city.slug}/all`} className="link-item">
                                        {`All venues in ${city.name}`}
                                    </Link>
                                </li>


                            </ul>
                        </Wrapper>
                    )
                })
            }
        </Div>

    )
}

const Div = styled.div`


display: grid;
row-gap: 5rem;
grid-template-columns: repeat(5,1fr);



@media (max-width:1000px) {

    display: grid;
    row-gap: 5rem;
    grid-template-columns: repeat(3 ,1fr);

    
}

@media (max-width:600px) {

    row-gap: 2rem;
    grid-template-columns: 1fr;
    
    
}

`

const Wrapper = styled.div`



    /* padding: 2rem 0rem; */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .active{
        display: block;
    }

    .venue-header{
        
        .icon{
            display: none;
        }
    }
    
    .venue-city{
        font-family: Poppins;
        font-weight:400;
        font-size: 1.8rem;
    }
    .venue-title{
        font-size: 1.5rem;
    }
    ul{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .link-item , li{
            font-size: 1.4rem;
            font-family: "Poppins";
            transition: all .3s linear;
            cursor: pointer;
            color: black;
            &:hover{
                /* color: red; */
                text-decoration: underline;
            }
        }
    }


    @media (max-width:600px) {

        
    .venue-header{
    
        
        .icon{
            display: block;
            transition: all .3s linear;
            /* ${(props) => props.show ? '  transform: rotateX(180deg)' : ' transform: rotate(0deg)'} */
        }
        .rotate{
            transform: rotateX(180deg)
            
        }
        border: 1px solid var(--primary-color);
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .venue-title{
        display: none;
    }

    ul{
        /* display: ${(props) => props.show ? "block" : 'none'}; */
        display: none;

        li{
            /* margin-bottom: 1rem; */
            padding: 1rem;

        }
    }

    }
        
`
export default VenueCity;