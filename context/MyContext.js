import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import getLocalities from "@/lib/request/getlocalities/getLocalities";
import { userAgentFromString } from "next/server";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const router = useRouter();

  const firstRender = useRef(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isLeadsModelOpen, setIsLeadsModelOpen] = useState(false);
  const [isAvailableCheckOpen, setIsAvailableCheckOpen] = useState(false);
  const [isAvailableCheckShow, setIsAvailableCheckShow] = useState(false);
  const [isAvailableCheckID, setIsAvailableCheckID] = useState(null);
  const [selectedCity, setSelectedCity] = useState("delhi");
  const [loggedUser, setLoggedUser] = useState(null);
  const [leadFormData, setLeadFormData] = useState(null);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [vendorCategories, setVendorsCategories] = useState([]);
  const [venueCategories, setVenuesCategories] = useState([]);
  const [cityRoute, setCityRoute] = useState("");
  const [vendor_list, setVendor_list] = useState([]);
  const [venue_list, setVenue_list] = useState([]);
  const [userIP, setUserIP] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState("");

  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    async function fetchIP() {
      const getuserip = await getUserIP();
      setUserIP(getuserip);
    }
    const requestt = userAgentFromString();
    setUserAgent(requestt);
    fetchIP();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      router.push(`/${cityRoute}`);
    }
  }, [cityRoute]);

  useEffect(() => {
    async function getLists() {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/state_management`;
        let context_data = await fetch(url);
        context_data = await context_data.json();

        setCities(context_data.data.cities);
        setVendorsCategories(context_data.data.vendor_categories);
        setVenuesCategories(context_data.data.venue_categories);
      } catch (error) {
        console.error("Error fetching context data:", error);
      }
    }
    getLists();
  }, []);

  useEffect(() => {
    async function fetchLocalities() {
      const response = await getLocalities(selectedCity);
      if (response.success) {
        setLocalities(response.data);
      }
    }
    fetchLocalities();
  }, [selectedCity]);

  useEffect(() => {
    try {
      let user = localStorage.getItem("@UserApp");
      if (user) {
        setLoggedUser(JSON.parse(user));
      }
    } catch (error) {
      setLoggedUser(null);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('utm_source')) {
      const expirationTime = 60 * 60 * 1000;
      const expiryTimestamp = Date.now() + expirationTime;
      localStorage.setItem('utm_source_expiry', expiryTimestamp);
    }
    const expiryTimestamp = localStorage.getItem('utm_source_expiry');
    if (expiryTimestamp && parseInt(expiryTimestamp) > Date.now()) {
      localStorage.setItem('utm_source_active', '1');
    } else {
      localStorage.setItem('utm_source_active', '0');
    }
  }, []);

  useEffect(() => {
    const fetchDataAfterLoad = async () => {
      try {
        const searchurl2 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_vendor`;
        let vendorList = await fetch(searchurl2);
        vendorList = await vendorList.json();
        setVendor_list(vendorList);

        const searchurl3 = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/search_form_result_venue`;
        let venueList = await fetch(searchurl3);
        venueList = await venueList.json();
        setVenue_list(venueList);
      } catch (error) {
        console.error("Error fetching vendor or venue lists:", error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchDataAfterLoad();
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isSearchMenuOpen,
        setIsSearchMenuOpen,
        selectedCity,
        isAvailableCheckID,
        setIsAvailableCheckID,
        setSelectedCity,
        userIP,
        setUserIP,
        userAgent,
        setUserAgent,
        cities,
        isAvailableCheckShow,
        setIsAvailableCheckShow,
        localities,
        vendorCategories,
        venueCategories,
        vendor_list,
        venue_list,
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