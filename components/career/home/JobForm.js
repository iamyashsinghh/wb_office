import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import Image from "next/image";
import { ButtonDark } from "@/styles/components/buttons";
import { AiFillCaretDown, AiFillCalendar, AiFillPhone } from 'react-icons/ai'
import { MdEmail } from "react-icons/md";
import { FaUser, FaCloudUploadAlt } from 'react-icons/fa'
import { Spinner1 } from "@/styles/components/spinner";
// import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";


export default function JobsForm() {

    const [isLoading, setIsLoading] = useState(false);


    const formik = useFormik({
        initialValues: {
            name: "",
            mobile: "",
            email: "",
            role: ""
        },
        validate: async (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "Name required";
            }
            if (!values.mobile && values.mobile.length !== 10) {
                errors.mobile = "invalid phone"
            }
            if (!values.email) {
                errors.email = "invalid email"
            }
            if (!values.role) {
                errors.role = "invalid role"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                setIsLoading(true)
                // const response = await leadGen(values);
                if (response.status === true) {
                    alert(response.msg)
                    formik.resetForm();
                }
                else {
                    alert(response.msg);
                }

            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false);
            }

        }
    })

    // console.log(formik)
    //Error style
    const errorStyle = {
        borderColor: "red"
    }


    return (

        <Wrapper className="section" id="job-form">
            <div className="container">
                <Heading text={"Apply for jobs"} />

                <div className="form-container">
                    <div className="form-left">
                        <Image src={'/career/career-form.png'} alt="icon" fill sizes="(100vw)" />
                        <div className="overlay">
                       
                        </div>
                        <div className="overlay-content">
                            <p>Submit your resume to <a href="mailto: hr@weddingbanquets.in" className='mail'>hr@weddingbanquets.in </a>
                                 or share it via WhatsApp at <a href="tel: 08595603363" className='phone'>+918595603363</a> to kickstart your application process. We look forward to hearing from you!</p>

                        </div>
                    </div>

                </div>
            </div>

        </Wrapper>
    )
}



const Wrapper = styled.section`
background-color: var(--bg-color);

.form-container{
    /* border: 1px solid red; */
    /* height: 500px; */
    max-width: 110rem;
    margin: auto;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr;
}

.form-left{

position: relative;
height: 500px;


.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .4;

}
.overlay-content{
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: .5rem;

    /* width: 100%;
    height: 100%; */
    /* z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center; */


    p{
        color: white;
        font-family: "Poppins";
        text-align: center;
        padding: 0rem 5rem;
        font-size: 1.8rem;
        max-width: 50rem;
        font-weight: 400;
    }

    .mail,.phone{
        color: white;
        /* font-weight: 500; */
        font-weight: bold;
        /* background-color: black;
        color: white;
        padding: 0 5px;
        border-radius: 10px; */
    }


    
}


}


.card{
            background-color: white;
            width: 100%;
            height: 100%;
            padding:  7rem;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            /* border:2px solid red; */

            .form-title{
            /* border: 1px solid black ; */
                font-size: 2.2rem;
                font-family: "Poppins";
                text-align: left;
                font-weight: 500;
                color: var(--primary-color);
            }

            .form-item{

                border-bottom: 1px solid black;
                background-color: white;
                /* border: 1px solid red; */
                position: relative;
                display: flex;
                align-items: center;
                /* justify-content: center; */

                .dropdown{
                    width: 100%;
                }
        
            }


            .label{
                transition: all .2s linear;
                /* border: 1px solid red; */
                position: absolute;
                padding: 0 1rem;
                font-size:1.7rem ;
                color: var(--para);
                font-family: "Poppins";
                pointer-events: none;
                /* cursor: pointer; */
                left: 0;
                background-color: white;

                
            }

            .file-label{
                transition: all .2s linear;
                /* border: 1px solid red; */
                position: absolute;
                padding: 0 1rem;
                font-size:1.7rem ;
                color: var(--para);
                font-family: "Poppins";
                pointer-events: none;
                /* cursor: pointer; */
                left: 0;
                transform: translateX(px) translateY(-25px);
                background-color: white;
            }

            input,select{
                font-size: 1.8rem;
                font-family: "Poppins";
                border: none;
                color: var(--para);
                width: 100%;
                outline: none;
                padding: 1rem 1rem 1rem 1rem;
                font-weight: 500;
                background-color: transparent;

                &:focus ~ .label, &:valid ~ .label{
                        transform: translateX(5px) translateY(-20px);
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

            select{
                -moz-appearance:none;
                -webkit-appearance:none; 
                appearance:none; 
            }

            .placeholder-icon{
                color: var(--para);
                font-size: 2rem;
            }


            .radio{
                display: flex;
                gap: 2rem;
                
                span{
                    display: flex;
                }
            }
            
        }



@media (max-width:700px) {

    .form-left{
        height: 400px;
    }

    .form-container{
        grid-template-columns: 1fr;
    }

    .card{
        padding: 7rem 4rem;
    }
}
`