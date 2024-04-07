import styled from "styled-components";
import { keyframes } from "styled-components";
import { useState } from "react";
import { IoIosCall } from 'react-icons/io'
import { useGlobalContext } from "@/context/MyContext";
import CallingRequest from "@/lib/request/callingrequest/CallingRequest";

export default function Tabs({ vendor, openLeadsModel }) {
    // console.log(vendor.package_option.split(","))
    // console.log(vendor.package_option)

    // const packages = vendor.package_option.split(",").filter(pack=>pack);
    const packages = vendor.package_option?.split(",").map((item) => item.trim()).filter((item) => item)

    // console.log(packages)

    const [activeTabId, setActiveTab] = useState(1);

    // console.log(packages)

    async function handleAnchorClick(e, slug) {
        e.stopPropagation();
        await CallingRequest(slug);

    }

    return (
        <Wrapper>
            <div className="container">

                <div className="tabs-container">
                    <div className="tab-btn-container">
                        <button className={`tab-btn ${activeTabId === 1 && "selected-tab-btn"}`} onClick={() => setActiveTab(1)}>Package</button>
                        <button className={`tab-btn ${activeTabId === 2 && "selected-tab-btn"}`} onClick={() => setActiveTab(2)}>Contact Info</button>
                        <button className={`tab-btn ${activeTabId === 3 && "selected-tab-btn"}`} onClick={() => setActiveTab(3)}>About</button>

                    </div>
                    <div className="tab-content-container">
                        {
                            activeTabId === 1 && (<>
                                <ul className="first-grid-container">
                                    {
                                        packages?.map((price_package, i) => {
                                            return (
                                                <li className="info" key={i}>
                                                    {price_package}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="secound-grid-container">


                                </div>
                            </>)
                        }
                        {
                            activeTabId === 2 && (<>
                                <div className="first-grid-container">
                                    <h2 className="label">Address</h2>
                                    <p className="info set-max-width">{vendor.vendor_address}</p>
                                </div>
                                <div className="secound-grid-container">
                                    <h2 className="label">Phone</h2>
                                    <p className="info">0{vendor.phone}</p>

                                </div>
                            </>)
                        }
                        {
                            activeTabId === 3 && (
                                <>
                                    <div className="first-grid-container">
                                        <h2 className="info">Years Of Experience: <span className="label">5</span></h2>

                                    </div>
                                    <div className="secound-grid-container">
                                        <h2 className="info">Events Completed: <span className="label">100</span></h2>


                                    </div>
                                </>
                            )
                        }


                        <div className="action-btns">
                            <button className="venue-card-btn" onClick={(e) => { openLeadsModel() }}>Get Quotation</button>
                            <a href={`tel:0${vendor.phone}`} onClick={(e) => { handleAnchorClick(e, vendor?.slug) }} className="call-btn" aria-label="call icon ">
                                <IoIosCall className="call-icon" />
                            </a>

                        </div>
                    </div>
                </div>
            </div>


        </Wrapper>
    )
}
const slideIn = keyframes`
from {
  transform: translateY(20px);
}
to {
  transform: translateY(0);
}
`;
  const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const Wrapper = styled.section`
  background-color: var(--bg-color);
  animation: ${fadeIn} 0.5s ease-out forwards;

  .tabs-container {
    .tab-btn-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      animation: ${slideIn} 0.5s ease-out forwards;

      .tab-btn {
        text-align: center;
        color: var(--primary-color);
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 500;
        padding: 1rem;
        cursor: pointer;
        background-color: transparent;
        outline: none;
        border: none;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          color: white;
          background-color: var(--primary-color);
          animation: none;
        }
      }
      .selected-tab-btn {
        color: white;
        background-color: var(--primary-color);
        border-bottom: none;
        animation: none;
      }
    }

    .tab-content-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 2rem;
      animation: ${slideIn} 0.5s ease-out forwards;

      .label {
        font-size: 2rem;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--primary-color);
      }
      .info {
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
        list-style: inside;
      }
    }
  }
  
  .set-max-width{
    max-width: 340px;
  }

  .action-btns {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rem 2rem 1rem 2rem;
    width: 100%;
    animation: ${fadeIn} 0.8s ease-out forwards;

    .venue-card-btn {
      background: none;
      border: 1px solid #F33232;
      padding: 1rem 2.5rem;
      text-transform: uppercase;
      border-radius: 0.5rem;
      font-size: 1.8rem;
      cursor: pointer;
      transition: all 0.3s linear;
      color: #F33232;

      &:hover {
        background-color: #F33232;
        color: white;
        transform: translateY(-2px);
      }
    }
    .call-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2rem 0.8rem;
      cursor: pointer;
      transition: transform 0.3s;

      .call-icon {
        font-size: 30px;
        color: var(--phone);
        transition: color 0.3s;
      }

      &:hover {
        transform: scale(1.1);

        .call-icon {
          color: white;
        }
      }
    }
  }

  @media (max-width: 850px) {
    .tab-content-container {
      grid-template-columns: repeat(1, 1fr) !important;
      gap: 2rem;
      padding: 2rem;
    }
  }
`;