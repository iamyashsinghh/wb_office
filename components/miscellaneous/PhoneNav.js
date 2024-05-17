import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaStore, FaHome, FaHotel } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { IoMdContact } from 'react-icons/io';
import Link from 'next/link';
import { useGlobalContext } from '@/context/MyContext';
import { useRouter } from 'next/router';

function PhoneNav() {
    const { setLeadFormData, setIsLeadsModelOpen, vendor_list, venue_list, vendorCategories, venueCategories, selectedCity } = useGlobalContext();
    const router = useRouter();
    const [hasTriggered, setHasTriggered] = useState(false);

    const openLeadsModel = (e) => {
        e.stopPropagation();
        const pathSegments = router.asPath.split('/').filter((segment) => segment.length > 0);
        let venue_slug;
        if (pathSegments.length === 2) {
            venue_slug = pathSegments[1];
        } else {
            venue_slug = router.asPath;
        }
        const leadData = {
            url: router.asPath,
            venue_slug: venue_slug,
            type: 'click',
            request_handle_by: 'form',
        };
        setLeadFormData(leadData);
        setIsLeadsModelOpen(true);
        if (e) {
            e.stopPropagation();
        }
    };

    const isActive = (menuType) => {
        const currentPath = router.asPath;
        if (menuType === 'home') {
            if (currentPath === '/' || currentPath === `/${selectedCity}`) {
                return 'active';
            }
        } else if (menuType === 'venue') {
            return (
                venue_list.some((venue) => currentPath.includes(venue.slug)) ||
                    venueCategories.some((category) => currentPath.includes(category.slug))
                    ? 'active'
                    : ''
            );
        } else if (menuType === 'vendor') {
            const pathSegments = currentPath.split('/');
            const vendorPathSegment = pathSegments.length > 2 ? pathSegments[1] : null;
            const isActiveVendor =
                vendor_list.some((vendor) => currentPath.includes(vendor.slug)) ||
                vendorCategories.some((category) => category.slug === vendorPathSegment);
            return isActiveVendor ? 'active' : '';
        }
        return '';
    };

    useEffect(() => {
        const hasTriggeredBefore = localStorage.getItem('hasTriggered');
    
        if (hasTriggeredBefore === 'true') {
            return;
        }

        const handleScroll = () => {
            const scrollPercentage =
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const halfPageLoaded = window.scrollY > (document.documentElement.scrollHeight / 2);
    
            if ((!hasTriggered && scrollPercentage >= 50) || (!hasTriggered && halfPageLoaded)) {
                console.log('Scroll trigger detected');
                triggerOpenLeadsModel();
            }
        };
    
        const triggerOpenLeadsModel = () => {
            const leadData = {
                url: router.asPath,
                venue_slug: getVenueSlug(),
                type: 'scroll',
                request_handle_by: 'form',
            };
            setLeadFormData(leadData);
            setIsLeadsModelOpen(true);
            setHasTriggered(true);
            localStorage.setItem('hasTriggered', true);
            localStorage.setItem('lastTriggerTime', new Date().getTime());
        };
    
        const getVenueSlug = () => {
            const pathSegments = router.asPath.split('/').filter((segment) => segment.length > 0);
            return pathSegments.length === 2 ? pathSegments[1] : router.asPath;
        };
    
        const timeoutId = setTimeout(() => {
            if (!hasTriggered) {
                console.log('Timeout trigger detected');
                triggerOpenLeadsModel();
            }
        }, 10000);
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [hasTriggered]);
    
    
       

    return (
        <>
            <Wrapper>
                <div className="phone-nav">
                    <div className="phone-nav__menu">
                        <div className={`phone-nav__menu-item ${isActive('home')}`}>
                            <Link className="aTagLink" href={`/${selectedCity}`}>
                                <FaHome className="phone-nav__menu-item-icon" />
                                <div>Home</div>
                            </Link>
                        </div>
                        <div className={`phone-nav__menu-item ${isActive('venue')}`}>
                            <Link href={`/banquet-halls/${selectedCity}/all`} className="aTagLink">
                                <FaHotel className="phone-nav__menu-item-icon" />
                                <div>Venue</div>
                            </Link>
                        </div>
                        <div className={`phone-nav__menu-item ${isActive('vendor')}`}>
                            <Link href={`/${selectedCity}#wedding-vendors-by-category`} className="aTagLink">
                                <FaStore className="phone-nav__menu-item-icon" />
                                <div>Vendor</div>
                            </Link>
                        </div>
                        <div className="phone-nav__menu-item">
                            <div className="aTagLink" onClick={(e) => openLeadsModel(e)}>
                                <IoMdContact className="phone-nav__menu-item-iconn" />
                                <div>Contact</div>
                            </div>
                        </div>
                        <div className={`phone-nav__menu-item`}>
                            <Link className="aTagLink" href={`tel:07969071909`}>
                                <AiFillPhone className="phone-nav__menu-item-icon" />
                                <div>Phone</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
}
const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: #ffecee;
    width: 100%;
    box-shadow: 0px -3px 15px -4px #00000080;
    @media (min-width: 1000px) {
        display: none;
    }
    .phone-nav__menu {
        display: flex;
        .phone-nav__menu-item {
            flex: 1;
            text-align: center;
            padding: 1rem 0;
            .aTagLink {
                text-decoration: none;
                color: #000;
                font-size: 1.6rem;
                transition: color 0.3s, background-color 0.3s;
            }
            div {
                text-decoration: none;
                color: #000;
                font-size: 1.6rem;
            }
            .phone-nav__menu-item-icon {
                font-size: 2.8rem;
            }
            .phone-nav__menu-item-iconn {
                font-size: 3.3rem;
                margin-top: -2px;
                margin-bottom: -2px;
            }
            &.active .aTagLink {
                .phone-nav__menu-item-icon {
                    color: #980000;
                }
                div {
                    color: #980000;
                }
            }
        }
    }
`;

export default PhoneNav;