import styled from "styled-components"
import { MdCancel } from 'react-icons/md'
import Image from "next/image"
import {AiFillCaretDown } from 'react-icons/ai'
import { useEffect, useState } from "react"
export default function DiscountCard() {

    const [showCard,setShowCard] =  useState(false);

    useEffect(()=>{

        setTimeout(() => {
            setShowCard(true);
            
        }, 10000);

        

    },[])

    const hideCard = ()=>{
        setShowCard(false)
    }

    if(showCard){
        return (
            <Wrapper show={showCard}>
           
            <div className="discont-container"  tabIndex="1" >
                <MdCancel className="cancel-icon" onClick={hideCard}  />
         
                <div className="content">
                    <Image
                        src="/common/pricetag.png"
                        alt="An example image"
                        width={80}
                        sizes="(100vw)"
                        height={80}
                    />
                    <h2 className="discount-heading">get upto 40% off</h2>
                    <p className="discount-text">Share your mobile number to see WeddingBanquet.in prices</p>
                    <div className="discount-form">
                        <div className="country-code">
                            <span>+91</span>
                            <AiFillCaretDown className="down-icon"/>
                        </div>
                        <input type="number"className="phone_input" placeholder="Phone Number" name="phone-number" />
                    </div>
                    <button className="discount-btn">SEE PRICES</button>

                </div>
            </div> 
        </Wrapper>

        )

    }
    else{
        return null
    }


}


const Wrapper = styled.div`

position: fixed;
width: 100vw;
height: 100vh;
top: 0px;
left: 0px;
right: 0px;
z-index: 9;
display: flex;
justify-content: center ;
align-items: center;

.discont-container{
    transition: all .3s linear;
    /* transform: scale(1);
    ${(props) => props.show && '  transform: scale(1)'} */
    max-width: 40rem;
    min-width: 40rem;
    position: relative;
    /* height: 30rem; */  
    background-color: white;
    /* position: fixed; */
    z-index: 9;
    /* top: 50%; */
    /* bottom: 50px; */
    /* left: 50%; */
    /* right: 20px; */
    /* transform: translate(-50%, -50%); */
    border-radius: 1rem;
    box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
    padding: 5rem 2rem;  
    height: 50rem;
    .cancel-icon{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 2.5rem;
        cursor: pointer;
    }
    .content{
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 2.5rem;

        .discount-heading{
           
            color: var(--primary-color);
            font-size:3rem;
            font-family: Montserrat;
            font-weight: 700;
            text-transform: capitalize;
        

        }

        .discount-text{
            font-size: 1.6rem;
            color: var(--para);
            text-align: center;
            font-family: "Poppins";

        }
        .discount-form{
            display: flex;
            width: 100%;
            border-radius: .3   rem;
            /* overflow: auto; */
            border: 2px solid var(--secoundary-color);

            .country-code{
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--secoundary-color);

                span{
                    color: white;
                    font-family: "Poppins";
                    font-weight: 400;
                    font-size: 1.8rem;
                }
                .down-icon{
                    font-size: 1.7rem;
                    padding-left: .3rem;
                    color: white;
                }


            }
        .phone_input{
            border: none;
            outline: none;
            width: 100%;
            font-size: 1.8rem;
            font-family:"Poppins";
            font-weight: 400;
            padding: .3px .9rem ;
        }
        //Hide the arrow fron the number input
        input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }
    }
    .discount-btn{
        background-color: var(--primary-color);
        white-space: nowrap;
        color:white;
        font-size: 2rem;
        border:none;
        width: 100%;
        padding: 1rem 3rem;
        border-radius: .3rem;
        cursor: pointer;
        text-transform: uppercase;
    }
}

}



`

// const Wrapper = styled.div`
                                                    
// `