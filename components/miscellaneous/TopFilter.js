import styled from 'styled-components'
import { AiFillCaretDown } from 'react-icons/ai'
import { BiSearch, BiRupee } from 'react-icons/bi'
import { BiCategoryAlt } from 'react-icons/bi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { BsPeople } from 'react-icons/bs'
import { useGlobalContext } from '@/context/MyContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export default function TopFilter({ locality, city, category, venueCategories, filterQuery, localities }) {

    const guestList = [
        {
            name: "Less than 100",
            slug: "0,100"
        },
        {
            name: "100-200",
            slug: "100,200"
        },
        {
            name: "200-300",
            slug: "200,300"
        },
        {
            name: "300-400",
            slug: "300,400"
        },
        {
            name: "400-500",
            slug: "400,500"
        },
        {
            name: "More than 500",
            slug: "500,5000"
        },
    ]
    // console.log("top filter render")

    // console.log(filterQuery)
    const { cities } = useGlobalContext();
    const router = useRouter();

    // const [localities,setLocalities] = useState(localities || [])
    // const [filterCity,setFilterCity] = useState(city || "")

    const [filterLocality, setFilterLocality] = useState(locality);
    const [filterCategory, setFilterCategory] = useState(category);
    const [filterGuest, setFilterGuest] = useState(filterQuery.guest || "");
    const [filterBudget, setFilterBudget] = useState(filterQuery.per_budget || "");


    async function handleApplyFilter() {
        // console.log({filterCity,filterCategory,filterLocality,filterGuest,filterBudget})
        router.push(`/${filterCategory}/${city}/${filterLocality}?guest=${filterGuest || ""}&per_budget=${filterBudget}&per_plate=${filterQuery.per_plate}&multi_localities=`)
    }

    function handleCityChange(e) {

        //when city city, setting the locality to "all"
        setFilterLocality("all")


        router.push(`/banquet-halls/${e.target.value}/all`)
    }

    return (

        <Div>
            <Wrapper className='container'>
                <div className="city-wrapper filter-item ">
                    <div className="dropdown city-dropdown">
                        <BiSearch className='icon' />

                        <label>
                            <select name='cities' onChange={(e) => { handleCityChange(e) }} value={city}>
                                <option value={null} disabled >City</option>
                                {
                                    cities?.map((cityItem) => {
                                        return (<option value={cityItem.slug} key={cityItem.id} > {cityItem.name}</option>)
                                    })
                                }
                            </select>
                        </label>
                        <AiFillCaretDown className="down-arrow" size={15} />
                    </div>
                </div>

                <div className="location-wrapper filter-item">
                    <div className="dropdown locality-dropdown">
                        <MdOutlineLocationOn className='icon' />

                        <select name='locality' onChange={(e) => setFilterLocality(e.target.value)} value={filterLocality}>
                            <option value="all" >Locality</option>
                            {
                                localities.map((loc) => {
                                    return (<option value={loc.slug} key={loc.id} >{loc.name}</option>)
                                })
                            }

                        </select>

                        <AiFillCaretDown className="down-arrow" size={15} />
                    </div>
                </div>
                <div className="category-wrapper filter-item">
                    <div className="dropdown category-dropdown">
                        <BiCategoryAlt className='icon' />


                        <select name='category' onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
                            <option value={null} >Category</option>
                            {
                                venueCategories.map((cat) => {
                                    return (<option value={cat.slug} key={cat.id}>{cat.name}</option>)
                                })
                            }

                        </select>

                        <AiFillCaretDown className="down-arrow" size={15} />
                    </div>
                </div>
                <div className="guest-wrapper filter-item">

                    <div className="dropdown guest-dropdown">
                        <BsPeople className="icon" />

                        <select name='guest' onChange={(e) => setFilterGuest(e.target.value)} value={filterGuest}>
                            <option value="">Guest</option>
                            {
                                guestList?.map((item, i) => {
                                    return (
                                        <option value={item.slug} key={i}>{item.name}</option>
                                    )
                                })
                            }
                        </select>

                        <AiFillCaretDown className="down-arrow" size={15} />

                    </div>

                </div>
                <div className="budget-wrapper filter-item">
                    <div className="dropdown guest-dropdown">
                        <BiRupee className='icon' />

                        <select name='budget' onChange={(e) => setFilterBudget(e.target.value)}>
                            <option value={""}>Budget</option>
                            <option value="0,100000">Less than 1 Lakh</option>
                            <option value="100000,200000">1-2 Lakh</option>
                            <option value="200000,300000">2-3 Lakh</option>
                            <option value="300000,400000">3-4 Lakh</option>
                            <option value="400000,500000">4-5 Lakh</option>
                            <option value="500000,600000">5-6 Lakh</option>
                            <option value="600000,700000">6-7 Lakh</option>
                            <option value="600000,700000">More than 7 lakh</option>
                        </select>

                        <AiFillCaretDown className="down-arrow" size={15} />

                    </div>

                </div>
                <div className="btn-wrapper  filter-item">
                    <button className='search-btn' onClick={handleApplyFilter}>Search</button>
                </div>

            </Wrapper>

        </Div>
    )
}

const Div = styled.div`
    // position: sticky;
    // top: 0;
    // z-index: 9999999;

background-color: #0d0d0d;
/* border: 1px solid red; */
/* position: sticky;
top: 53px; */
/* z-index: 2; */

`

const Wrapper = styled.div`

    /* position: absolute; */
    /* top: 72%; right: 50%; */
    /* transform: translate(50%,-50%); */
  
    background-color: none;
    /* background: transparent; */
    display: grid;
    grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
    gap: 1rem;
    /* min-width: 75%; */

    .filter-item{
        /* border: 1px solid green ; */
        /* position: relative; */
        background-color: white;
        border-radius: .5rem;
        overflow: hidden;
        z-index: 0;
        
        .dropdown{
            /* border: 4px solid var(--secoundary-color); */
            padding-right: 20px;
            overflow:hidden;
            position: relative;
            height: 4.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            background:none;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
        }
        

        select,input {

            font-family: "Poppins";
            cursor: pointer;
            font-size: 1.8rem;
            width: 100%;
            height: 100%;
            background-color: transparent;
            outline: none;
            border: none;
            color: var(--para);
            padding-left: 4rem;
            -moz-appearance:none; /* Firefox */
            -webkit-appearance:none; /* Safari and Chrome */
            appearance:none;

            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
            z-index: 2;
            position: absolute;
            width: 100%;
            top: 0;
            /* border: 2px solid red; */
            
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
        
            /* background-color: red; */
            /* color: var(--secoundary-color); */
            z-index: 0;
            color: var(--para);
        }

        .search-btn{
            width: 100%;
            height: 100%;
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



@media (max-width:1000px) {

    grid-template-columns: repeat(6,afr);
    display: none;

    .city-wrapper {
        display: none;
    }
    .category-wrapper{
        grid-column: 4/-1;
    }
    .location-wrapper {
        grid-column: 1/4;
    }
    .guest-wrapper{
        grid-column: 1/3;
        
    }
    .budget-wrapper{
        
        grid-column: 3/5;
    }
    .btn-wrapper{
        grid-column: 5/-1;

    }
}

@media (max-width:600px) {
    /* top: 65%; right: 50%; */
    /* transform: translate(50%,-50%); */
    /* min-width: 90%; */

    .down-arrow{
        right: 5px;

    }
}

`