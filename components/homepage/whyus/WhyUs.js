import styled from "styled-components"
import Heading from "@/components/miscellaneous/Heading"
import Image from "next/image"

export default function WhyUs() {


    return (<Section className="section-why-us section" id="why-us">

        <div className="container">
            <Heading text={"Why Book With Wedding Banquets"} desc={"Your one-stop Premium destination for all your event needs."} />
            <div className="box-container">

                <div className="why-book-with-us-box">
                    <div className="cover-img">
                        <Image
                            className="img"
                            src="/whyus/6.png"
                            alt="An example image"
                            fill={true}
                            sizes="(100vw)"

                        />
                        <div className="border-outline">

                        </div>
                    </div>
                    <div className="details-contianer">
                        <h2 className="title"> 100% Client Satisfaction</h2>
                        <p className="short-desc">When you book with Wedding Banquets, we are committed to delivering every service with exceptional quality.</p>
                        <p className="content">Our mission is a deep-seated commitment to providing true satisfaction & premium experience for our clients. From the moment you contact us, to the final delivery of our services, we're committed to delivering on our promises and exceeding your expectations.</p>
                    </div>
                </div>
                <div className="why-book-with-us-box reverse">
                    <div className="cover-img">
                        <Image
                            className="img"
                            src="/whyus/8.png"
                            alt="An example image"
                            fill={true}
                            sizes="(100vw)"
                        />
                        <div className="border-outline">

                        </div>
                    </div>
                    <div className="details-contianer">
                        <h2 className="title">One Stop Solution</h2>
                        <p className="short-desc">With our one-stop shop, you will get A to Z wedding necessities by booking multiple spaces and trusted vendors under one roof.</p>
                        <p className="content">No more endless hours spent scrolling through websites or dealing with the headache of coordinating multiple vendors - we've got you covered. You will experience the magic of stress-free & hassle-free event planning.</p>
                    </div>
                </div>
                <div className="why-book-with-us-box">
                    <div className="cover-img ">
                        <Image
                            className="img"
                            src="/whyus/7.png"
                            alt="An example image"
                            fill={true}
                            sizes="(100vw)"
                        />
                        <div className="border-outline">

                        </div>
                    </div>
                    <div className="details-contianer ">
                        <h2 className="title"> Cost Effective Plans </h2>
                        <p className="short-desc">Be certain to get the best deals at Wedding banquets, with discounts up to 40% on every booking.
                        </p>
                        <p className="content">Transparency and Honesty are the cornerstones of a successful partnership and we promise to deliver the highest quality services at the best and assured prices without any hassles. Don't forget to grab an exclusive discount of 40% on venue booking.</p>
                    </div>
                </div>

            </div>
        </div>
    </Section>)
}

const Section = styled.section`

background: #FFEEEE;

.box-container{
    max-width: 100rem;
    display: flex;
    flex-direction: column;
    gap:10rem;
    margin: auto;
    padding: 7rem 0rem 15rem 0rem;

}
.why-book-with-us-box{
    
    display: flex;
    
    .cover-img{
        position: relative;
        z-index: 0;
        min-width: 30rem;
        /* border: 1px solid black; */

        .img{
            top:55px !important;
            border-radius: 5px;
            /* filter: brightness(85%); */
        }


       .border-outline{
                position: absolute;
                width:90%;
                height: 90%;
                border: 2px solid var(--primary-color);

            }

    }

    .details-contianer{
        /* border: 1px solid black; */
        background-color: white;
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .title{
            font-family: "Montserrat";
            font-size: 2.5rem;
            color: var(--primary-color);
                
        }
            
        .short-desc{
            font-family: "Poppins";
            font-size: 1.7rem;
            font-weight: 500;
            color: var(--secoundary-color);
            /* letter-spacing: 3%; */
        }
        
        .content{   
            font-family: "Poppins";
            font-size: 1.6rem;
            color: var(--para);
        }
            
    }

    &:nth-child(odd){
        .img{
            z-index: 112;
            position: absolute;
            left: 80px !important;

        }
        .border-outline{
            top: 100px;
            left: 50px;
        }
        
        .details-contianer{
            padding: 2rem 2rem 2rem 12rem;
        }
        

       
    
    }

    
    &:nth-child(2n){
        flex-direction: row-reverse;

        .img{
            z-index: 112;
            position: absolute;
            left:-80px !important;

        }  
        .border-outline{
            top: 100px;
            left: -20px;
        }
        
        .details-contianer{
            padding: 2rem 12rem 2rem 2rem !important;
        }
    }

}

@media (max-width:700px) {

    .box-container{
        /* border: 2px solid black; */
        gap:5rem;
        margin: auto;
        padding: 5rem 0rem 7rem 0rem;

    }


    .why-book-with-us-box{
        /* border: 2px solid red; */
        display: flex;

        .cover-img{
            height: 15rem;
            min-width: 35%;
            .border-outline{
                display: none;
            }
            
            .img{
                
                top:10px !important;
                border-radius: 3px;
            }
        }

        .details-contianer{
       
            .short-desc{
                color: var(--para);
                font-size: 1.5rem;

            }
            .title{
        
                font-size: 2rem;
            
            }
            .content{   
                display: none;
            }
            
        }

        &:nth-child(odd){
        .img{

            left: 10px !important;

        }
        
        .details-contianer{
            padding: 2rem 2rem 2rem 2rem;
        }
        

       
    
    }

    
    &:nth-child(2n){
        flex-direction: row-reverse;

        .img{

            left:-10px !important;

        }  
        
        .details-contianer{
            padding: 2rem 2rem 2rem 2rem !important;
        }
    }

    }


}


`