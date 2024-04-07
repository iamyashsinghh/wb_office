// MyContext.js

import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import getLocalities from "@/lib/request/getlocalities/getLocalities";
// import axios from 'axios';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  // console.log(process.env.NEXT_PUBLIC_SERVER_DOMAIN)
  const router = useRouter();
  const firstRender = useRef(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isLeadsModelOpen, setIsLeadsModelOpen] = useState(false);
  const [isAvailableCheckOpen, setIsAvailableCheckOpen] = useState(false);
  const [isAvailableCheckShow, setIsAvailableCheckShow] = useState(false);
  const [isAvailableCheckID, setIsAvailableCheckID] = useState(null);

  const [selectedCity, setSelectedCity] = useState("delhi");
  const [loggedUser, setLoggedUser] = useState(null);
  const [leadFormData, setLeadFormData] = useState(null);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]); //Localities will be fetched based on the selected city.
  const [vendorCategories, setVendorsCategories] = useState([]);
  const [venueCategories, setVenuesCategories] = useState([]);
  const [cityRoute, setCityRoute] = useState("");

  //This useEffect will run when we set the setRouteCity(city_slug), this will rediect to the /city url
  //I am setting city route when change with dropdwon on navbar and homepage dropdown, Because i want to that when a user change the city it will redirect to the /city page.
  //If a user is selecting the city and we are only setting the selectedCity state then the url will not be redirect. To rediect the url we have to update the CityRoute with new city slug.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      router.push(`/${cityRoute}`);
    }
  }, [cityRoute]);

  //Get All the cities,venue,vendors list. Calling context api here
  useEffect(() => {
    async function getLists() {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/state_management`;
        // console.log(url)

        //All in one API For context data
        // let context_data = await fetch("http://192.168.29.128/wedding_benquets/website/api/state_management");

        let context_data = await fetch(url);
        context_data = await context_data.json();
        console.log(context_data);

        //Setting the data on the context.
        setCities(context_data.data.cities);
        setVendorsCategories(context_data.data.vendor_categories);
        setVenuesCategories(context_data.data.venue_categories);
      } catch (error) {
        // console.log(error)
      }
    }

    //This function will call and this will fetch all the list of cities,vendors,and venue and store in state.
    getLists();
  }, []);

  //This useEffect will fetch the locality if the selectedcity change
  useEffect(() => {
    async function fetchLocalities() {
      
      const response = await getLocalities(selectedCity);
      if (response.success) {
        setLocalities(response.data);
      }
    }
    fetchLocalities();
  }, [selectedCity]);

  //get user details from the localStorage and set to the context api. If user is logged in
  useEffect(() => {
    try {
      let user = localStorage.getItem("@UserApp");
      if (user) {
        setLoggedUser(JSON.parse(user));
      }
    } catch (error) {
      // console.log(error);
      setLoggedUser(null);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        selectedCity,
        isAvailableCheckID,
        setIsAvailableCheckID,
        setSelectedCity,
        cities,
        isAvailableCheckShow,
        setIsAvailableCheckShow,
        localities,
        vendorCategories,
        venueCategories,
        isLeadsModelOpen,
        setIsLeadsModelOpen,
        isAvailableCheckOpen,
        setIsAvailableCheckOpen,
        leadFormData,
        setLeadFormData,
        showFilter,
        setShowFilter,
        setCityRoute,
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyContext;

export function useGlobalContext() {
  return useContext(MyContext);
}
