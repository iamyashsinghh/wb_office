import styled from "styled-components";
import { useRouter } from "next/router";
import { memo, useState } from "react";


import CylenderFilter from "@/components/miscellaneous/filter/CylenderFilter";
import { RedioFilter } from "@/components/miscellaneous/filter/RedioFilter";
import { CheckFilter } from "@/components/miscellaneous/filter/CheckFilter";
import BudgetRangeSlider from "@/components/miscellaneous/filter/BudgetSlider";


function Filter({filterQuery,localities,venueCategories,city,category,locality}) {
    // console.log(localities)

    // console.log("From filter")

    const router = useRouter();

    const facilitiesItem = [
        {
            "id": 0,
            "name": "Food Provided By Venue",
            "slug": "food-provided-by-venue"
        },
        {
            "id": 1,
            "name": "Outside Food Allowed",
            "slug": "outside-food-allowed"
        },
        {
            "id": 2,
            "name": "Alcohol Allowed",
            "slug": "alcohol-allowed"
        },
        {
            "id": 3,
            "name": "Outside Alcohol Allowed",
            "slug": "outside-alcohol-allowed"
        },
        {
            "id": 4,
            "name": "Music Allowed Late",
            "slug": "music-allowed-late"
        }
    ]
    const meallist = [
        {
            name: "Vegetarian Only",
            id: 1,
            slug: "veg"
        },
        {
            name: "Non-Vegetarian Only",
            id: 2,
            slug: "non-veg"
        }
    ]
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

    const [selectedLocalities, setSelectedLocalities] = useState(filterQuery.multi_localities?.split(",") || []);
    const [selectedCategories, serSelectedCategories] = useState([category]);
    const [facilities, setFacilities] = useState([]);
    const [guest, setGuest] = useState(filterQuery.guest || "")
    const [perBudget, setPerBudget] = useState([100000, 1000000])
    const [perPlate, setPerPlate] = useState([100, 5000])
    const [selectedFoodPreferance, setSelectedFoodPreferance] = useState([""])

 

    function handleApplyFilter() {
        const localitiesFilterArray = selectedLocalities.join(",")
        router.push(`/${selectedCategories[0] || "banquet-halls"}/${city}/${localities.length >= 1 ? "all" : locality}?guest=${guest || ""}&per_budget=${perBudget.join(",")}&per_plate=${perPlate.toString()}&multi_localities=${localitiesFilterArray}&food_type=${selectedFoodPreferance[0]}`)

    }

    return (<Wrapper>
        <div className="filters">

            <CheckFilter items={localities} name={"Localities"} list={selectedLocalities} setList={setSelectedLocalities} handleApplyFilter={handleApplyFilter} />

            <BudgetRangeSlider perBudget={perBudget} setPerBudget={setPerBudget} perPlate={perPlate} setPerPlate={setPerPlate}  handleApplyFilter={handleApplyFilter} />

            <CylenderFilter name={"Guest"} items={guestList} value={guest} setValue={setGuest} handleApplyFilter={handleApplyFilter} />

            <RedioFilter items={venueCategories} name={"Categories"} list={selectedCategories} setList={serSelectedCategories} handleApplyFilter={handleApplyFilter} />

            <CheckFilter items={facilitiesItem} name={"Facilities"} list={facilities} setList={setFacilities} handleApplyFilter={handleApplyFilter}/>

            <RedioFilter name={"Food Preferance"} items={meallist} list={selectedFoodPreferance} setList={setSelectedFoodPreferance} handleApplyFilter={handleApplyFilter} />

        </div>
    </Wrapper>)
}

export default memo(Filter);


const Wrapper = styled.div`

height: 100%;
overflow-y: scroll;
background-color: white;
/* border: 1px solid red; */


    &::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0px 0 5px rgba(0,0,0,0.2);
        border-radius: 25px;
        background-color: #EDEDED;
        border: 2px solid f2f2f2;
        
    }

    &::-webkit-scrollbar
    {
        width: 10px;
        background-color:#EDEDED;
        
    }

    &::-webkit-scrollbar-thumb
    {
        
        border-radius: 25px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #CCCCCC;

    }


    .filters{

        /* border: 1px solid black; */
        display: grid;
        /* flex-direction: column; */
        gap: 2.5rem;
        width: 100%;
        /* max-height: 80vh; */
        /* overflow-y: scroll; */
        overflow-x: hidden;



    }

`