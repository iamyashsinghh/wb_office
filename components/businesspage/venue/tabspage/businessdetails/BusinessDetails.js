
import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Spinner1 } from "@/styles/components/spinner";
import { GrFormClose } from "react-icons/gr"
import { AiOutlinePlus } from 'react-icons/ai'
import getLocalities from "@/lib/request/getlocalities/getLocalities";


//Importing the static data 
const budget = require("@/lib/staticdata/budget.json")


export default function BusinessDetails({ vendorContent, setVendorContent }) {

    const cookies = parseCookies();
    const { token } = JSON.parse(cookies["@VendorApp"] || "")

    const { venueCategories, cities } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false)
    const [localities, setLocalities] = useState([]);
    const [formData, setFormData] = useState(vendorContent || {})


    //State for storing area capacity
    const [businessCategory,setBusinessCategory] = useState(formData.business_category.split(",") || [])
    // console.log(businessCategory)


    const areaCapacity = {
        name: "",
        seating: "",
        floating: "",
        type: ""
    }
    // Exptracting the area capacity from the state and parsing into json. If area capacity is not in state data then we assign a template areaCApacity.
    const area_capacity = JSON.parse(formData.area_capacity) || [areaCapacity];
    const [inputAreaCapacity, setInputAreaCapacity] = useState(area_capacity);



    //When city change this will call the api for that particular city to get the localities.
    useEffect(() => {
        async function fetchLocaties() {

            let response = await getLocalities(formData.city)

            if (response.success === true) {
                setLocalities(response.data)
            }
            else {

            }
        }

        fetchLocaties();
    }, [formData.city])


    //This function will handle the form input field but area capacity form is not included
    const handleFormInput = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //Handle category checkboxes
    const handleBusinessCategory = (event)=>{
        const { value, checked } = event.target;


        if (checked && !businessCategory.includes(value)) {
        // --------------------------------------------------------------
          setBusinessCategory([...businessCategory,value])

        } else if (!checked && businessCategory.includes(value)) {
   
            setBusinessCategory(prev => prev.filter(id => id !== value));
        }

    }


    //This function will handle the area capacity form 
    const handleAreaInputChange = (event, index, key) => {

        const newValue = event.target.value;
        setInputAreaCapacity((prevInputAreaCapacity) => {
            const updatedArray = [...prevInputAreaCapacity];
            updatedArray[index][key] = newValue;
            return updatedArray;
        });
    };


    // Add the field in area capacity
    const handleAddAreaField = () => {

        setInputAreaCapacity(prevState => [...prevState, areaCapacity]);
    }

    //Remove the area capacity field when the user click on cross iocn
    const handleRemoveField = (index) => {

        let newInputAreaCapacity = inputAreaCapacity.filter((item, i) => {
            return i !== index
        });

        setInputAreaCapacity(newInputAreaCapacity)

    }

    //To update the data, on click of update btn this will function will be called
    const handleUpdate = async () => {

        try {
            setIsLoading(true)

            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/update_user_content`;


            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "bearer": token,
                },
                body: JSON.stringify({ ...formData, area_capacity: inputAreaCapacity ,business_category:businessCategory.toString()})
            })


            response = await response.json();

            // console.log(response);

            if (response.success) {
                // console.log(response)
                setVendorContent(response.data)
                alert("Successfully ")
            } else {
                alert("something went wroung")
            }


        } catch (error) {
            console.log(error);

        }
        setIsLoading(false);
    }


    return (
        <Wrapper>
            <div className="container">
                <Heading text={"Update Business Details"} />

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor="brand_name">Business Name </label>
                        <input className="input" type="text" id="brand_name" name="business_name" value={formData.business_name} onChange={handleFormInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="business_category">Business Category </label>
                        <div className="category-checkbox">

                            {
                                venueCategories?.map((cat, i) => {
                                    return (
                                        
                                        <div className="category-item" key={cat.id}>
                                            <input type="checkbox" id={cat.id} value={cat.id} checked={businessCategory.includes(String(cat.id))} onChange={(e) => handleBusinessCategory(e)} />
                                            <label htmlFor={cat.id} >{cat.name}</label>
                                        </div>
                                        
                                    )
                                })
                            }

                           

                        </div>
                       
                    </div>

                    <div className="form-item">
                        <label htmlFor="city">City </label>
                        <div className="dropdown cities-dropdown" >

                            <select id="city" name={"city"} onChange={handleFormInput}>
                                {
                                    cities.map((city) => {
                                        return (
                                            <option value={city.slug} key={city.id} selected={formData.city === city.slug ? true : false} >{city.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </div>

                    <div className="form-item">
                        <label htmlFor="locality">Locality </label>
                        <div className="dropdown locality-dropdown" >

                            <select id="locality" name={"location"} onChange={handleFormInput}>
                                <option value={null} >Select locality</option>
                                {
                                    localities.map((locality) => {
                                        return (
                                            <option value={locality.slug} key={locality.id} selected={formData.location === locality.slug ? true : false} >{locality.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-item">
                        <label htmlFor="address">Address </label>
                        <input type="text" className="input" id="address" name="address" value={formData?.address} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="min_capacity">Min capacity  </label>
                        <input type="number" className="input" id="min-capacity" name="min_capacity" value={formData?.min_capacity} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="max_capacity">Max capacity </label>
                        <input type="number" className="input" id="max_capacity" name="max_capacity" value={formData?.max_capacity} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="budget">Budget </label>
                        <div className="dropdown budget-dropdown" >

                            <select id="budget_id" name="budget_id" onChange={handleFormInput} >
                                <option value="" disabled>Select Budget</option>
                                {
                                    budget?.map((item) => {
                                        return <option key={item.id} value={item.id} selected={formData.budget_id === item.id ? true : false}>{item.name}</option>
                                    })
                                }

                            </select>
                        </div>
                    </div>

                    <div className="timing-container">
                        <div className="form-item">
                            <label htmlFor="start_time_morning">Morning Time Start </label>
                            <input type="time" className="input" id="start_time_morning" name="start_time_morning" value={formData?.start_time_morning} onChange={handleFormInput} />
                        </div>                    <div className="form-item">
                            <label htmlFor="end_time_morning">Morning Time End </label>
                            <input type="time" className="input" id="end_time_morning" name="end_time_morning" value={formData?.end_time_morning} onChange={handleFormInput} />
                        </div>                    <div className="form-item">
                            <label htmlFor="start_time_evening">Evening Time Start </label>
                            <input type="time" className="input" id="start_time_evening" name="start_time_evening" value={formData?.start_time_evening} onChange={handleFormInput} />
                        </div>                    <div className="form-item">
                            <label htmlFor="end_time_evening">Evening Time End </label>
                            <input type="time" className="input" id="end_time_evening" name="end_time_evening" value={formData?.end_time_evening} onChange={handleFormInput} />
                        </div>
                    </div>

                    <div className="area-capacity-container">
                        <div className="header">
                            <h2 className="label">Area Capacity</h2>
                            <AiOutlinePlus className={'plus-icon'} onClick={handleAddAreaField} />
                        </div>

                        {
                            inputAreaCapacity?.map((area, i) => {
                                return (
                                    <div className="area-capacity-form" key={i}>
                                        <div className="capacity-form-item">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" id="name" value={area.name} onChange={(e) => { handleAreaInputChange(e, i, "name") }} />
                                        </div>
                                        <div className="capacity-form-item">
                                            <label htmlFor="seating">Seating</label>
                                            <input type="number" id="seating" name="seating" value={area.seating} onChange={(e) => { handleAreaInputChange(e, i, "seating") }} />
                                        </div>
                                        <div className="capacity-form-item">
                                            <label htmlFor="floating">Floating</label>
                                            <input type="number" id="floating" name="floating" value={area.floating} onChange={(e) => { handleAreaInputChange(e, i, "floating") }} />
                                        </div>
                                        <div className="capacity-form-item">
                                            <label htmlFor="name">Area Type</label>
                                            <select id="city" name={"city"} value={area.type} onChange={(e) => { handleAreaInputChange(e, i, "type") }}>
                                                <option value="" disabled>Select type</option>
                                                <option value="indoor" >Indoor</option>
                                                <option value="outdoor" >Outdoor</option>

                                            </select>

                                        </div>

                                        <GrFormClose className="close-icon" onClick={() => handleRemoveField(i)} />
                                    </div>

                                )
                            })
                        }





                        {/* <div className="form-btn">
                            <span>
                                <AiOutlinePlus className={'plus-icon'} onClick={handleAddCapacityForm} />
                            </span>
                        </div> */}
                    </div>

                    <div className="form-btn">
                        <button className="btn" onClick={handleUpdate}>{isLoading ? <Spinner1 /> : "Update"}</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.section`

.form-container{
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem 0rem;
    margin: auto;
}
.category-checkbox{
    /* border: 1px solid red; */
    padding: 1.5rem;

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;


    .category-item{
        display: flex;
     

        label{
            background-color: transparent ;
        }
    }
}
.timing-container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;

}
.area-capacity-container{
    background-color: #FFF5F5;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-left: 5px solid var(--primary-color);
    border-bottom:1px solid var(--primary-color);

    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
        .label{
            font-family: "Poppins";
            font-weight: 500;
            color: var(--para);
            white-space: nowrap;
            font-size: 2rem;
        }

        .plus-icon{
            font-size: 3rem;
            cursor: pointer;

        }

    }


    .area-capacity-form{

        background-color: #FFEEEE;
        padding: 1rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .capacity-form-item{
            display: flex;
            gap: 5px;
            flex-direction: column;
            /* border: 1px solid red; */

            label{

                font-family: "Poppins";
                font-weight: 500;
                color: var(--para);
                font-size: 1.6rem;

            }

            input,select{
                
                font-family: "Poppins";
                font-weight: 500;
                padding:1px;
                /* min-width: 30rem; */
                font-size: 1.6rem;
                outline: none;
            }


        }

        .close-icon{
            font-size: 2rem;
            color: red;
        }
    }
}
.form-item{
    background-color: #FFF5F5;
    display: flex;
    /* padding: 1rem; */
    border-left: 5px solid var(--primary-color);
    border-bottom:1px solid var(--primary-color);

    .input,select,textarea{
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        color: var(--para);
        width: 100%;
        outline: none;
        padding: 1.5rem;
        font-weight: 500;
        background-color: transparent;
    }
    


    .dropdown{
        /* border: 1px solid red; */
        width: 100%;
    }
    label{
        display: inline-block;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
        white-space: nowrap;
        min-width:200px;
        /* width: 15%; */
        background-color: #FFEEEE;
        padding: 1.5rem;

        font-size: 2rem;
    }
}
.form-btn{
    text-align: center;

    .btn{
        background-color: var(--primary-color);
        color: white;
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        width:200px;
        border-radius: 5px;
        padding: .5rem 5rem;
        cursor: pointer;
    }

   
}

@media (max-width:600px) {

    .timing-container{
        grid-template-columns: repeat(1,1fr);
        gap: 1.5rem;
    }

    .form-item{
        flex-direction: column;
    }
    .form-container{
        gap: 1.5rem;

    }
}
`