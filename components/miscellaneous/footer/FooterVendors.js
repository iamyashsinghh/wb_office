import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '@/context/MyContext'
import Link from 'next/link';

function FooterVendors() {

    const { selectedCity } = useGlobalContext();


    return (
        <Section className='section-vendors'>
            <div className="container">
                <h2 className='vendors-heading'>Wedding vendors by category</h2>
                <div className="vendors-container">
                    <span className='vendors-title'>Wedding Vendors</span>
                    <div className="vendors-list">
                     
                            <Link className='vendor-link' href={`/photographers-videography/${selectedCity}/all`}>
                                Photographers / Videography
                            </Link>
                     
                            <Link className='vendor-link' href={`/makeup-artists/${selectedCity}/all`}>
                                Makeup Artists
                            </Link>
                        
                            <Link className='vendor-link'  href={`/mehndi-artists/${selectedCity}/all`}>
                                Mehndi Artists
                            </Link>
                      
                            <Link className='vendor-link'  href={`/decorators-florists/${selectedCity}/all`}>
                                Decorators / Florists
                            </Link>
                     
                            <Link  className='vendor-link' href={`/invitation-cards/${selectedCity}/all`}>
                                Invitation Cards
                            </Link>
                    
                            <Link className='vendor-link' href={`/choreographers/${selectedCity}/all`}>
                                Choreographers
                            </Link>
                    
                            <Link className='vendor-link' href={`/band-baja-ghodiwala/${selectedCity}/all`}>
                                Band/Baja/Ghodiwala
                            </Link>
                  
                            <Link className='vendor-link' href={`/wedding-transportation-vintage-cars/${selectedCity}/all`}>
                                Wedding Transportation / Vintage Cars
                            </Link>
                        
                            <Link className='vendor-link' href={`/bridal-wear/${selectedCity}all`}>
                                Bridal Wear
                            </Link>
                       
                            <Link className='vendor-link' href={`/groom-wear/${selectedCity}/all`}>
                                Groom Wear
                            </Link>
                        

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



export default FooterVendors