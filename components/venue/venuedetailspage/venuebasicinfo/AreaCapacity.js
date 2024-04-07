import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useGlobalContext } from "@/context/MyContext";

export default function AreaCapacity({ venue, openAvailableCheck }) {
  const { isAvailableCheckShow, isAvailableCheckID } = useGlobalContext();
  const areaCapacityArray = JSON.parse(venue.area_capacity);
 

  return (
    <Wrapper>
      <div className="row">
      <h1 className="openavilable" style={{padding: '0 0 1rem 0'}}>We have have live availability for this venue now !</h1>
      <button className="openavilableCheckbtn"
        onClick={() => {
          openAvailableCheck();
        }}
      >
        Check Availability
      </button>
      </div>
      <div className="maincard">
        <table className="responsive-table" style={{boxShadow: '4px 4px 10px rgba(0,0,0,0.08)'}}>
          <thead className="responsive-table__head">
            <tr className="responsive-table__row">
              <th className="responsive-table__head__title responsive-table__head__title--name">
                Area
              </th>
              <th className="responsive-table__head__title responsive-table__head__title--capacity">
                Capacity
              </th>
              <th className="responsive-table__head__title responsive-table__head__title--types">
                Type
              </th>
              <th className="responsive-table__head__title responsive-table__head__title--availability">
                <div>
                  Availability{" "}
                  <div style={{ fontSize: "12px" }}>
                    Day&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Night
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="responsive-table__body">
            {areaCapacityArray.map((area, index) => (
              <tr className="responsive-table__row" key={index}>
                <td
                  className="responsive-table__body__text responsive-table__body__text--name"
                  data-title="Area"
                >
                  {area.name || "No Name"}
                </td>
                <td
                  className="responsive-table__body__text responsive-table__body__text--capacity"
                  data-title="Capacity"
                >
                  {area.seating !== null ? area.seating : "Not specified"}
                </td>
                <td
                  className="responsive-table__body__text responsive-table__body__text--types"
                  data-title="Type"
                >
                  {area.type}
                </td>
                <td
                  className="responsive-table__body__text responsive-table__body__text--availability"
                  data-title="Availability Day || Night"
                >
                  {isAvailableCheckShow && isAvailableCheckID == venue.id ? (
                    <div className="table-icon-check">
                      <IoMdCheckmarkCircle
                        style={{
                          color: "blue",
                          width: "25px",
                          height: "25px",
                          margin: "0 3rem 0 0",
                        }}
                      />
                      <IoMdCheckmarkCircle
                        style={{ color: "blue", width: "25px", height: "25px" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`

  * {
    font-size: 16px;
    font-family: "Poppins";
  }
  
  .openavilable{
    font-family: "Montserrat";
    font-size: 2.5rem !important;
    font-weight: 700;
    color: var(--primary-color);
    cursor: pointer;
  }
  .openavilableCheckbtn{
    width: 100%;
    height: 100%;
    height: 4.5rem;
    cursor: pointer;
    background-color: var(--secoundary-color);
    border: none;
    outline: none;
    border: 0px;
    font-size: 1.8rem;
    color: white;
  }
  .table-icon-check {
    display: flex;
    justify-content: space-around;
  }
  .responsive-table {

    background-color: #fff;
    border-collapse: collapse;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.02);
    width: 100%;
    margin: 2rem 0;
    overflow: hidden;
  }
  .responsive-table__row {
    display: grid;
    border-bottom: 1px dashed #00000050;
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    .row{
      display: grid;
      grid-template-columns: 7fr 5fr;
      align-items: center;
    }
    .responsive-table__row {
      grid-template-columns: 2fr 2fr 2fr 1fr;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .responsive-table__row {
      grid-template-columns: 1fr 2fr;
    }
  }
  .responsive-table__row th,
  .responsive-table__row td {
    padding: 1rem;
  }
  .responsive-table__head {
    background-color: #fff;
  }
  @media (max-width: 991px) {
    .responsive-table__head {
      display: none;
    }
  }
  .responsive-table__head__title {
    display: flex;
    align-items: center;
    font-weight: 500;
    text-transform: capitalize;
  }
  .responsive-table__body .responsive-table__row {
    padding: 2.5rem 1rem;
    transition: 0.1s linear;
    transition-property: color, background;
  }
  .responsive-table__body .responsive-table__row:last-child {
    border-bottom: none;
  }
  .responsive-table__body__text {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .responsive-table__body__text::before {
    margin-right: 1rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  @media (max-width: 991px) {
    .responsive-table__body__text::before {
      content: attr(data-title) " :";
    }
  }
  @media (max-width: 400px) {
    .responsive-table__body__text[data-title]::before {
      content: attr(data-title) " :";
    }
  }
  .responsive-table__body__text--name {
    font-weight: 600;
  }
  @media (min-width: 768px) {
    .responsive-table__body__text--name::before {
      display: none;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .responsive-table__body__text--name {
      grid-column: 1/2;
      flex-direction: column;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .responsive-table__body__text--capacity,
    .responsive-table__body__text--types,
    .responsive-table__body__text--availability {
      grid-column: 2/3;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .responsive-table__body__text--country {
      grid-column: 3/-1;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .responsive-table__body__text--name,
    .responsive-table__body__text--country {
      grid-row: 2;
    }
  }
`;
