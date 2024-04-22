import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components';
import VendorCard from './VendorCard';
import useLeadModel from '@/lib/hook/useLeadModel';
import { Spinner2 } from '@/styles/components/spinner';

export default function VendorGrid({ vendors, category, city, locality, data }) {
  const { data: vendors_list, count } = vendors;
  const { openLeadModel } = useLeadModel();

  const page = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [vendorLists, setVendorLists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickAnywhere = () => {
      const scrollX = window.scrollX.toString();
      const scrollY = window.scrollY.toString();
      sessionStorage.setItem('scrollPositionX', scrollX);
      sessionStorage.setItem('scrollPositionY', scrollY);
    };
    window.addEventListener('click', handleClickAnywhere);
    return () => {
      window.removeEventListener('click', handleClickAnywhere);
    };
  }, []);

  useEffect(() => {
    const initialVendors = JSON.parse(sessionStorage.getItem('vendors')) || vendors_list;
    const currentPage = Number(sessionStorage.getItem('currentPage')) || 1;
    page.current = currentPage;
    setVendorLists(initialVendors);
    setHasMore(initialVendors.length < count);
  }, []);

  const handleCardClick = useCallback((vendorId) => {
    openLeadModel(vendorId);
  }, [openLeadModel]);

  useEffect(() => {
    sessionStorage.setItem('vendors', JSON.stringify(vendorLists));
    sessionStorage.setItem('currentPage', page.current.toString());
  }, [vendorLists]);

  useLayoutEffect(() => {
    if (!loading && vendorLists.length > 0) {
      setTimeout(() => {
        window.requestAnimationFrame(() => {
          const scrollX = parseInt(sessionStorage.getItem('scrollPositionX') || 0);
          const scrollY = parseInt(sessionStorage.getItem('scrollPositionY') || 0);
          window.scrollTo(scrollX, scrollY);
        });
      }, 300);
    }
  }, [loading, vendorLists.length]);
  
  async function fetchMoreVendors() {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      page.current += 1;
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}/${page.current}`;
      const response = await fetch(url);
      const newData = await response.json();
      setVendorLists(prev => [...prev, ...newData.data]);
      setHasMore(vendorLists.length + newData.data.length < count);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper className="section vendor-grid-section">
      <div className="container">
        <div className="card-container">
          {vendorLists.map(vendor => (
            <VendorCard key={vendor.key} vendor={vendor} onClick={() => handleCardClick(vendor.key)} />
          ))}
        </div>
        {loading ? (
          <Spinner2 style={{ textAlign: "center" }} />
        ) : hasMore ? (
          <div className="load-more-btn-container">
            <button className="load-more-btn" onClick={fetchMoreVendors}>
              View More
            </button>
          </div>
        ) : (
          <center style={{ fontSize: "1.5rem" }}>You have seen it all</center>
        )}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding-top: 0 !important;
  z-index: 0;
  .container {
    .load-more-btn-container {
      text-align: center;
      margin-top: 1rem;
    }
    .load-more-btn {
      /* max-width: 15rem; */
      margin: auto;
      border: none;
      outline: none;
      background-color: #f1f5fa;
      font-size: 1.8rem;
      font-family: "Poppins";
      padding: 1rem 2rem;
      cursor: pointer;
      transition: all 0.3s linear;
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
