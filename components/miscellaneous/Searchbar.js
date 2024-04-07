import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/MyContext";
import { useState } from "react";
import Image from "next/image";

function SearchBar({ venueCategogies, cities }) {
  const { selectedCity, setSelectedCity, setCityRoute } = useGlobalContext();

  const router = useRouter();

  const [venueType, setVenueType] = useState("banquet-halls");

  const cityhandler = (e) => {
    setSelectedCity(e.target.value);
    setCityRoute(e.target.value);
  };

  //This will be called when the user change the VenueType. onChange of venue type this will run
  const venueTypeHanlder = async (e) => {
    setVenueType(e.target.value);

    //We can't call search handler function because of async nature of useSate.
    const url = `/${e.target.value}/${selectedCity}/all`;
    router.push(url);

    // searchHablder();

    // console.log(e.target.value)
  };

  //This function will called when the user click on the serach btn
  const searchButtonHandler = (e) => {
    const url = `/${venueType}/${selectedCity}/all`;
    router.push(url);
  };

  return (
    <Wrapper>
      <div className=" dropdown city-dropdown">
        <div className="icon-container">
          <Image src={"/icons/location.png"} fill alt="icon" sizes="(100vw)" />
        </div>

        <label>
          <select
            name="cities"
            value={selectedCity}
            onChange={(e) => cityhandler(e)}
          >
            <option value={null} disabled>
              Select City
            </option>
            {cities?.map((city) => {
              return (
                <option value={city.slug} key={city.id}>
                  {" "}
                  {city.name}
                </option>
              );
            })}
          </select>
        </label>
        <AiFillCaretDown className="down-arrow" size={15} />
      </div>
      <div className=" dropdown venue-dropdown">
        <div className="icon-container">
          <Image src={"/icons/vendor.png"} fill alt="icon" sizes="(100vw)" />
        </div>

        <label>
          <select name="venue" onChange={(e) => venueTypeHanlder(e)}>
            <option value={null}> Select Venue</option>
            {venueCategogies?.map((venueCategogie) => {
              return (
                <option value={venueCategogie.slug} key={venueCategogie.id}>
                  {" "}
                  {venueCategogie.name}
                </option>
              );
            })}
          </select>
        </label>
        <AiFillCaretDown className="down-arrow" size={15} />
      </div>
      {/* <RxDividerVertical size={30} /> */}
      <div className="search-btn" onClick={(e) => searchButtonHandler(e)}>
        <BiSearch className="search-icon" />
      </div>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  position: absolute;
  top: 65%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 1;
  background: var(--secoundary-color);
  display: none;
  min-width: 70rem;
  border-radius: 0.3rem;
  overflow: hidden;

  select {
    font-family: "Poppins";
    font-size: 2rem;
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 1.5rem 3rem 1.5rem 4rem;
    color: var(--para);
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    z-index: 2;
    background-color: transparent;
  }
  .dropdown {
    display: flex;
    background-color: white;
    border-right: 1px solid silver;
    position: relative;
    height: 6rem;
    width: 50%;
  }

  .icon-container {
    top: 10px;
    left: 5px;
    /* border: 1px solid red; */
    height: 100%;
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 1;
  }

  .down-arrow {
    position: absolute;
    color: var(--para);
    top: 20px;
    right: 5px;
  }

  .search-btn {
    background: var(--secoundary-color);

    /* background: var(--primary-color); */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 10%;
    /* height: 100%; */
    cursor: pointer;
    /* padding: .8rem 0rem; */

    .search-icon {
      /* color: var(--primary-color); */
      color: white;
      font-size: 2rem;
      font-size: 3.9rem;
      font-family: "Poppins";
    }
  }

  @media (max-width: 1000px) {
    min-width: 80rem;
    display: flex;
  }

  @media (max-width: 800px) {
    min-width: 60rem;
    display: flex;

    .down-arrow {
      position: absolute;
      color: var(--para);
      top: 15px;
      right: 5px;
    }
  }
  @media (max-width: 550px) {
    top: 70%;
    right: 50%; //60 to 70 done
    transform: translate(50%, -50%);
    min-width: 90%;

    select {
      font-size: 1.8rem;
      padding: 1.5rem 3rem;
    }
    .dropdown {
      height: 5.5rem !important;
    }
    .down-arrow {
      top: 15px;
    }
    .search-btn {
      width: 15%;
    }
    .search-icon {
      font-size: 3rem !important;
    }
    .icon-container {
      top: 10px;
      left: 2px;
      width: 20px;
      height: 20px;
    }
  }
`;
