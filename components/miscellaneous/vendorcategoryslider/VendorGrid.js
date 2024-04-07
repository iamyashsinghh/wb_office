import VendorCard from "./VendorCard";
import styled from "styled-components";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import ExtraCard from "./ExtraCard";

export default function VendorGrid({ vendorCategories }) {
  const [viewMore, setViewMore] = useState(false);

  return (
    <Wrapper className="container">
      <div className="vendor-grid-container">
        <div className="vendor-category-card">
          <ExtraCard img={`/vendor-vector/1.png`} data="" />
          {vendorCategories?.slice(0, 6).map((vendor, i) => {
            return (
              <VendorCard
                key={i}
                img={`/vendor-vector/${vendor.id}.png`}
                data={vendor}
              />
            );
          })}

          {viewMore
            ? vendorCategories?.slice(6).map((vendor, i) => {
                return (
                  <VendorCard
                    key={i}
                    img={`/vendor-vector/${vendor.id}.png`}
                    data={vendor}
                  />
                );
              })
            : ""}
        </div>
        <div className="view-all-btn">
          <button onClick={(e) => setViewMore(!viewMore)}>
            View {viewMore ? "Less" : "More"}
            <BiChevronDown />
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: none;
  /* border: 1px solid red; */

  .vendor-grid-container {
    /* display: none; */

    position: relative;
    padding: 3rem 1rem;
  }
  .vendor-category-card {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .view-all-btn {
    /* text-align: center; */
    margin-top: 2rem;
    button {
      background: none;
      display: flex;
      align-items: center;
      color: var(--para);
      font-size: 1.7rem;
      font-family: "Poppins";
      /* width: 90%; */
      margin: auto;
      /* color: white; */
      border: none;
      /* border: 1px solid red; */
      cursor: pointer;
    }
  }
  @media (max-width: 600px) {
    display: block;
  }
`;
