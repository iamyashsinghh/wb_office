import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import getLocalities from "@/lib/request/getlocalities/getLocalities";
import { userAgentFromString } from "next/server";

const MyContext = createContext();

export const MyContextProvider = ({ children, initialData = {} }) => {
  const router = useRouter();
  const firstRender = useRef(true);

  // Destructure the initialData with default empty objects or arrays
  const {
    cities: initialCities = [],
    vendorCategories: initialVendorCategories = [],
    venueCategories: initialVenueCategories = [],
    vendor_list: initialVendorList = [],
    venue_list: initialVenueList = [],
  } = initialData;

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
  const [cities, setCities] = useState(initialCities);
  const [localities, setLocalities] = useState([]);
  const [vendorCategories, setVendorsCategories] = useState(initialVendorCategories);
  const [venueCategories, setVenuesCategories] = useState(initialVenueCategories);
  const [cityRoute, setCityRoute] = useState("");
  const [vendor_list, setVendor_list] = useState(initialVendorList);
  const [venue_list, setVenue_list] = useState(initialVenueList);
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
        setCities,
        isAvailableCheckShow,
        setIsAvailableCheckShow,
        localities,
        vendorCategories,
        setVendorsCategories,
        venueCategories,
        setVenuesCategories,
        vendor_list,
        setVendor_list,
        venue_list,
        setVenue_list,
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