import styled from "styled-components";
import VendorCard from "./VendorCard";
import { useState, useRef, useEffect, useCallback } from "react";
import useLeadModel from "@/lib/hook/useLeadModel";
import { Spinner2 } from "@/styles/components/spinner";

export default function VendorGrid({ vendors, category, city, locality }) {
    const { data: vendors_list, count } = vendors;

    //To open leadModel 
    const { openLeadModel } = useLeadModel();

    let page = useRef(1);
    const [hasMore, setHasMore] = useState(true);
    const [vendorLists, setVendorLists] = useState(vendors_list || null);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    useEffect(() => {
        setVendorLists(vendors_list);
    }, [vendors_list]);

    useEffect(() => {
        setHasMore(vendorLists.length < count);
    }, [vendorLists]);

    const fetchMoreVendors = async () => {
        try {
            setLoading(true);
            if (vendorLists.length >= count) {
                setHasMore(false);
                return;
            }
            page.current += 1;
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}/${page.current}`;
            let lists = await fetch(url);
            lists = await lists.json();
            lists = lists.data;
            setVendorLists(prev => [...prev, ...lists]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const lastVendorElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreVendors();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <Wrapper className="section vendor-grid-section">
            <div className="container">
                <div className="card-container">
                    {vendorLists?.map((vendor, index) => {
                        if (vendorLists.length === index + 1) {
                            return (
                                <VendorCard
                                    key={vendor.key}
                                    category={category}
                                    locality={locality}
                                    city={city}
                                    vendor={vendor}
                                    openLeadModel={openLeadModel}
                                />
                            );
                        } else {
                            return (
                                <VendorCard
                                    key={vendor.key}
                                    category={category}
                                    locality={locality}
                                    city={city}
                                    vendor={vendor}
                                    openLeadModel={openLeadModel}
                                />
                            );
                        }
                    })}
                </div>
                {loading && (
                    <div style={{ textAlign: "center" }}>
                        <Spinner2 />
                    </div>
                )}
                {!hasMore && (
                    <center style={{ fontSize: "1.5rem" }}>You have seen it all</center>
                )}
                <div ref={lastVendorElementRef}></div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    padding-top: 0 !important;
    .container {
        .load-more-btn-container {
            text-align: center;
            margin-top: 1rem;
        }
        .load-more-btn {
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

    .card-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1rem;
        gap: 2rem;
    }

    @media (max-width: 1000px) {
        .card-container {
            grid-template-columns: repeat(auto-fit, minmax(45%, auto));
        }
    }

    @media (max-width: 600px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }
`;