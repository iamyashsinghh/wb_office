import styled from "styled-components";
import { useRef, useState,useEffect } from "react";
import {BiSearch} from  'react-icons/bi'


/*
ARGUMENTS

name => Label name of check filter

items => This is the total items that should be list in the checkbox. 

list => This is the list of selected items. When the user select any iten we append into the list

setList => This is the setter basiclly use to set the value of list 

handleApplyFiter => This is the function which will be called after setting the filters. This function will be called after selecting the items.


*/ 
export function CheckFilter({ name, items, list, setList ,handleApplyFilter}) {

    // console.log(handleApplyFilter)
    const initialRender = useRef(true);

    const [show, setShow] = useState(false);
    const [searchTerm,setSearchTerm] = useState("");

    // console.log("This me check filter")
    
    const filteredCities = items?.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    

    //This useEffect will be called when the list change. List the the array of selected item. When the use selected the item that item will be append to the list state and then this useEffect will be triggered and handleApplyFunction will be called. We also skip initalRender to prevind unneccerry render, otherwise useEffect will run even first time even the user does't select any item. and handleApplyFunction will be called. To prevent this we skip the first render.
    useEffect(()=>{
        if(initialRender.current){
            // console.log("INSIDE IF BLOCK")
            initialRender.current = false;
            return;
        }
        
        // console.log("UseEffect run ")
        handleApplyFilter();

    },[list])
    

    // This Function is a handler function when the user select any filter item then we are setting that item to the list array use setList method.
    const handleCheckChange = (event) => {
        const { value, checked } = event.target;

        if (checked && !list.includes(value)) {
        // --------------------------------------------------------------
            //Finding the index of selected city
            const index = items.findIndex((city)=>{
                return String(city.id) === String(value)
            })
            
            // copy of seleccted city
            const selectedFilterCity = items[index];
            //deleted selected city from that position
            items.splice(index,1);
            //inseting on starting of array so that it appear on top
            items.unshift(selectedFilterCity)
        // --------------------------------------------------------------
      
            setList(prev => [...prev, value]);

        } else if (!checked && list.includes(value)) {
   
            setList(prev => prev.filter(loc => loc !== value));
        }

    };


    const handleClear = () => {
        setList([]); // This will empty the array
    };

    return (<Box show={show}>

        <div className="header-title">

            <h2>{name}   <span className="badge-count">
                {`(${items.length})`}
            </span></h2>
            <span className="clear-btn" onClick={handleClear}>Clear</span>


        </div>

        {/* Showing the searchbar only for localities, if we want search bar in all the checkfilter then remote this block */}
        {
           name == "Localities"  && (
                <div className="search-bar">
                    <BiSearch className="search-icon"/>
                    <input type="text" className="" name="search" placeholder="Search Locality"  value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
                </div>
            )
        }

        <div className="filter-lists">

            {
                filteredCities?.map((item, i) => {
                    if (i < 5) {
                        return (<div key={i}>
                            <div className="filter-item">
                                <label className="main">{item.name}
                                    <input type="checkbox" name="check-item" value={item.id} checked={list.includes(String(item.id))} onChange={(e) => handleCheckChange(e)} />
                                    <span className="geekmark"></span>
                                </label>
                                {/* <span className="badge-count">23</span> */}
                            </div>
                        </div>)
                    }
                    else {
                        return (<div className="hide" key={i}>
                            <div className="filter-item">
                                <label className="main">{item.name}
                                    <input type="checkbox"  name="check-item" value={item.id} checked={list.includes(String(item.id))} onChange={(e) => handleCheckChange(e)} />
                                    <span className="geekmark"></span>
                                </label>
                                {/* <span className="badge-count">23</span> */}
                            </div>
                        </div>)

                    }


                })

            }
            {
                items?.length > 5 && (
                    <div className="show-more">
                        <button className="show-more-btn" onClick={() => setShow(!show)}>{show ? "-Show Less" : "+Show More"}</button>
                    </div>
                )
            }

        </div>


    </Box>)
}



const Box = styled.div`

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
.search-bar{
    border: 1px solid  var(--primary-color);
    border-radius:5px;
    height: 45px;
    margin-right: 10px;
    display: flex;
    padding: 0rem 1rem;
    align-items: center;
    position: relative;
    .search-icon{
        font-size: 2.5rem;
    }
    input[type="text"] {
        width :97%;
        height:36px!important;;
        padding: .5em;
        border: none;
        outline: none;
        font-size: 1.7rem;
        font-family: "Poppins";

    }
    

}
.filter-lists{
    /* border: 2px solid red; */
    /* padding: 0rem 0rem 0rem 0rem; */
    display: flex;
    max-height: 270px;
    overflow-y: auto;
    flex-direction:column;
    gap: .5rem;

    &::-webkit-scrollbar {
        width: 0px;  /* Hide the scrollbar by setting its width to 0 */
    }
    .filter-item{
        display: flex;
        justify-content: space-between;
        padding-right: 1.5rem;
        /* border: 1px solid black; */
        /* align-items: center; */
        
    }
    .hide{
        display: ${(props) => props.show ? "block" : 'none'};
        
    }
}

.show-more-btn{
    border: none;
    outline: none;
    background:none;
    color: var(--info-color);
    cursor: pointer;
    font-size: 1.8rem;
}



//Checkbox Design
.main{
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 1.7rem;
    font-family: "Poppins";
    color: var(--para);
    

}
        
    /* Hide the default checkbox */
input[type=checkbox] {
    visibility: hidden;
}
        

.geekmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid var(--primary-color);
}
    

.main input:checked ~ .geekmark {
    background-color: white;
}
    
/* Checkmark to be shown in checkbox */
/* It is not be shown when not checked */
.geekmark:after {
    content: "";
    position: absolute;
    display: none;
}
        
/* Display checkmark when checked */
.main input:checked ~ .geekmark:after {
    display: block;
}
        

.main .geekmark:after {
    left: 6px;
    bottom: 3px;
    width: 2px;
    height: 10px;
    border: solid var(--primary-color);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
    

`