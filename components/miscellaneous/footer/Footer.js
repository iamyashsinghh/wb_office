import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { RiWhatsappFill, RiLinkedinBoxFill, RiFacebookCircleFill, RiInstagramFill } from 'react-icons/ri'
import { FaPinterest } from "react-icons/fa";
import { IoIosCall } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Script from 'next/script'
import { useGlobalContext } from '@/context/MyContext'

function Footer() {
    const { selectedCity } = useGlobalContext();


    return (
        <Section className='section section-footer'>

            {/* Implenent Intract API */}
            <Script id="my-script" strategy="beforeInteractive">
            </Script>
            <div className="container">
                <div className="main-footer-content">
                    <div className="logo-title">

                        <Link href={"/"} className='logo-img' aria-label="logo">
                            <Image
                                src={"/logo.png"}
                                alt='logo'
                                fill
                                sizes="(100vw)"
                            />
                        </Link>
                        <p className='about'>Wedding Banquets is a reliable and well known name in the wedding industry catering all your wedding wants  in one go. </p>
                    </div>
                    <div className="f-section f-service">
                        <h3>Service</h3>
                        <ul className='list-unstyled'>
                            <li>
                                <Link href={`/banquet-halls/${selectedCity}/all`} className='f-link'>Wedding venues</Link>
                            </li>
                            <li>
                                <Link href={`/best-wedding-photographers/${selectedCity}/all`} className='f-link'>Photographer</Link>
                            </li>
                            <li>
                                <Link href={`/top-makeup-artists/${selectedCity}/all`} className='f-link'>Makeup Artist</Link>
                            </li>

                            <li>
                                <Link href={`/best-mehndi-artists/${selectedCity}/all`} className='f-link'>Mehndi Artist</Link>
                            </li>

                            <li>
                                <Link href={`/band-baja-ghodiwala/${selectedCity}/all`} className='f-link'>Band baja</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="f-section f-quick-links">
                        <h3>Quick Links</h3>
                        <ul className='list-unstyled'>
               
                            <li>
                                <Link className='f-link' href="/about"> About Us  </Link>
                            </li>
                            <li>
                                <Link className='f-link' href="/career"> Career  </Link>
                            </li>
                            <li>
                                <Link className='f-link' href="/privacy_policy"> Privacy Policy  </Link>
                            </li>
                            <li>
                                <Link className='f-link' href="/terms_and_conditions"> Terms & Conditions  </Link>
                            </li>
                            <li>
                                <Link className='f-link' href="/terms_of_use"> Terms Of Use </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="f-section f-contact">
                        <h3>Contact Us</h3>
                        <ul className='list-unstyled'>
                            <li className='f-phone'>
                                <IoIosCall />
                                <a href="tel: 8882198989" className='f-link '>8882198989</a>
                            </li>
                            <li className='f-phone'>
                                <IoIosCall />
                                <a href="tel: 07969071916" className='f-link'>07969071916</a>
                            </li>
                            <li className='f-phone'>
                                <IoIosCall />
                                <a href="tel: 07969100321" className='f-link'>07969100321</a>
                            </li>
                            <li className='f-phone'>
                                <IoIosCall />
                                <a href="tel: 07969100329" className='f-link'>07969100329</a>
                            </li>
                            <li className='f-phone'>
                                <MdEmail />
                                <a href="mailto: info@weddingbanquets.in" className='f-link'>Mail us</a>

                            </li>

                        </ul>
                    </div>
                </div>
                <div className="hr-line"> </div>
                <div className="f-icons">
                    <Link href={"https://api.whatsapp.com/send?phone=919625016998&text=Hi"} className='f-icon' passHref target='_blank' aria-label="icon">
                        <span><RiWhatsappFill size={25} className='social-icon' /> </span>
                    </Link>
                
                    <Link href={"https://www.facebook.com/WeddingBanquets"} className='f-icon' passHref target='_blank' aria-label="icon">
                        <span ><RiFacebookCircleFill size={25} className='social-icon' /></span>
                    </Link>

                    <Link href={"https://pin.it/5gZQz1W"} className='f-icon' passHref target='_blank' aria-label="icon">
                        <span ><FaPinterest size={25} className='social-icon' /></span>
                    </Link>

                    <Link href={"https://www.linkedin.com/company/wedding-banquets/"} className='f-icon' passHref target='_blank' aria-label="icon">
                        <span><RiLinkedinBoxFill size={25} className='social-icon' /></span>
                    </Link>
                    
                    <Link className='f-icon' href={"https://www.instagram.com/weddingbanquetsindia/"} passHref target='_blank' aria-label="icon">
                        <span ><RiInstagramFill size={25} className='social-icon' /></span>
                    </Link>
                </div>
                <div className="newsletter">
                    <p>Subscribe to our Newsletter</p>
                    <div className="email-form">
                        <input type="text" placeholder='Enter your email address...' name='email' />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
                <div className="f-copyright">
                    <p>Copyright © 2024 Wise Weddings Pvt Ltd(Wedding Banquets). All Rights Reserved.</p>

                </div>
            </div>
        </Section>
    )
}


const Section = styled.section`
max-width: 100%;
/* border: 3px solid black; */
color: white;
/* padding: 1rem 3rem; */
background-color:#870808;
.container{
    display: flex;
    flex-direction: column;
    padding: 0rem 3rem;
    gap:3rem;
}

.main-footer-content{
    display: grid;
    grid-template-columns: 3fr 2fr 2fr 2fr;
    gap: 13rem;

}
.logo-title{
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    gap: 3rem;
    
    /* .logo{
        width: 90%;
    } */

    .logo-img{
        /* border: 1px solid green; */
        
        position: relative;
        min-width: 150px;
        max-width: 200px;
        height: 50px;
    }

    p{
        font-family: Poppins;
        font-size: 1.5rem;
        line-height: 30px;
        /* text-align: justify; */
        /* letter-spacing: 0.03em; */
        /* text-align: center; */

    }
}

.f-section{
    text-align: center;
    /* border: 1px solid black; */
    h3{
        font-family: Poppins;
        padding-bottom: 1rem;
        font-weight: 400;
        font-size: 1.8rem;
        text-transform: uppercase;
        /* line-height: 30px; */
        letter-spacing: 0.03em;
        text-align: left;
    }

    ul{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        li, .f-link{
            cursor: pointer;
            font-family: Poppins;
            font-size: 1.5rem;
            color: white;
            line-height: 30px;
            letter-spacing: 0.03em;
            text-align: left;
            text-transform: capitalize;

            &:hover{
                color: var(--secoundary-color);
            }

        }
    }

        .f-phone{
            display: flex;
            /* flex-direction: column; */
            gap:2rem;
            align-items: center;
        }

}
.f-contact{
    /* border: 1px solid black; */
    p{
        padding-top: 3.5rem;
        color: white;
        text-align: left;
        font-family: "Poppins";
        font-size: 1.6rem;
        font-weight:400;
    }
}
.icon{
    padding: 0rem 1rem;
}
.hr-line{
    background-color: red;
    height: 1px;
    /* margin: 5rem 0rem; */
    

}
.f-icons{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    .f-icon{
        cursor: pointer;
        background-color: white;
        padding: 1rem;
        border-radius: 50%;


        &:nth-child(1){
            color: green;
        }
        &:nth-child(2){
            color: #316FF6;
        }

        &:nth-child(3){
            color: red;
        }
        &:nth-child(4){
            color: #0077b5;
        }
        &:nth-child(5){
            color: red;
        }
       
    }

}

.f-copyright{
    display: flex;
    justify-content: center;
    align-items: center;

    p{
        font-family: "Poppins";
        font-size: 1.5rem;
        line-height: 30px;
        font-weight: 400;
        letter-spacing: 0.03em;
        text-align: center;
    }
}

.newsletter{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

    p{
        font-size: 1.7rem;

    }

    .email-form{
        width: 50rem;
        /* border: 2px solid green; */
        overflow: hidden;
        input{
            width: 70%;
            padding:.8rem 2rem;
            font-size: 1.7rem;
            border-radius: .5rem 0rem 0rem .5rem;
            font-family: "Poppins";
            outline: none;
            border: none;
        }
        button{
            cursor: pointer;
            width: 30%;
            border-radius: 0rem .5rem .5rem 0rem;
            font-family: "Poppins";
            background-color: var(--secoundary-color);
            color: white;
            border: none;
            outline: none;
            padding: 0.8rem 1rem;
            font-size: 1.7rem;
        }
    }
}

@media (max-width:945px) {
    .main-footer-content{
        grid-template-columns: 3fr 2fr 2fr 2fr;
        gap: 5rem;
    }

}

@media (max-width:800px) {
    .main-footer-content{
    grid-template-columns: 1fr 1fr ;
    column-gap: 10rem;

}

.newsletter{
    flex-direction: column;

}

}

@media (max-width:600px) {
    
    .main-footer-content{
        column-gap: 5rem;
    }
    .newsletter{
        gap: 2rem;

        .email-form{
            width: 90%;
        }

    }

    .logo-img{
        width: 160px;
        height: 35px !important;
    }

}



`

export default Footer