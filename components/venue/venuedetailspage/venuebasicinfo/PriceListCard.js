import styled from "styled-components";
import Veg from "@/components/miscellaneous/Veg";
import { IoIosCall } from 'react-icons/io'
import Image from "next/image";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import useCallConversion from "@/lib/hook/useCallConversion";



export default function PriceListCard({min_capacity,max_capacity,nonveg_price,veg_price,phone,slug,openLeadsModel,id}) {
    

    const {callConversion} = useCallConversion();    




    async function handleAnchorClick(e,slug) {
        // e.stopPropagation();
        await CallingRequest(slug);

    }
    return (<Wrapper className="venue-price-list-card">
        <div className="details">
            <div className="detail">
                <div className="detail-title">
                    <Image
                        // className="icon"
                        src="/icons/team.png"
                        alt="An example image"
                        width={"20"}
                        height={"20"}
                    />
                    <p className="desc">Capacity: </p>
                </div>
                <p className="desc bold">
                    {min_capacity || ""} to {max_capacity || ""}
                </p>
            </div>
            <div className="detail">
                <div className="detail-title">
                    <span className="icon">
                        <Veg color={"green"} />
                    </span>
                    <p className="desc">
                        Vegetarian:
                    </p>
                </div>
                <div className="detail-content">
                    <p className="desc bold">
                        <del> {veg_price}</del>/plate
                    </p>
                </div>
            </div>
            {nonveg_price !== 'null' ? (
                <div className="detail">
                    <div className="detail-title">
                        <span className="icon">
                            <Veg color={"red"} />
                        </span>
                        <p className="desc">
                            Non Vegetarian:
                        </p>
                    </div>
                    <div className="detail-content">
                        <p className="desc bold">
                            <del> {nonveg_price}</del>/plate
                        </p>
                    </div>
                </div>
            ) : ""}


        </div>
        <div className="action-btns">
            <button className="venue-card-btn" onClick={()=>{ openLeadsModel()}}>Get Quotation</button>

            <span className="call-btn">
                <a href={`tel:0${phone}`} onClick={(e)=>{handleAnchorClick(e,slug);callConversion(e,slug,id)}} aria-label="call icon ">
                    <IoIosCall className="call-icon" size={30} />
                </a>
            </span>
        </div>
        <div className="bannar-img">
            <Image
                src="/common/venue.jpg"
                alt="An example image"
                fill={true}
            />
        </div>
    </Wrapper>)
}


const Wrapper = styled.div`    
    background-color: white;
    position: sticky;
    top: 0;
    .details{
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        

        .detail{
            display: flex;
            /* align-items: center; */
            justify-content: space-between;
        }
        .detail-title{
            display: flex;
            gap: .5rem;
        }
        .icon{
            position: relative;
            width: 20px;
            height: 20px;
            display: flex;
            gap: 1rem;  
        }
        
        .desc{
            /* color: var(--para)       ; */
            font-family: 'Poppins';
            font-size: 1.7rem;
        
        }
        .bold{
            font-weight:bold;   
        }

    }

    .action-btns{
        padding: 2rem 3rem;
        display: flex;
        justify-content: space-between;
        .venue-card-btn{
            border: none;
            white-space: nowrap;
            background:none;
            /* box-sizing: border-box; */
            border: 1px solid #F33232;
            color: #F33232;
            padding: 1rem 2.5rem;
            text-transform: uppercase;
            border-radius:.5rem;
            font-size: 2rem;
            cursor: pointer;
            transition: all .3s linear;
            &:hover{
                background: #F33232;
                color: white;
            }
        }
        .call-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--phone);
            padding:  0rem 1rem;
            border-radius: .5rem;
            cursor: pointer;
            transition: all .2s linear;
            .call-icon{

                color: var(--phone);
            }

            &:hover{
                background-color: var(--phone);
                border: 1px solid white;

                .call-icon{
                    color: white;
                }
            }

        }

    }

    .bannar-img{
        position: relative;
        width: 100%;
        height: 400px;
    }


`