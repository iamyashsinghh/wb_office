import {  ButtonOutline } from "@/styles/components/buttons"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import {IoIosCall} from 'react-icons/io'
export default function Contact() {


    return (<>

        <Section className="section section-contact">

            <div className="container">

                <div className="contact-data box">
                    <div className="logo-container">
                        <Image
                            src={'/logo.png'}
                            fill={true}
                            alt={"logo-img"}
                            sizes="(100vw)"
                        />
                    </div>
                    <h2 className="contact-text">Contact us at the number mentioned below.</h2>
                    <a href={`tel:07969071909`}  className="cantact-no">
                    <IoIosCall size={20} />   7969071909
                    </a>
                    <h2 className="contact-text">If you are a vendor then connect with us now</h2>
                    <Link href={'/business'} className="link"><ButtonOutline>Register now</ButtonOutline></Link>
                </div>

               
            </div>
            <div id="wedding-vendors-by-category"></div>
        </Section>


    </>)
}

const Section = styled.section`


.container{
    display: grid;
    justify-content: center;
    align-items: center;

}
.box{
    padding: 3rem 5rem;
    
}
.logo-container{
    position: relative;
    /* border: 1px solid red; */
    width: 200px;
    max-height: 50px;
    margin: auto;
}
.contact-data{
    max-width: 55rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
   .logo-container{
    position: relative;
    height: 100px;
   }
    .contact-text{
        font-size: 1.7rem;
        text-align: center;
        font-family: Poppins;
        letter-spacing: .5px;
    }
    .cantact-no{
        font-family: 'Poppins';
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 2.5rem;
        letter-spacing: 0.03em;
        color: var(--primary-color);
    }
 
}


.link{
    color: black;
    font-family: "Poppins";
    font-weight: 500;
    width: 100%;
    text-align: center;
}




`