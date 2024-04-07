import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Spinner1 } from "@/styles/components/spinner";
import getLocalities from "@/lib/request/getlocalities/getLocalities";


export default function BusinessDetails({ vendorContent, setVendorContent }) {
  
    const cookies = parseCookies();
    const {token} = JSON.parse(cookies["@VendorApp"] || "")

    const { vendorCategories, cities } = useGlobalContext();
    const [isLoading,setIsLoading] = useState(false)
    const [localities,setLocalities] = useState([]);
    const [formData,setFormData] = useState(vendorContent || {})
    

    //When city change this will call the api for that particular city to get the localities.
    useEffect(()=>{
        async function fetchLocaties(){
            
            let response = await getLocalities(formData.city);
            
            if(response.success === true){
                setLocalities(response.data)
            }
            else{

            }
        }

        fetchLocaties();
    },[formData.city])

    const handleFormInput = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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
                body: JSON.stringify( formData)
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
                        <input type="text" id="brand_name" name="business_name" value={formData.business_name} onChange={handleFormInput} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="business_category">Business Category </label>
 
                        <div className="dropdown cities-dropdown" >

                            <select id="business_category" name="business_category" onChange={handleFormInput}>
                                <option value="null">Select category</option>
                                {
                                    vendorCategories?.map((cat) => {
                                        return (<option value={cat.id} key={cat.id} selected={formData.business_category === cat.id ? true : false} > {cat.name} </option>)
                                    })
                                }

                            </select>
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

                                <select id="locality" name={"location"}  onChange={handleFormInput}>
                                    <option value={null} >Select locality</option>
                                    {
                                        localities.map((locality) => {
                                            return (
                                            <option value={locality.slug} key={locality.id} selected={formData.location === locality.slug?true : false} >{locality.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                    <div className="form-item">
                        <label htmlFor="address">Address  </label>
                        <input type="text" id="address" name="address" value={formData?.address} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="event_completed">Events Completed  </label>
                        <input type="number" id="event_completed" name="event_completed" value={formData.event_completed} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="yrs_exp">Years Of Experience  </label>
                        <input type="number" id="yrs_exp" name="yrs_exp" value={formData.yrs_exp} onChange={handleFormInput} />
                    </div>
                   
                    <div className="form-btn">
                        <button className="btn" onClick={handleUpdate}>{isLoading ? <Spinner1/> : "Update"}</button>
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
    /* max-width: 70rem; */
    margin: auto;
}

.form-item{
    background-color: #FFF5F5;
    display: flex;
    /* padding: 1rem; */
    border-left: 5px solid var(--primary-color);
    border-bottom:1px solid var(--primary-color);

    input,select,textarea{
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

.form-item{
    flex-direction: column;
}
.form-container{
    gap: 1.5rem;

}
}
`