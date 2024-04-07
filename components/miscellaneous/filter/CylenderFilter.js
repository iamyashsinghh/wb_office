import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function CylenderFilter({ name, items, value, setValue, handleApplyFilter }) {

    const intialRender = useRef(true)

    useEffect(() => {
        if (intialRender.current) {

            intialRender.current = false;
            return;
        }
        handleApplyFilter();
    }, [value])

    function handleClear() {
        setValue("")

    }

    return (
        <Wrapper>

            <div className="header-title">

                <h2>{name}</h2>
                <span className="clear-btn" onClick={handleClear}>Clear</span>
            </div>

            <div className="filter-items">
                {
                    items?.map((item, i) => {
                        return (
                            <span className={`filter-item ${value === item.slug && "active"}`} key={i} onClick={(e) => { setValue(item.slug); }}>{item.name}</span>

                        )
                    })
                }

            </div>


        </Wrapper>
    )
}

const Wrapper = styled.div`


display: flex;
flex-direction: column;
gap: 1.5rem;
/* border: 1px solid red; */

.header-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2{
        font-size: 2rem !important  ;
    }
    /* padding: 1rem; */
}

.badge-count{
    font-size: 1.8rem;
    font-family: "Poppins";
    /* padding:1rem; */

}
.clear-btn{
    color:var(--primary-color);
    font-size: 1.4rem;
    margin-right: 10px;
    font-family: "Poppins";
    cursor: pointer;
    font-weight: 500;
}

.filter-items{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;


        .filter-item{
            border: 1px solid var(--primary-color);
            border-radius: 5rem;
            padding:5px 8px;
            cursor: pointer;
            font-size: 1.6rem;
            font-family: "Poppins";
            transition:.3s ease all ;

            &:hover{
                background-color:var(--primary-color);
                color:white;
            }

           
        }
        .active{
                background-color:var(--primary-color);
                color:white;
            }
    }

`