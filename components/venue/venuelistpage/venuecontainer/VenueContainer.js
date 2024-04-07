

import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { BiSlider } from 'react-icons/bi'
import { Spinner2 } from "@/styles/components/spinner";
import VenueCard2 from "./venueCard2";
import { useGlobalContext } from "@/context/MyContext";
import Filter from "../filter/Filter";
import useLeadModel from "@/lib/hook/useLeadModel";
import useCallConversion from "@/lib/hook/useCallConversion";


function VenueContainer({ city, lists, locality, category, count, localities, venueCategories, filterQuery }) {

    // console.log(localities)
    // console.table(filterQuery)


    const { setShowFilter } = useGlobalContext();
    const {openLeadModel} = useLeadModel();         //To open lead model
    const {callConversion} = useCallConversion();         //For call conversion
    const [loading,setLoading] = useState(false);
    


    let page = useRef(1)

    const [venuelists, setVenueList] = useState(lists || []);

    //IF the venueList reached with the count then there is no venue available if venueList is less the count the then venues are available
    const [hasMore, setHasMore] = useState(true);


    //For solving the same problem as above useEffect do, now if a user will change sulg from the filter it will show the new list otherwise it will show the prvious venues. Yes we are taking the new venue from the server but still it will not update the new one and show the old one, To solve the problem we use this useEffect.
    //NOTE: lists is not a state it is a normal variable which container the list of venues which comes from the server.
    useEffect(() => {
        setVenueList(lists)
    }, [lists])


    //This will update the hasmore state.
    useEffect(()=>{
        setHasMore(venuelists.length >= count ? false : true)

    },[venuelists])


    //For infinity scroll to fetch more venues.
    const fetchMoreVenue = async () => {

        try {
            setLoading(true)

            
            if (venuelists.length >= count) {
                // console.log("Hy")
                setHasMore(false)
            }

            page.current = page.current + 1;

            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}/${page.current}?guest=${filterQuery.guest}&per_budget=${filterQuery.per_budget}&per_plate=${filterQuery.per_plate}&multi_localities=${filterQuery.multi_localities}`
    
    
            let newLists = await fetch(url)
            newLists = await newLists.json();
            newLists = newLists.data;
            setVenueList([...venuelists, ...newLists]);
            
        } catch (error) {
            console.log(error)
            // 
        }finally{
            setLoading(false)
        }

    }



    return (
        <Section className="section section-venue-container">
            {/* <Heading text={'Wedding Banque t in Mumbai'} desc={"As you start with the wedding preparations and dive deeper to create the perfect fairytale wedding, one crucial element is the wedding venue. It can be exhausting, especially in Delhi, as the city is brimming with options."} /> */}

            <div className="sticky-head">
                <div className="page-title">
                    <h2 className="main-title">{`${category.replaceAll("-", " ")}  in ${locality === "all" ? city : locality}`}</h2>
                    <span className="count">{` Total result : ${count || 0} `}</span>
                </div>

                <div className="filter-btn" onClick={() => { setShowFilter(true) }}>
                    <BiSlider className="filter-icon" />
                    <span className="filter-label">Filter</span>
                </div>
            </div>

            <div className="venue-list-container">
                <aside className="venue-filter box">

                    {/* //This filter component will not rerender when ever model open or colse, because we wrap this filter component with memo(), that means it will only re-render when the props in the filter component will change otherwise it will not re-render. */}
                    <Filter locality={locality} filterQuery={filterQuery} localities={localities} venueCategories={venueCategories} city={city} category={category} />

              
                </aside>
                <main className="venues-list box">
                    {/* <Heading text={`${category.replaceAll("-", " ")}  in ${locality === "all" ? city : locality} (${count})`} /> */}
                    <h2 className="main-title">{`${category.replaceAll("-", " ")}  in ${locality === "all" ? city : locality}`} <span className="count">{`(${count || 0})`}</span></h2>

               

                    {

                        venuelists?.map((item, index) => (
                            <>
                                {/* <VenueCard key={index} venue={item} city={city} /> */}
                                <VenueCard2 key={index} venue={item} city={city} openLeadModel={openLeadModel} callConversion={callConversion}/>
                            </>

                        ))
                    }
                    
                    {
                        loading ?<div style={{textAlign:"center"}}> <Spinner2/> </div> : null
                    }
                    {/* Show the button only when the data are available */}
                    {
                        hasMore ? ( <button className="load-more-btn" onClick={fetchMoreVenue}>View More</button>) : (<center style={{fontSize:"1.5rem"}}>You have seen it all</center>)
                    }
                   
            

                </main>
            </div>

        </Section>
    )
}


export default VenueContainer;

const Section = styled.section`
padding-top:0px !important
;
background-color: var(--bg-color);

.sticky-head{
        position: sticky;
        top: 8rem;
        /* bottom: 0px; */
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding:1.5rem 2rem;
        box-shadow:var(--shadow);
        /* border-bottom: 1px solid gray;  */
        display: none;

        .page-title{
            display: flex;
            flex-direction: column;
            /* border: 1px solid red; */

            gap: .5rem;
            .main-title{
                font-family: "Montserrat";
                font-size:2rem ;
                text-transform: capitalize;


            }
            .count{
                color: var(--para);
                font-size: 1.5rem;
                font-family: "Poppins";
            }


        }

        .filter-btn{
            cursor: pointer;
            border: 1px solid var(--para);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            width: 100px;
            padding: 1rem;
            border-radius: 3rem;

            .filter-icon{
                color: var(--para);
                font-size: 2.5rem;
            }

            .filter-label{
                font-family: "Poppins";
                font-weight: 500;
                color: var(--para);
                font-size: 1.8rem;

            }
        }
        
    }

.venue-list-container{
    max-width: 155rem;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    /* border: 2px solid blue; */
    min-height: 100vh;
    /* max-height: 100vh; */

    .main-title{
        font-family: "Montserrat";
        font-size:2.8rem ;
        padding: 1rem 2rem;
        text-transform: capitalize;

        .count{
            color: var(--para);
            font-size: 1.7rem;
            font-family: "Poppins";
        }
    }
    
    .venue-filter{
        /* display: none; */
        position: sticky;
        top: 2%;
        min-width: 350px;
        min-height: 95vh;
        max-height: 95vh;
        /* overflow: scroll; */
        /* border: 1px solid red; */
        background-color: white;
        /* padding: 4rem 3rem ; */
        padding: 2rem 3rem ;
        /* border: 2px solid red; */

        .apply-btn{
            position: sticky;
            bottom: 0px;
            width: 90%;
            /* margin: auto; */
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            border: none;
            font-size: 1.8rem;
            font-family: "Poppins";
            padding: .5rem;
            /* border-radius: 10px; */
        }

     
        
    }
    
    
}

.venues-list{
    /* border: 1px solid red; */
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    max-width: 100%;

    .load-more-btn{
        /* max-width: 15rem; */
        margin: auto;
        border: none;
        outline: none;
        background-color: #F1F5FA;
        font-size: 1.8rem;
        font-family: "Poppins";
        padding: 1rem 2rem;
        cursor: pointer;
        transition: all .3s linear;
        background-color: var(--secoundary-color);
        color: white;
        border-radius: 5rem;

        /* &:hover{
            color: var(--para);
        } */

        
    }

   
    
}

@media (max-width:1000px) {
    .sticky-head{
        display: flex;
    }
    
    .venue-filter{
        display: none;
        position: fixed !important; 
        top: 0px !important;
        width: 100vw; /* Need a specific value to work */
        height: 100vh; /* Need a specific value to work */
        z-index: 999999;
        box-shadow: 0 0 10px  1000px rgba(0, 0, 0, .5);    
        

        .filters{

            /* border: 1px solid black; */
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;

        }   

    }
    .venues-list{
        grid-column: 1/-1;
        /* border: 1px solid green; */

    
    }
    .venue-list-container{
        .main-title{
            display: none;
        }
    }
}

@media (max-width:600px) {

    .sticky-head{
        top: 7rem;
    }
    
}

/* @media (max-width:1050px) {
    
 .venue-filter{
    display: none;
 }   
 .venues-list{
    grid-column: 1/-1;
    border: 1px solid green;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: white;
    /* display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem; */
    
/* } */
    
/* } */

`