import styled from "styled-components";
import Image from "next/image";
import { IoIosCall } from 'react-icons/io'
import Veg from "./Veg";
import { useRouter } from "next/router";
import RatingCard from "./RatingCard";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";
import Assured from "./Assured";
import { memo } from "react";


function VenueCard({ venue,openLeadModel,callConversion,selectedCity }) {

    // console.log("venue card")
    const image = venue.images?.split(",")[0]
    // console.log(image)
    // console.log(venue.images.split(",")[0]); 

    // console.log(venue)

    const router = useRouter();
  




    async function handleAnchorClick(e, slug) {

        e.stopPropagation();
        const response = await CallingRequest(slug);
        // console.log(response.message);

    }

    return (

        <Wrapper>
            <div className="card-items" onClick={(e) => { router.push(`/${selectedCity}/${venue.slug}`) }}>

                <div className="banner">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${image}`}
                        alt="An example image"
                        fill={true}
                        sizes="(100vw)"
                    />
                  
                    {
                        venue?.wb_assured && (<Assured/>)
                    }
               
                    <div className="rate">
                        <RatingCard />
                    </div>
                    {/* <div className="liked"> */}
                    {/* <AiOutlineHeart className="liked-icon" /> */}
                    {/* <AiFillHeart className="liked-icon" /> */}
                    {/* </div> */}
                    {/* <span className="tag"><AiFillCheckCircle className="tick-icon" />  WB Assured</span> */}
                </div>
                <div className="name-city">
                    <h2 className="venue-name">{`${venue.name}`}</h2>
                    <p className="venue-city">{venue.venue_address}</p>

                </div>
                <div className="details">
                    <div className="detail">
                        <div className="detail-title">
                            <Image
                                src="/icons/team.png"
                                alt="An example image"
                                width={"20"}
                                height={"20"}

                            />
                            <p className="title">Capacity:  </p>
                        </div>
                        <p className="desc">
                            {venue.min_capacity} to {venue.max_capacity}
                        </p>
                    </div>
                    <div className="detail">
                        <div className="detail-title">
                            <span className="icon">
                                <Veg color={"green"} />
                            </span>
                            <p className="title">
                                Vegetarian:
                            </p>
                        </div>
                        <div className="detail-content">
                            <p className="desc">
                                <del> {venue.veg_price}</del>/plate
                            </p>
                        </div>
                    </div>
                    <div className="detail">
                        <div className="detail-title">
                            <span className="icon">
                                <Veg color={"red"} />
                            </span>
                            <p className="title">
                                Non Vegetarian:
                            </p>
                        </div>
                        <div className="detail-content">
                            <p className="desc">
                                <del> {venue.nonveg_price}</del>/plate
                            </p>
                        </div>
                    </div>

                </div>
                <div className="action-btns">
                    <button className="venue-card-btn" onClick={(e) => { openLeadModel(e, venue.slug, venue.id); e.stopPropagation(); }}>Get Quotation</button>

                    <span className="call-btn">


                        {/* This is how earlier I am handling the conversion request, by opening the lead model */}
                        {/* <a href={`tel:${venue.phone}`} onClick={(e) => {handleAnchorClick(e, venue.slug);openLeadModel(e,venue.slug,venue.id,"call")}} aria-label="call icon ">
                            <IoIosCall className="call-icon" size={30} />
                        </a> */}
                        <a href={`tel:0${venue.phone}`} onClick={(e) => {handleAnchorClick(e, venue.slug);callConversion(e,venue.slug,venue.id);}} aria-label="call icon ">
                            <IoIosCall className="call-icon" size={30} />
                        </a>
                    </span>
                </div>
            </div>
        </Wrapper>

    )
}


export default memo(VenueCard)
const Wrapper = styled.div`
min-width: 250px;
background-color: white;
cursor: pointer;
padding: 1rem;

.card-items{
    display: flex;
    flex-direction:column;
    gap: 1.5rem;
}

.banner{

    position: relative;
    height: 200px;

    .venue-card-img{
        width: 100%;
        height: 100%;
    }


  
    .rate{
        position: absolute;
        z-index: 1;
        bottom: 10px;
        right: 10px;
    }
    .liked{
        position: absolute;
        z-index: 1;
        top: 10px;
        right: 10px;    
        cursor: pointer;

        .liked-icon{
            /* color: white; */
            color: red;
            font-size: 3rem;
            /* background-color: red; */
        }
    }
}

.name-city{
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 

    .venue-name{
        font-family: 'Poppins';
        font-size: 2rem;
        color:var(--primary-color);
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }

    .venue-city{
        font-size: 1.5rem;
        font-family: 'Poppins';
        color: var(--primary-color);
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }
}

.details{
    padding: 0rem 1rem;
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
    
    .title{
        color: var(--para);
        font-family: 'Poppins';
        font-size: 1.5rem;
    
    }
    .desc{
        color: var(--para);
        font-family: 'Poppins';
        font-weight: bold;
        color: black;
        font-size: 1.5rem;
    
    }

}

.action-btns{
    padding: 2rem 1rem;


    display: flex;
    z-index: 1;
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
        transition:all .2s linear;

        .call-icon{

            color: var(--phone);
        }

        &:hover{
            background-color: var(--phone);

            .call-icon{
                color: white;
            }
        }

    }

}





@media (max-width:900px) {


    .banner{
    height: 180px;
}

.name-city{
padding: 0rem 1rem;

.venue-name{
    font-family: 'Poppins';
    font-size: 2rem;
    color:var(--primary-color);
}

.venue-city{
    font-size: 1.8rem;
    font-family: 'Poppins';
    color: var(--primary-color);
}
}

.details{
padding: 0rem 1rem;
display: flex;
flex-direction: column;
gap: 1rem;

.desc{
    color: var(--para);
    font-family: 'Poppins';
    font-size: 1.5rem;

}

}

.action-btns{
padding: 1rem;


display: flex;
justify-content: space-between;
.venue-card-btn{
    border: none;
    white-space: nowrap;
    background:none;
    /* box-sizing: border-box; */
    border: 1px solid #F33232;
    color: #F33232;
    padding: .7rem 1.8rem;
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


}


    
}
`