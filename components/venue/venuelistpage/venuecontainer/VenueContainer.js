import styled from "styled-components";
import { useState, useRef, useEffect, useCallback } from "react";
import { BiSlider } from 'react-icons/bi';
import { Spinner2 } from "@/styles/components/spinner";
import VenueCard2 from "./venueCard2";
import { useGlobalContext } from "@/context/MyContext";
import Filter from "../filter/Filter";
import useLeadModel from "@/lib/hook/useLeadModel";
import useCallConversion from "@/lib/hook/useCallConversion";
import SearchBarVenue from "@/components/miscellaneous/SearchBarVenue";
import Head from "next/head";

function VenueContainer({ city, lists, locality, category, count, localities, venueCategories, vendorCategories, filterQuery }) {
    const { setShowFilter, selectedCity, venue_list, vendor_list } = useGlobalContext();
    const { openLeadModel } = useLeadModel();
    const { callConversion } = useCallConversion();
    const [loading, setLoading] = useState(false);
    const [venuelists, setVenueList] = useState(lists || []);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const observer = useRef();

    const venueNames = venueCategories.map(category => category.name);
    const vendorNames = vendorCategories.map(category => category.name);
    const vendorBrandNames = vendor_list.map(category => category.brand_name);
    const allVenues = venue_list.map(category => category.name);
    const allVenuesSlug = venue_list.map(category => category.slug);
    const allVendorsSlug = vendor_list.map(category => category.slug);

    const suggestions = [
        ...venueNames,
        ...vendorNames,
        ...vendorBrandNames,
        ...allVenues,
    ];

    const venueObject = allVenues.map((name, i) => ({ [name]: allVenuesSlug[i] }));
    const vendorObject = vendorBrandNames.map((name, i) => ({ [name]: allVendorsSlug[i] }));

    useEffect(() => {
        setVenueList(lists);
    }, [lists]);

    useEffect(() => {
        setHasMore(venuelists.length < count);
    }, [venuelists, count]);

    useEffect(() => {
        const fetchFilteredVenue = async () => {
            setLoading(true);
            try {
                const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${filterQuery.locality}/1?guest=${filterQuery.guest}&per_budget=${filterQuery.per_budget}&per_plate=${filterQuery.per_plate}&multi_localities=${filterQuery.multi_localities}`;
                const response = await fetch(url);
                const newLists = await response.json();
                setVenueList(newLists.data);
                setPage(1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredVenue();
    }, [filterQuery, category, city]);

    const fetchMoreVenue = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const nextPage = page + 1;
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${filterQuery.locality}/${nextPage}?guest=${filterQuery.guest}&per_budget=${filterQuery.per_budget}&per_plate=${filterQuery.per_plate}&multi_localities=${filterQuery.multi_localities}`;
            const response = await fetch(url);
            const newLists = await response.json();
            setVenueList(prev => [...prev, ...newLists.data]);
            setPage(nextPage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page, filterQuery, category, city]);

    const lastVenueElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreVenue();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchMoreVenue]);


    return (
        <>
            <Head>
                {(category === 'banquet-halls' && city === 'delhi' && locality === 'mayapuri') && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "LocalBusiness",
                                "name": "Wedding Banquets",
                                "image": "https://weddingbanquets.in/_next/image?url=https%3A%2F%2Fcms.wbcrm.in%2Fstorage%2Fuploads%2Fvenue_la_fo_1719475089.jpg&w=3840&q=100",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Mayapuri Industrial Area",
                                    "addressLocality": "Mayapuri",
                                    "addressRegion": "Delhi",
                                    "postalCode": "110064",
                                    "addressCountry": "IN"
                                },
                                "telephone": "+917969071916",
                                "url": "https://weddingbanquets.in/banquet-halls/delhi/mayapuri",
                                "description": "A premier banquet hall located in Mayapuri, Delhi, ideal for weddings and events."
                            })
                        }}
                    />
                )}
            </Head>
            <Section className="section section-venue-container">
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
                        <Filter locality={locality} filterQuery={filterQuery} localities={localities} venueCategories={venueCategories} city={city} category={category} />
                    </aside>
                    <main className="venues-list box">
                        <div className="d-flex">
                            <h1 className="venue-conatiner-h1 main-title">{`${category.replaceAll("-", " ")}  in ${locality === "all" ? city.replaceAll("-", " ") : locality.replaceAll("-", " ")}`} <span className="count">{`(${count || 0})`}</span></h1>
                            <SearchBarVenue
                                suggestions={suggestions}
                                selectedCity={selectedCity}
                                vendorBrandNames={vendorBrandNames}
                                allVenues={allVenues}
                                allVenuesSlug={allVenuesSlug}
                                venueObject={venueObject}
                                vendorObject={vendorObject}
                            />
                        </div>
                        {venuelists?.map((item, index) => (
                            <VenueCard2
                                key={index}
                                locality={locality}
                                category={category}
                                venue={item}
                                city={city}
                                openLeadModel={openLeadModel}
                                callConversion={callConversion}
                            />
                        ))}
                        {loading && <div style={{ textAlign: "center" }}> <Spinner2 /> </div>}
                        <div ref={lastVenueElementRef}></div>
                        {!hasMore && <center style={{ fontSize: "1.5rem" }}>You have seen it all</center>}
                    </main>
                </div>
            </Section>
        </>
    );
}

export default VenueContainer;

const Section = styled.section`
padding-top:0px !important;
background-color: var(--bg-color);
.d-flex{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.venue-conatiner-h1{
    font-weight: 500;
}
.sticky-head{
        position: sticky;
        top: 8rem;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding:1.5rem 2rem;
        box-shadow:var(--shadow);
        display: none;

        .page-title{
            display: flex;
            flex-direction: column;
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
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    min-height: 100vh;

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
        position: sticky;
        top: 2%;
        min-width: 350px;
        min-height: 95vh;
        max-height: 95vh;
        background-color: white;
        padding: 2rem 3rem ;

        .apply-btn{
            position: sticky;
            bottom: 0px;
            width: 90%;
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            border: none;
            font-size: 1.8rem;
            font-family: "Poppins";
            padding: .5rem;
        }
    }
}

.venues-list{
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    max-width: 100%;

    .load-more-btn{
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
        width: 100vw; 
        height: 100vh; 
        z-index: 999999;
        box-shadow: 0 0 10px  1000px rgba(0, 0, 0, .5);    

        .filters{
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
`;