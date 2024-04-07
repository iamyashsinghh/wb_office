import styled from 'styled-components'
import { AiFillCaretDown } from 'react-icons/ai'
import { BiSearch, BiRupee } from 'react-icons/bi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { SlCalender } from 'react-icons/sl'
import { BsPeople } from 'react-icons/bs'
function SearchBar2() {


    const today = new Date().toISOString().split('T')[0];
    return (

        <Wrapper >

            <div className="dropdown city-dropdown">
                <BiSearch className='icon' />
                <select>
                    <option value="0">City</option>
                    <option value="1">Bnaquets Halls</option>
                    <option value="2">Marriage Garden</option>
                    <option value="3">Farm Houses</option>
                    <option value="4">Party Halls</option>
                    <option value="5">4 Start and above Hotels</option>
                    <option value="6">Small Functions Halls</option>
                    <option value="7">Destination Weddings</option>
                    <option value="8">kalyana Mandapams</option>
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
            </div>
            {/* <RxDividerVertical size={30} /> */}

            <div className=" dropdown locality-dropdown">
                <MdOutlineLocationOn className='icon' />
                <select>
                    <option value="0">Locality</option>
                    <option value="1">East Delhi</option>
                    <option value="2">Nort Delhi</option>
                    <option value="3">South Delhi</option>
                    <option value="4">West Delhi </option>
                    <option value="5">Patel Nagar</option>
                    <option value="6">Rohini</option>
                    <option value="7">Panjabi Bagh</option>
                    <option value="8">Mayur Vihar</option>
                    <option value="9">Moti Nagar</option>
                    <option value="10">Green Park</option>
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
            </div>
            <div className=" dropdown date-dropdown">
                <SlCalender className='icon' />
       
                <input type="date" min={today} placeholder='Date' value={"dd-mm-yyyy"} name='date'/>
                {/* <AiFillCaretDown className="down-arrow" size={15} /> */}
            </div>
            <div className=" dropdown guest-dropdown">
                <BsPeople className="icon" />
                <select>
                    <option value="0">Guest</option>
                    <option value="1">East Delhi</option>
                    <option value="2">Nort Delhi</option>
                    <option value="3">South Delhi</option>
                    <option value="4">West Delhi </option>
                    <option value="5">Patel Nagar</option>
                    <option value="6">Rohini</option>
                    <option value="7">Panjabi Bagh</option>
                    <option value="8">Mayur Vihar</option>
                    <option value="9">Moti Nagar</option>
                    <option value="10">Green Park</option>
                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
            </div>
            <div className=" dropdown budget-dropdown">
                <BiRupee className='icon' />
                <select>
                    <option value="0">Budget</option>
                    <option value="1">Less than 1 Lakh</option>
                    <option value="1">1-2 Lakh</option>
                    <option value="2">2-3 Lakh</option>
                    <option value="2">3-4 Lakh</option>
                    <option value="2">4-5 Lakh</option>
                    <option value="2">5-6 Lakh</option>
                    <option value="2">6-7 Lakh</option>
                    <option value="2">7-8 Lakh</option>

                </select>
                <AiFillCaretDown className="down-arrow" size={15} />
            </div>
            <div className="search-btn">
                <BiSearch className='search-icon' />
            </div>
        </Wrapper>
    )
}

export default SearchBar2;



const Wrapper = styled.div`
    position: absolute;
    top: 72%; right: 50%;
    transform: translate(50%,-50%);
    z-index: 0;
    background: var(--secoundary-color);
    border: 1px solid silver ;
    display: flex;
    align-items: center;
    /* flex-wrap: wrap; */
    min-width: 70%;
    border-radius: 1rem;
    overflow: hidden;

select,input {
    font-family: "Poppins";
    font-size: 1.8rem;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    color: var(--para);
    padding: 0rem 4rem;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    /* border: 1px solid black; */
}

.dropdown{
    border-right: 1px solid silver;
    /* border-bottom: 1px solid silver; */
    position: relative;
    /* border: 1px solid red; */
    height: 5rem;
    width: 45%;

    .icon{
        background:none;
        font-size: 2rem;
        position: absolute;
        color: var(--para);
        top: 12px;
        left: 10px;
    }
}

.down-arrow{
    position: absolute;
    color: var(--para);
    top: 15px;
    right: 8px;
}

.search-btn{

    background: var(--secoundary-color);
    text-align: center;
    width: 10%;
    cursor: pointer;
    /* padding: 0rem 0rem; */
    
    .search-icon{
        color: white;
        font-size: 3rem;
    }
}



@media (max-width:1000px) {
    flex-wrap: wrap;
    top: 60%; right: 50%;


    .dropdown{
        width: 50%;
        .icon{
            left: 5px;
        }

    }

    .city-dropdown{
        display: none;
    }
    
    .search-btn{
        display: none;
    }
}

@media (max-width:800px) {
    min-width: 60rem;

    .down-arrow{
        position: absolute;
        color: var(--para);
        top: 15px;
        right: 5px;
    }
    
}
@media (max-width:600px) {
    top: 55%; right: 50%;
    transform: translate(50%,-50%);
    min-width: 90%;

    select {
        font-size: 1.8rem;
        padding: 1.5rem 3rem;

    }
    .down-arrow{
        top: 15px;

    }
    .search-icon{
        
        font-size: 3rem !important;
    }
    
}
`