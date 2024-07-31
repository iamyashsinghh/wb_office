import Gallery from "@/components/vendor/vendordetailspage/gallery/Gallery";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const TabsComponent = ({ images }) => {
  const [activeTab, setActiveTab] = useState("photos");

  const slidingAnimation = useSpring({
    to: { opacity: 1, transform: "translateX(0)" },
    from: { opacity: 0, transform: "translateX(-100%)" },
    reset: true,
  });

  return (
    <Wrapper className="info-section">
      <div className="box container">
        <div className="tab-titles">
          <button
            className={`tab-button ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            Media
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "photos" ? (
            <animated.div style={slidingAnimation}>
              <Gallery images={images} />
            </animated.div>
          ) : (
            <animated.div style={slidingAnimation}>
              Video Gallery Here
            </animated.div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default TabsComponent;

const Wrapper = styled.div`
  background-color: var(--bg-color);
  .box {
    background-color: white;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    overflow: hidden;
  }
  .tab-titles {
  }
  .tab-button {
    margin-left: 10px;
    margin-top: 3px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #870808;
    font-weight: 600;
  }

  .tab-button.active {
    border-bottom: 2px solid #870808;
  }

  .tab-content {
    height: auto;
  }
`;