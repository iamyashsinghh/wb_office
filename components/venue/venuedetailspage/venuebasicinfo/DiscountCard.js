import styled from "styled-components"
import Image from "next/image"
import { BsPeople } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'


export default function DiscountCard({openLeadsModel}) {

    const today = new Date().toISOString().split('T')[0];


    return (<Wrapper>
        <div className="card-header">
            <Image
                src="/common/pricetag.png"
                alt="An example image"
                width={60}
                height={60}
            />
            <div className="header-content">
                <h2 className="header-title">See Discounted Price</h2>
                <div className="header-para">Select event date and number of total guests to see prices</div>
            </div>
        </div>
        <div className="card-body">
            <div className="event-date-wrapper filter-item">
                <div className="dropdown date-wrapper">
                    <input type="date" required id="event-date" min={today} onClick={e=>e.target.showPicker()}/>
                    <label htmlFor="event-date" className="label">Event Date</label>
                    {/* <SlCalender className='icon' /> */}
                    {/* <input type="text"  name="date" min={today} placeholder=' Event Date' onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} /> */}
                </div>
            </div>
            <div className="guest-wrapper filter-item">

                <div className="dropdown guest-dropdown">
                    <BsPeople className="icon" />
                    <select>
                        <option value="0">Guest</option>
                        <option value="1">Less than 100</option>
                        <option value="2">100-200</option>
                        <option value="3">200-300</option>
                        <option value="4">300-400 </option>
                        <option value="5">400-500</option>
                        <option value="6">More than 500</option>
                    </select>
                    <AiFillCaretDown className="down-arrow" size={15} />
                </div>

            </div>
            <div className="btn-wrapper  filter-item">
                <button className='search-btn' onClick={()=>{openLeadsModel()}}>See Price</button>
            </div>
        </div>

    </Wrapper>)
}

const Wrapper = styled.div`
/* height: 25rem; */
background: #FFFFFF;
box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
border-radius: 10px;
padding: 5rem 3rem;
display: flex;
flex-direction: column;
gap: 2rem;

.card-header{
    display: flex;
    gap: 2rem;

    .header-content{
        display: flex;
        flex-direction: column;
        gap: .5rem;

        .header-title{
            font-size: 2.5rem;
            color: var(--primary-color);
            font-family: "Montserrat";
            font-weight: 700;
        }
        .header-para{
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
            color: var(--para);

        }
    }
}
.card-body{
    display: grid;
    grid-template-columns:1fr 1fr 1fr;
    gap: 1rem;


}


.filter-item{

background-color: white;
/* border: 1px solid var(--secoundary-color); */
border: 1px solid black;
border-radius: .5rem;
/* overflow: hidden; */

.dropdown{
    /* border: 1px solid var(--secoundary-color); */
    position: relative;
    height: 4.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    /* background:none; */
    background-color: transparent;

    .label{
        transition: all .2s linear;
        /* border: 1px solid red; */
        position: absolute;
        padding: 0 1rem;
        font-size:1.7rem ;
        color: var(--para);
        font-family: "Poppins";
        /* pointer-events: none; */
        /* cursor: pointer; */
        left: 0;
        background-color: white;
    }

    input[type=date]{
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size:1.7rem ;
        color: var(--para);
        font-family: "Poppins";
        color: var(--para);
        padding: 1rem;
        background-color: transparent;

        &:focus ~ .label,     
        &:valid ~ .label{
            transform: translateX(10px) translateY(-20px);
            z-index: 2;
            font-size:1.4rem ;

        }    
    }

    input[type=date]:required:invalid::-webkit-datetime-edit {
        color: transparent;
    }

    input[type=date]:focus::-webkit-datetime-edit {
        color: black !important;
    }


}





select {
    font-family: "Poppins";
    cursor: pointer;
    border: 111px solid black;
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: transparent;
    outline: none;
    border: none;
    color: var(--para);
    /* padding: 0rem 2rem; */
    padding-left: 4rem;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
}
.icon{
    position: absolute;
    left: 10px;
    font-size: 2.5rem;
    /* color: var(--secoundary-color); */
    color: var(--para);
}
.down-arrow{
    position: absolute;
    right: 10px;
    font-size: 2.5rem;
    /* color: var(--secoundary-color); */
    color: var(--para);
}

.search-btn{
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

    &:hover{

    }

}

}


@media (max-width:600px) {

    .card-body{
        grid-template-columns:repeat(6,1fr);
    }
    .event-date-wrapper{
        grid-column: 1/4;
    }
    .guest-wrapper{
        grid-column: 4/-1;
    }
    .btn-wrapper{
        grid-column: 1/-1;

    }


    
}
    
`