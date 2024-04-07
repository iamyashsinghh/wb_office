import styled from "styled-components";
import Image from "next/image";
import { FaUser } from 'react-icons/fa'
import { AiFillCaretDown, AiFillPhone, AiTwotoneMail, } from 'react-icons/ai'
import { FaLocationArrow } from 'react-icons/fa'
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import { Spinner1 } from "@/styles/components/spinner";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useFormik } from "formik";

import { vendor_signup_validation } from "@/lib/formvalidation/formValidation";



export default function SignUpPage() {

    const router = useRouter();
    const cookies = parseCookies()


    //If vendor is already login then redirect to the dashboard page.
    if (cookies["@VendorApp"]) {
        router.push('/business/dashboard')
    }


    const { cities, vendorCategories,venueCategories} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false)
    const [businessCategory,setBusinessCategory] = useState([]);


    const formik = useFormik({
        initialValues: {
            name: "",
            business_name: "",
            business_type:"",
            business_category: "",
            email: "",
            phone: "",
            city: "",
            address: ""
        },
        onSubmit: handleSignUp,
        validate: vendor_signup_validation,
    })



    const handleBusinessCategory = (e)=>{

        if(e.target.value === "1"){
            setBusinessCategory(venueCategories)
            formik.values.business_type = "1"
        }
        else if(e.target.value === "2"){
            setBusinessCategory(vendorCategories)
            formik.values.business_type = "2"


        }
    }


    async function handleSignUp(values) {
        try {
            setIsLoading(true);
            // console.log("All okay")
            const data = JSON.stringify(values);

            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/signup`

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"

                },
                body: data
            })

            response = await response.json();
            if (response.success === true) {
                formik.resetForm();
                alert('You have successfully registered! Our team will contact you soon')
            }
            else {
                
                alert(response.message)
            }
            setIsLoading(false)


        } catch (error) {
            setIsLoading(false)
            // console.log("error")

        }

    }

    //Error style
    const errorStyle = {
        borderColor: "red"
    }


    return (
        <Wrapper>
            {/* <Alert title={"Success"} desc={"Login Success"} col={"#198754"} /> */}
            <div className="container">
                <Link href={"/"}>

                    <div className="logo-container">
                        <Image
                            src={'/logo.png'}
                            fill={true}
                            sizes="(100vw)"
                        />

                    </div>

                </Link>

                <div className="form-container">
                    <div className="img-banner">
                        <Image
                            src={"/business/5.png"}
                            fill={true}
                            sizes="(100vw)"
                            alt="banner img"
                        />
                    </div>
                    <div className="form">
                        {/* <Image
                            src={"/common/signup-single-flip.png"}
                            fill={true}
                            sizes="()"
                        /> */}
                        <div className="form-items">

                            <div className="card">
                                <div className="card-header">
                                    <h2 className="head-title">Signup With Your Details</h2>

                                    <p className="label">Try WeddingBanquet.in for free and grow your business.</p>
                                    <p className="label-sm">Create your own storefront and be visible to thousands of couples.</p>
                                </div>

                                <div className="form-item" style={formik.errors.name && formik.touched.name ? errorStyle : {}}>
                                    <input type="text" placeholder="Name " name="name"  {...formik.getFieldProps('name')} />
                                    <FaUser className="placeholder-icon" />
                                </div>

                                <div className="form-item" style={formik.errors.business_name && formik.touched.business_name ? errorStyle : {}}>
                                    <input type="text" placeholder="Your Business name " name="business_name" {...formik.getFieldProps("business_name")} />
                                    <FaUser className="placeholder-icon" />
                                </div>

                                <div className="form-item"  style={formik.errors.business_type && formik.touched.business_type ? errorStyle : {}}>
                                    <div className="dropdown locality-dropdown">

                                        <select name="business_type" {...formik.getFieldProps("business_type")} onChange={(e)=>handleBusinessCategory(e)}>
                                            <option value=""  >Business Type</option>
                                            <option value="1"  >Venue</option>
                                            <option value="2"  >Vendor</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item" style={formik.errors.business_category && formik.touched.business_category ? errorStyle : {}}>
                                    <div className="dropdown locality-dropdown">

                                        <select name="business_category" {...formik.getFieldProps("business_category")}>
                                            <option value=""  >Business Category</option>
                                            {
                                                businessCategory?.map((cat) => {
                                                    return (<option value={cat.slug} key={cat.id}>{cat.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <AiFillCaretDown className="down-arrow" size={15} />
                                </div>

                                <div className="form-item" style={formik.errors.email && formik.touched.email ? errorStyle : {}}>
                                    <input type="email" placeholder="Email " name="email" {...formik.getFieldProps('email')} />
                                    <AiTwotoneMail className="placeholder-icon" />
                                </div>

                                <div className="form-item" style={formik.errors.phone && formik.touched.phone ? errorStyle : {}}>
                                    <input type="number" min={10} max={10} placeholder="Phone Number " name="phone" {...formik.getFieldProps('phone')} />
                                    <AiFillPhone className="placeholder-icon" />
                                </div>

                                <div className="form-item" style={formik.errors.city && formik.touched.city ? errorStyle : {}}>
                                    <div className="dropdown city-dropdown" >

                                        <select name="city" {...formik.getFieldProps('city')}>
                                            <option value="null" name="city" >Select city</option>
                                            {
                                                cities.map((locality) => {
                                                    return (<option value={locality.slug} key={locality.id}>{locality.name}</option>)
                                                })
                                            }

                                        </select>
                                    </div>
                                    <AiFillCaretDown className="down-arrow" size={15} />
                                </div>

                                <div className="form-item" style={formik.errors.address && formik.touched.address ? errorStyle : {}}>
                                    <input type="text" placeholder="Address " name="address" {...formik.getFieldProps('address')} />
                                    <FaLocationArrow className="placeholder-icon" />
                                </div>


                                <ButtonDark onClick={formik.handleSubmit} > {isLoading ? <Spinner1 /> : "Submit"}</ButtonDark>
                                <div className="already-have-account">
                                    <h2>Already have an account? </h2> <Link href={'/business'} className="btn">Log In</Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>



            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`

background-color: var(--bg-color);

.logo-container{
    width: 200px;
    height: 50px;
    position: relative;
    cursor: pointer;
    margin: 4rem auto;
    /* border: 1px solid red; */
}

.form-container{
    display: grid;
    grid-template-columns:2fr 3fr;
    max-width: 120rem;
    margin: auto;
    padding: 3rem 0rem 8rem 0rem;

}

.img-banner{
    position: relative;
    height: 800px;
    width: auto;
    
}

.form{
    position: relative;
    height: 800px;
    background-color: white;
    /* border: 1px solid red; */
    
    .form-items{
        padding: 2rem;
        display: flex;
        width: 100%;
        height: 100%;
        /* border: 2px solid red; */
        position: absolute;
        /* color: white; */
        /* z-index: 111; */

        .card{
            background-color: white;
            width: 100%;
            height: 100%;
            padding: 5rem 7rem;
            display: flex;
            flex-direction: column;
            gap: 2.7rem;

            .card-header{
                text-align: center;
                display: flex;
                padding-bottom: 2rem;
                flex-direction: column;
                gap: 2rem;

                .head-title{
                    color: black;
                    font-family: "Montserrat";
                    font-size: 2.5rem;
                    font-weight: 500;

                }
           

                .label{
                    color: var(--para);
                    color: var(--primary-color);
                    font-family: "Poppins";
                    font-size: 1.8rem;
                    font-weight: 500;

                }
                .label-sm{
                    color: var(--para);
                    font-size: 1.5rem;
                    font-family: "Poppins";
                    max-width: 40rem;
                    margin: auto;
                }
            }
           
            input,select,label{
                font-size: 1.8rem;
                font-family: "Poppins";
                border: none;
                color: var(--para);
                width: 95%;
                outline: none;
                padding: 1rem;
                font-weight: 500;
                background-color: transparent;
            }
            //Hide the arrow fron the number input
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }

            select{
                -moz-appearance:none;
                -webkit-appearance:none; 
                appearance:none; 
            }

            .placeholder-icon{
                color: var(--para);
                font-size: 2rem;
            }

            .form-item{
                border-bottom: 1px solid black;
                display: flex;
                align-items: center;
                /* justify-content: center; */

                .dropdown{
                    width: 100%;
                }
        
            }

    
            
        }
    }

    .already-have-account{
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--para);
        justify-content: center;

        .btn{
            color: var(--primary-color);
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
        }
    }
}


@media (max-width:800px) {
    .form-container{
        grid-template-columns: 1fr;
    }

    .img-banner{

        display: none;
    
    }

    .card{
            
            padding: 5rem 3rem !important;
            display: flex;
            flex-direction: column;
            gap: 3rem;

    }
}

@media (max-width:600px) {
 
    .form{
        height: 700px;
    }
    
}

`