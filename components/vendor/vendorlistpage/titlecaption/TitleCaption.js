import Pagedescription from "@/components/miscellaneous/pagedescription/PageDescription";
import styled from "styled-components";
import VendorSearchBar from "../vendorSearchBar/VendorSearchBar";

export default function TitleCaption({
  caption,
  category,
  city,
  locality,
  count,
}) {
  return (
    <Wrapper className="section title-caption-section">
      <div className="header">
        <div className="header-container">
          <div className="vendor-page-title">
            <h2 className="main-title">
              {`${category.replaceAll("-", " ")}  in ${
                locality === "all" ? city : locality
              }`}
            </h2>
            <div className="description">
              Showing <span className="count">{count} results</span> as per your
              search criteria
            </div>
            {/* <Pagedescription caption={caption}/> */}
          </div>
        </div>
        <div className="search-bar">
          <VendorSearchBar category={category} />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  @media (max-width: 300px) {
    .search-bar {
      display: none;
    }
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 150rem;
    margin: auto;
    ${"" /* position: absolute; */}
    ${"" /* left: 0; */}
    .vendor-page-title {
      margin: 0 20px;
      ${"" /* text-align:center; */}
      ${"" /* display: flex; */}
      ${"" /* flex-direction: column; */}
      .main-title {
        font-family: "Montserrat";
        font-size: 2.8rem;
        ${"" /* text-align: center; */}
        text-transform: capitalize;
      }

      .description {
        color: var(--para);
        font-size: 1.7rem;
        font-family: "Poppins";
        margin-top: 1rem;
        .count {
          font-weight: 500;
          color: black;
        }
      }
    }
  }
`;
