import React, { useRef } from 'react';
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { useGlobalContext } from "@/context/MyContext";
import { css } from "styled-components";
// ----------------------------------------------------
import { MdCancel } from 'react-icons/md'
import SearchBarForSideBar from "./SearchBarForSideBar";


export default function SideSearchMenuBar() {
    const { isSearchMenuOpen, setIsSearchMenuOpen, vendor_list, venue_list, vendorCategories, venueCategories, cities, selectedCity } = useGlobalContext();
    const handlers = useSwipeable({
        onSwipedRight: (eventData) => { setIsSearchMenuOpen(false) },
    });
    const timeoutRef = useRef(null);

    const handleBlur = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            setIsSearchMenuOpen(false);
            timeoutRef.current = null;
        }, 300);
    };
    let venueObject = [];
    let vendorObject = [];
    let venueNames = venueCategories.map((category) => category.name);
    let cityNames = cities.map((city) => city.name);
    let vendorNames = vendorCategories.map((category) => category.name);
    let vendorBrandNames = vendor_list.map((category) => category.brand_name);
    let allVenues = venue_list.map((category) => category.name);
    let allVenuesSlug = venue_list.map((category) => category.slug);
    let allVendorsSlug = vendor_list.map((category) => category.slug);
    const suggestions = [
        ...venueNames,
        ...vendorNames,
        ...vendorBrandNames,
        ...allVenues,
    ];
    for (let i = 0; i < allVenues.length; i++) {
        let obj = {};
        obj[allVenues[i]] = allVenuesSlug[i];
        venueObject.push(obj);
    }
    for (let i = 0; i < vendorBrandNames.length; i++) {
        let obj = {};
        obj[vendorBrandNames[i]] = allVendorsSlug[i];
        vendorObject.push(obj);
    }
    return (
        <Wrapper {...handlers} isActive={isSearchMenuOpen}>
            <Div isActive={isSearchMenuOpen} onBlur={handleBlur} tabIndex="1">
                <div className="menu-img">
                        <h3 className="searchBarMenuTitle">Plan Your Dream Wedding!</h3>
                        <p className="searchBarMenuDesc">Search for venues, Makeup Artists, Photographers and more!</p>
                        <MdCancel className="cancel-icon" onClick={() => setIsSearchMenuOpen(false)} />
                    <SearchBarForSideBar
                        suggestions={suggestions}
                        selectedCity={selectedCity}
                        vendorBrandNames={vendorBrandNames}
                        allVenues={allVenues}
                        allVenuesSlug={allVenuesSlug}
                        venueObject={venueObject}
                        vendorObject={vendorObject}
                    />
                </div>
            </Div>
        </Wrapper>)
}

const Wrapper = styled.div`
transform: translateX(100%);
position: fixed;
top: 0;
right: 0;
min-height: 100vh;
max-height: 100vh;
overflow-x: hidden;
overflow-y:hidden;
z-index: 999999;
visibility: hidden;
opacity: 0;
transition: all .3s linear;
.searchBarMenuTitle{
    margin-top: 50px;
    text-align: center;
    font-size: 2.5rem;
    color: #870808;
}
.searchBarMenuDesc{
    max-width: 260px;
    text-align: center;
    font-size: 1.5rem;
    color: grey;
    margin:0 auto;
    margin-bottom: 20px;
}


${({ isActive }) =>
        isActive &&
        css`
      opacity: 1;
      visibility: visible;
      transform: translateX(0%);
      `}

`

const Div = styled.div`
box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
transition: all .3s linear;
z-index: 1000;
margin-left: auto;
background-color: white;
width: 100%;
top: 0;
right: 0;
min-height: 100vh;
overflow-x: hidden;
overflow-y:scroll;
.menu-img{
    position: relative;
    height: 100vh;
    min-width: 100vw;
}
.cancel-icon{
    color: black;
    font-size: 3rem;
    position: fixed;
    top:15px;
    right:15px;
    z-index: 999999999999999;
}
`