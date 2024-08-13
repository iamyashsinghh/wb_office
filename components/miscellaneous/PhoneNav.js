import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStore, FaHome, FaHotel } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { useGlobalContext } from "@/context/MyContext";
import { useRouter } from "next/router";

function PhoneNav() {
  const {
    setLeadFormData,
    setIsLeadsModelOpen,
    vendor_list,
    venue_list,
    vendorCategories,
    venueCategories,
    selectedCity,
  } = useGlobalContext();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("home");
  const [hasTriggered, setHasTriggered] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);

  const openLeadsModel = (e, type = "click") => {
    if (e) e.stopPropagation();

    const pathSegments = router.asPath
      .split("/")
      .filter((segment) => segment.length > 0);
    let venue_slug =
      pathSegments.length === 2 ? pathSegments[1] : router.asPath;

    const leadData = {
      url: router.asPath,
      venue_slug: venue_slug,
      type: type,
      request_handle_by: "form",
    };

    setLeadFormData(leadData);
    setIsLeadsModelOpen(true);
    setHasTriggered(true);
    setTriggerCount((prevCount) => prevCount + 1);

    localStorage.setItem("hasTriggered", "true");
    localStorage.setItem("lastTriggerTime", new Date().getTime().toString());
  };

  const determineActiveMenu = (path) => {
    if (!venue_list || !venueCategories || !vendor_list || !vendorCategories) {
      return "home"; // Default to home if data is not available
    }

    const pathSegments = path.split("/").filter((segment) => segment.length > 0);
    const firstSegment = pathSegments[0];
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (path === "/" || path === `/${selectedCity}`) {
      return "home";
    } else if (
      venue_list.some((venue) => path.includes(venue.slug)) ||
      venueCategories.some((category) => path.includes(category.slug))
    ) {
      return "venue";
    } else if (
      vendor_list.some((vendor) => path.includes(vendor.slug)) ||
      vendorCategories.some((category) => {
        return path.includes(category.slug) || category.slug === firstSegment || category.slug === lastSegment;
      })
    ) {
      return "vendor";
    }

    return "home";
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      setActiveMenu(determineActiveMenu(url));
    };

    if (venue_list && venueCategories && vendor_list && vendorCategories) {
      setActiveMenu(determineActiveMenu(router.asPath));
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.asPath, venue_list, venueCategories, vendor_list, vendorCategories]);

  useEffect(() => {
    const hasTriggeredBefore = localStorage.getItem("hasTriggered");

    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      const halfPageLoaded =
        window.scrollY > document.documentElement.scrollHeight / 2;

      if (
        (!hasTriggered && scrollPercentage >= 30) ||
        (!hasTriggered && halfPageLoaded)
      ) {
        openLeadsModel(null, "scroll");
      }
    };

    const triggerInterval = setInterval(() => {
      if (triggerCount < 4) {
        openLeadsModel(null, "interval");
      } else {
        clearInterval(triggerInterval);
      }
    }, 30000);

    const timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        openLeadsModel(null, "timeout");
      }
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
      clearInterval(triggerInterval);
    };
  }, [hasTriggered, triggerCount]);

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <MainComp>
      <Wrapper>
        <input
          type="radio"
          name="s"
          id="s1"
          defaultChecked={activeMenu === "home"}
        />
        <input
          type="radio"
          name="s"
          id="s2"
          defaultChecked={activeMenu === "venue"}
        />
        <input
          type="radio"
          name="s"
          id="s3"
          defaultChecked={activeMenu === "vendor"}
        />
        <input
          type="radio"
          name="s"
          id="s4"
        />
        <input
          type="radio"
          name="s"
          id="s5"
        />
          <label htmlFor="s1" onClick={() => handleNavigation(`/${selectedCity}`)}>
            <FaHome className="phone-nav__menu-item-icon" />
            <br />
            <div>Home</div>
          </label>
          <label htmlFor="s2" onClick={() => handleNavigation(`/banquet-halls/${selectedCity}/all`)}>
            <FaHotel className="phone-nav__menu-item-icon" />
            <br />
            {activeMenu !== "venue" && <div>Venue</div>}
          </label>
          <label htmlFor="s3" onClick={() => handleNavigation(`/${selectedCity}#wedding-vendors-by-category`)}>
            <FaStore className="phone-nav__menu-item-icon" />
            <br />
            {activeMenu !== "vendor" && <div>Vendor</div>}
          </label>
          <label htmlFor="s4" onClick={(e) => openLeadsModel(e)}>
            <IoMdContact className="phone-nav__menu-item-icon" />
            <br />
            {activeMenu !== "contact" && <div>Contact</div>}
          </label>
          <label htmlFor="s5" onClick={() => window.location.href = `tel:07969071909`}>
            <AiFillPhone className="phone-nav__menu-item-icon" />
            <br />
            {activeMenu !== "phone" && <div>Phone</div>}
          </label>
        <div className="circle"></div>
        <div className="phone_content">
          <div className="phone_bottom">
            <span className="indicator"></span>
          </div>
        </div>
      </Wrapper>
    </MainComp>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 999;
  color: #fff;
  width: 100%;
  height: 85px;
  margin: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 64%;
    height: 0px;
    bottom: -10px;
    left: 0;
    right: 0;
    margin: auto;
  }

  &::after {
    content: "";
  }

  .phone_content {
    filter: contrast(20);
    width: 100%;
    background-color: white;
    overflow: hidden;
    position: absolute;
  }

  .phone_bottom {
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
    filter: blur(10px);
    background: var(--primary-color);
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 66px;
    position: relative;
    z-index: 2;
    align-items: center;
    justify-content: center;
    color: white;
  }

  label > .phone-nav__menu-item-icon {
    font-size: 2.8rem;
    color: white;
    transition: 200ms 100ms cubic-bezier(0.14, -0.08, 0.74, 1.4);
  }

  .circle {
    width: 45px;
    height: 45px;
    background: var(--primary-color);
    position: absolute;
    top: 0;
    z-index: 1;
    border-radius: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);
  }

  .indicator {
    width: 65px;
    height: 75px;
    background-image: linear-gradient(0deg, #ffffff, #ffffff),
      linear-gradient(0deg, #ffffff, #ffffff),
      linear-gradient(0deg, #ffffff, #ffffff);
    background-size: cover;
    background-position: 0 10px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: -40px;
    right: 0;
    margin: auto;
    transition: 200ms cubic-bezier(0.14, -0.08, 0.74, 1.4);
  }

  #s1:checked ~ label[for="s1"] > .phone-nav__menu-item-icon {
    margin-top: -55px;
  }
  #s1:checked ~ .circle,
  #s1:checked ~ .phone_content .phone_bottom .indicator {
    left: -80%;
  }

  #s2:checked ~ label[for="s2"] > .phone-nav__menu-item-icon {
    margin-top: -50px;
  }
  #s2:checked ~ .circle,
  #s2:checked ~ .phone_content .phone_bottom .indicator {
    left: -40%;
  }

  #s3:checked ~ label[for="s3"] > .phone-nav__menu-item-icon {
    margin-top: -53px;
  }
  #s3:checked ~ .circle,
  #s3:checked ~ .phone_content .phone_bottom .indicator {
    left: 0;
  }

  #s4:checked ~ label[for="s4"] > .phone-nav__menu-item-icon {
    margin-top: -50px;
  }
  #s4:checked ~ .circle,
  #s4:checked ~ .phone_content .phone_bottom .indicator {
    left: 40%;
  }

  #s5:checked ~ label[for="s5"] > .phone-nav__menu-item-icon {
    margin-top: -50px;
  }
  #s5:checked ~ .circle,
  #s5:checked ~ .phone_content .phone_bottom .indicator {
    left: 80%;
  }

  label > div {
    display: block;
  }

  #s1:checked ~ label[for="s1"] > div,
  #s2:checked ~ label[for="s2"] > div,
  #s3:checked ~ label[for="s3"] > div,
  #s4:checked ~ label[for="s4"] > div,
  #s5:checked ~ label[for="s5"] > div {
    display: none;
  }
`;
const MainComp = styled.div`
 display: none;

     @media (max-width: 1000px) {
      display: block;
    }`;

export default PhoneNav;
