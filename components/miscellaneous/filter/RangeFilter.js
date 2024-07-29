import ReactSlider from "react-slider";
import styled, { css } from "styled-components";
import { useState } from "react";

export default function RangeFilter({
  title = "Budget",
  rangeConfig = [
    {
      label: "Per plate",
      defaultValue: [100, 5000],
      min: 100,
      max: 5000,
      minDistance: 100,
    },
    {
      label: "Per day",
      defaultValue: [100000, 1000000],
      min: 100000,
      max: 1000000,
      minDistance: 100000,
    },
  ],
  handleApplyFilter,
}) {
  const [toggleTab, setToggleTab] = useState(0);
  const [values, setValues] = useState(
    rangeConfig.map((config) => config.defaultValue)
  );

  const handleClear = () => {
    setValues(rangeConfig.map((config) => config.defaultValue));
  };

  const updateValue = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <Wrapper show={toggleTab}>
      <div className="header-title">
        <h4>{title}</h4>
        <span className="clear-btn" onClick={handleClear}>
          Clear
        </span>
      </div>
      <div className="tabs">
        {rangeConfig.map((config, index) => (
          <span
            key={index}
            className={`tabs-btn ${toggleTab === index && "selected"}`}
            onClick={() => setToggleTab(index)}
          >
            {config.label}
          </span>
        ))}
      </div>
      <div key={toggleTab}>
        <StyledSlider
          defaultValue={values[toggleTab]}
          minDistance={rangeConfig[toggleTab].minDistance}
          min={rangeConfig[toggleTab].min}
          max={rangeConfig[toggleTab].max}
          onChange={(value) => updateValue(toggleTab, value)}
          renderTrack={Track}
          renderThumb={Thumb}
        />
        <div className="range-label">
          <span className="from">{values[toggleTab][0]}</span>
          <span className="to"> {values[toggleTab][1]}+</span>
        </div>
      </div>
      <button className="set-btn" onClick={() => handleApplyFilter(values)}>
        Set {title}
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .header-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      font-size: 2rem !important;
        font-weight: 500;
    }
  }
  .clear-btn {
    color: var(--primary-color);
    font-size: 1.4rem;
    margin-right: 10px;
    font-family: "Poppins";
    cursor: pointer;
    font-weight: 500;
  }
  .range-label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0rem 2rem;
    span {
      color: var(--para);
      font-size: 1.5rem;
      font-family: "Poppins";
      font-weight: 500;
    }
  }
  .tabs {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    .tabs-btn {
      cursor: pointer;
      border: 1px solid gray;
      padding: 3px 8px;
      border-radius: 5rem;
      font-size: 1.4rem;
      font-family: "Poppins";
      font-weight: 500;
    }
    .selected {
      color: white;
      background-color: var(--primary-color);
    }
  }
  .set-btn {
    display: block;
    background-color: var(--primary-color);
    border: none;
    color: white;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 1.6rem;
    font-family: "Poppins";
    padding: 0.5rem 1rem;
    margin: 1rem auto;
  }
  @media (max-width: 700px) {
    .tabs {
      gap: 2rem;
      .tabs-btn {
        padding: 0.5rem 1rem;
        font-size: 1.8rem;
      }
    }
  }
`;

const StyledSlider = styled(ReactSlider)`
  width: 95%;
  height: 2px;
  margin: 20px 0 10px 0;
`;

const StyledThumb = styled.div`
  height: 15px;
  width: 15px;
  line-height: 25px;
  text-align: center;
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  color: #fff;
  top: -8px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2
      ? "#ddd"
      : props.index === 1
      ? "var(--primary-color)"
      : "#ddd"};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;