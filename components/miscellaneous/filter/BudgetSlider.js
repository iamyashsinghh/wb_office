import ReactSlider from "react-slider";
import styled, { css } from "styled-components";
import { useState} from "react";
// import { useRef } from "react";

export default function BudgetRangeSlider({ perBudget, setPerBudget, perPlate, setPerPlate,handleApplyFilter }) {




    const [toggleTab, setToggleTab] = useState(true);



    function handleClear(){
        setPerBudget([100000,1000000])
        setPerPlate([100,5000])
    }
    const updatePerPlate = (value) => {
        // setPerDayValue(value)
        setPerPlate(value);
    }
    const updatePerDay = (value) => {
        // setPerDayValue(value)
        setPerBudget(value)
    }



    return (<Wrapper show={toggleTab}>
        <div className="header-title">

            <h2>Budget</h2>
            <span className="clear-btn" onClick={handleClear}>Clear</span>
        </div>
        <div className="tabs">
            <span className={`tabs-btn ${toggleTab && "selected"}`} onClick={() => setToggleTab(true)}>Per plate</span>
            <span className={`tabs-btn ${!toggleTab && "selected"}`} onClick={() => setToggleTab(false)}>Per day</span>
        </div>
        {
            toggleTab ? (
                <div key={0}>
                    <StyledSlider
                        defaultValue={perPlate}
                        minDistance={100}
                        min={100}
                        max={5000}
                        onChange={updatePerPlate}
                        renderTrack={Track}
                        renderThumb={Thumb}
                    />
                    <div className="range-label">
                        <span className="from">{perPlate[0]}</span>
                        <span className="to"> {perPlate[1]}</span>
                    </div>
                </div>

            ) : (
                <div key={1}>
                    <StyledSlider
                        defaultValue={perBudget}
                        minDistance={100000}
                        min={100000}
                        max={1000000}
                        onChange={updatePerDay}
                        renderTrack={Track}
                        renderThumb={Thumb}
                    />
                    <div className="range-label">
                        <span className="from">{perBudget[0]}</span>
                        <span className="to"> {perBudget[1]}</span>
                    </div>
                </div>
            )
        }
        <button className="set-btn" onClick={handleApplyFilter}>Set Budget</button>

    </Wrapper>)
}

const Wrapper = styled.div`

.header-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2{
        font-size: 2rem !important  ;
    }
    /* padding: 1rem; */
}
.clear-btn{
    color:var(--primary-color);
    font-size: 1.4rem;
    margin-right: 10px;
    font-family: "Poppins";
    cursor: pointer;
    font-weight: 500;
}

.range-label{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0rem 2rem;

    span{
        color: var(--para);
        font-size: 1.5rem;
        font-family: "Poppins";
        font-weight: 500;
    }

}
.tabs{
    margin-top: 1rem;
    
    display: flex;
    gap: 1rem;

    .tabs-btn{
        cursor: pointer;
        border: 1px solid gray;
        padding: 3px 8px ;
        border-radius: 5rem;
        font-size: 1.4rem;
        font-family: "Poppins";
        font-weight: 500;
        /* &:hover{
            color: white;
            background-color: var(--primary-color);
        } */
    }
    .selected{
        color: white;
        background-color:var(--primary-color)
    }

}

.set-btn{
        display: block;
        /* background-color: white; */
        background-color: var(--primary-color);
        border: none;
        /* border: 1px solid var(--primary-color); */
        color: black;
        color: white;
        border-radius: 3rem;
        border-radius:.5rem;
        cursor: pointer;
        /* border: none; */
        font-size: 1.6rem;
        font-family: "Poppins";
        padding: .5rem 1rem;
        padding: .3rem 1rem;
        margin: 1rem auto;
    }

//making tabs responsive
@media (max-width:700px) {
    .tabs{
    gap: 2rem;

    .tabs-btn{
     
        padding:  .5rem 1rem  ;
        font-size: 1.8rem;
      
    }

}
    
}
`


const StyledSlider = styled(ReactSlider)`
    width: 95%;
    height: 2px;
    margin:20px 0 10px 0;
    /* border: 1px solid black; */
    /* height: 15px !important; */
    /* display: inline-block; */
`;

const StyledThumb = styled.div`
    height: 15px;
    width: 15px;
    line-height: 25px;
    text-align: center;
    background-color: var(--primary-color);
    /* background-color: white; */
    border: 2px solid var(--primary-color);
    color: #fff;
    top: -8px;
    border-radius: 50%;
    font-size:1.8rem;
    /* padding: 5px; */
    cursor: grab;
`;

// const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
const Thumb = (props, state) => <StyledThumb {...props}>{ }</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? 'var(--primary-color)' : '#ddd')};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;