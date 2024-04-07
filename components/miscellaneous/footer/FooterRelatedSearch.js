import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';

function FooterRelatedSearch({city,locality}) {



    const venue_categories = [
        {
            "id": 3,
            "name": "Banquet Halls",
            "slug": "banquet-halls"
        },
        {
            "id": 4,
            "name": "Marriage Gardens",
            "slug": "marriage-gardens"
        },
        {
            "id": 5,
            "name": "Wedding Farmhouse",
            "slug": "wedding-farmhouse"
        },
        {
            "id": 6,
            "name": "Party Halls",
            "slug": "party-halls"
        },
        {
            "id": 7,
            "name": "5 Start Wedding Hotels",
            "slug": "5-star-wedding-hotels"
        },
        {
            "id": 11,
            "name": "Small Function Halls",
            "slug": "small-function-halls"
        },
        {
            "id": 13,
            "name": "Corporate Events",
            "slug": "corporate-events"
        },
        {
            "id": 14,
            "name": "Destination Weddings",
            "slug": "destination-weddings"
        }
    ]


    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Other Related Searches</h2>
                <div className="vendors-container">
                    <div className="vendors-list">
                        {
                            venue_categories?.map((cat) => {
                                return (
                                    <span key={cat.id}>
                                        <Link className='vendor-link' href={`/${cat.slug}/${city}/${locality}`}>
                                            {`${cat.name} in ${locality === "all" ? city : locality}`}
                                        </Link>
                                    </span>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
margin-top: 2rem;
.vendors-heading{
    font-size: 2rem;
    letter-spacing: 1px;

}
.vendors-container{
    padding: 1rem 0rem;
    .vendors-title{
        font-family: Poppins;
        font-size: 1.8rem;
        
    }
    .vendors-list{
        padding: 2rem 0rem; 


        .vendor-link{
            line-height: 3rem;
            font-family: "Poppins";
            margin-bottom: 10px;
            font-size:1.5rem;
            cursor: pointer;
            transition: all .3s linear;
            color: var(--para);
            white-space: normal;
            overflow-wrap: break-word;

            &:hover{
                color: red;
            }

            &::after{
                content: "|";
                padding: 0 10px;
                opacity: .54;
                color: black;
            }

        }
    }
}

`



export default FooterRelatedSearch