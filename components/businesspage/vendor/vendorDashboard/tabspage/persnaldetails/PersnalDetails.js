import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import { useState } from "react";
import { parseCookies } from "nookies";
import { Spinner1 } from "@/styles/components/spinner";
import Image from "next/image";
import { useRef } from "react";



export default function PersnalDetails({ vendorUser, setVendorUser }) {

    const cookies = parseCookies()
    const { token } = JSON.parse(cookies["@VendorApp"] || "")


    const [isLoading, setIsLoading] = useState(false)
    const inputFile = useRef();

    const { name, phone, email, address, city, about } = vendorUser;

    const [formData, setFormData] = useState(
        {
            name,
            phone,
            email,
            address,
            city,
            about,
        }
    )


    const handleProfile = (e)=>{
        null
    }


    const { cities } = useGlobalContext();
    const handleFormInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    // console.log(formData)
    const handleUpdate = async () => {
        try {
            setIsLoading(true);

            // This API Will update the user Details 
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/update_user`;

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "bearer": token,
                },
                body: JSON.stringify(formData)
            })
            // console.log(response)

            response = await response.json();
            if (response.success) {

                console.log(response)
                alert("Successfully ")
                setVendorUser(response.data);
            } else {
                alert("something went wroung")
            }


        } catch (error) {
            console.log(error);

        }
        finally {

            setIsLoading(false)
        }
    }
    return (
        <Wrapper>
            <div className="container">
                <Heading text={"Update Personal Details"} />

                <div className="form-container">
                    <div>
                        <div className="round-profile-container">
                            
                            <Image
                                src={'/icons/user2.png'}
                                fill={true}
                                sizes="(100vw)"
                                alt="banner-image"
                                className="img"
                            />

                            <div className="upload-container" onClick={e=>inputFile.current.click()}>
                                <div className="upload-icon-container">
                                    <Image
                                        src={'/icons/camera.png'}
                                        fill={true}
                                        sizes="(100vw)"
                                        alt="banner-image"
                                    />
                                </div>
                                <input type="file" multiple name='photo' id="photo" ref={inputFile} />
                            </div>
                        </div>
                    </div>

                    <div className="form-item">
                        <label htmlFor="name">Full Name </label>
                        <input type="text" id="name" name="name" value={formData?.name} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="phone">Phone </label>
                        <input type="number" id="phone" name="phone" value={formData?.phone} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="email">Email </label>
                        <input type="email" id="email" name="email" value={formData?.email} onChange={handleFormInput} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="city">City </label>
                        <div className="dropdown cities-dropdown" >

                            <select id="city" name={"city"} onChange={handleFormInput}>
                                {
                                    cities.map((locality) => {
                                        return (
                                            <option value={locality.slug} key={locality.id} selected={formData.city === locality.slug ? true : false} >{locality.name}</option>
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
                        <label htmlFor="about">About  </label>
                        <textarea id="about" name="about" value={formData?.about} onChange={handleFormInput}></textarea>
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

.round-profile-container{
    /* border: 1px solid red; */
    margin: auto;
    position: relative;
    background-color: white;
    height: 150px;
    width: 150px;

    .img{
        /* border: 1px solid red; */
        border-radius: 50%;
        overflow: hidden;
    }

    .upload-container{
        position: absolute;
        right: 5px;
        bottom: 5px;
        cursor: pointer;

        input{
            display: none;
        }
    }

    .upload-icon-container{
        position: relative;
        width: 40px;
        height: 40px;
    }
}
.form-btn{
    text-align: center;

    .btn{
        cursor: pointer;
        background-color: var(--primary-color);
        color: white;
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        width:200px;
        border-radius: 5px;
        padding: .5rem 5rem;
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