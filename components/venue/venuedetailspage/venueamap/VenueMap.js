
import styled from "styled-components"
import Image from "next/image"
import { FaUser,FaPhone } from "react-icons/fa";

import { useState, useEffect } from "react";
import leadGen from "@/lib/request/leadgen/leadGen";
import { Spinner1 } from "@/styles/components/spinner";
import { useFormik } from 'formik';
import EncryprKey from "@/components/miscellaneous/EncryprKey";
import ReCAPTCHA from "react-google-recaptcha";

export default function VenueMap({ location_map }) {
    const [recaptcha, setrecaptcha] = useState(null);

    const today = new Date().toISOString().split('T')[0];
    const [csrfToken, setCsrfToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);


          
      const onRecaptchaChange = (value) => {
        setrecaptcha(value);
      };
      const fetchCsrfToken = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN_API}/get-csrf`);
          const data = await response.json();
          await setCsrfToken(data.csrfToken);
        } catch (error) {
        }
      };
      
    const formik = useFormik({
        initialValues:{
            name:"",
            phone:"",
            event_date:"",
            time:"",
        },
        onSubmit:(values)=>{
            handleSubmit(values)
            // console.log(values)
        },
        validate:(values)=>{
            const errors = {};
            
            if (!values.name) {
                errors.name = 'Required';
            } 

            if (!values.phone) {
                errors.phone = 'Required';
              } else if (values.phone.toString().length !== 10) {
                
                errors.phone = 'Number must be 10 digits';
              }

            if(!values.event_date){
                errors.event_date = "Required"
            }

            if(!values.time){
                errors.time = "Required"
            }

            return errors;
        }

    })

    useEffect(() => {
        fetchCsrfToken()
      }, []);
    async function handleSubmit (values) {
        // console.log(values)
        try {
            setIsLoading(true)
            const response = await leadGen({ mobile: values.phone, token: csrfToken, recaptcha: recaptcha })
            if (response.status) {
                formik.resetForm();
                setrecaptcha(null);
                alert(response.msg)
            }
            else {
                alert(response.msg)
            }
        } catch (error) {
            console.log(error)

        }
        finally {
            setIsLoading(false)

          
        }
    }

  const errorStyle = {
    
    borderColor: "red"
    
  }



    return (<Section>
        <div className="container">
            <div
                dangerouslySetInnerHTML={{ __html: location_map }}
            />

        

            <div className="schedule-card">
                {/* <Image
                    src={"/common/schedule.png"}
                    fill
                    sizes="(100vw)"
                    alt="bg-image"
                /> */}
                <div className="contant">

                    <h2 className="title">Schedule your visit here</h2>

                    <div className="card-vector-container">

                        <Image
                            src={"/common/schedule2.png"}
                            fill
                            sizes="(100vw)"
                            // width={150}
                            // height={150}
                            alt="bg-image"
                        />

                    </div>


                    <div className="contect-item">

                            <div className="input-box name-wrapper" style={formik.errors.name && formik.touched.name ? errorStyle : {}}>
                                <input type="text" required id="name" name="name" {...formik.getFieldProps('name')}/>
                                <label htmlFor="name" className="label">Name</label>
                                <FaUser className="icon"/>
                            </div>


                            <div className="input-box phone-wrapper" style={formik.errors.phone && formik.touched.phone ? errorStyle : {}}>
                                <input type="number" required id="phone" name="phone" {...formik.getFieldProps('phone')} />
                                <label htmlFor="phone" className="label">Phone</label>
                                <FaPhone className="icon"/>

                            </div>

                            <div className="input-box date-wrapper" style={formik.errors.event_date && formik.touched.event_date ? errorStyle : {}}>
                                <input type="date" required id="event-date2" min={today} onClick={e=>e.target.showPicker()} name="event_date" {...formik.getFieldProps("event_date")}/>
                                <label htmlFor="event-date2" className="label">Event Date</label>
                            </div>


                            <div className="input-box time-wrapper" style={formik.errors.time && formik.touched.time ? errorStyle : {}}>
                                <input type="time" required id="event-time" min={today} onClick={e=>e.target.showPicker()} name="time" {...formik.getFieldProps("time")}/>
                                <label htmlFor="event-time" className="label">Schedule Time</label>
                            </div>
                            

                    </div>
                    {recaptcha===null ?( <span className="error-text">Please Fill ReCAPTCHA</span>):(<></> )}
                    <ReCAPTCHA sitekey="6LfVFGcpAAAAAO606P0XnI79hWitIwuF4HPhB_nR" onChange={onRecaptchaChange} />
                             <button className="schedule-btn" disabled={recaptcha===null} type="submit" onClick={() => { formik.handleSubmit() }}> {isLoading ? <Spinner1/> : "Schedule Visit"} </button>
                </div>
            </div>
        </div>
    </Section>)
}


const Section = styled.section`
position: relative;
padding: 1rem 0rem;
background-color: var(--bg-color);

iframe{
width: 100%;
height:530px;
border: 0;
}

.container{
    display: grid;
    gap: 3rem;
    grid-template-columns:3fr 2fr;
}


.schedule-card{
    background-color: white;
    position: relative;
    border-radius: 5px;
    height:530px;

    /* border: 1px solid red; */





    .contant{
        display: flex;
        height: 100%;
        padding: 3rem;
        z-index: 1;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;

        .title{
            color: var(--primary-color);
            z-index: 1;
            text-align: center;
            font-size: 2.5rem;
            font-family: Montserrat;
            font-style: normal;
            font-weight: 700;
            /* margin-top: 5rem; */
            /* text-transform: capitalize; */

        }

        .contect-item{
            /* border: 1px solid red; */
            width: 100%;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr 1fr ;
            gap: 1rem;
        }

        .card-vector-container{
            position: relative;
            width: 150px;
            height: 150px;
            margin: auto;

        }
        .schedule-btn{
            border: none;
            font-size: 1.8rem;
            /* background: var(--secoundary-color); */
            background: var(--primary-color);
            z-index: 1;
            grid-column: 1/-1;
            color: white;
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 500;
            padding: 10px ;
            width: 100%;
            cursor: pointer;
            border-radius: 0.3rem;
        }
    }

}

   

.input-box{
    border: 1px solid black;
    background: white ;
    z-index: 1;
    position: relative;
    height: 4.5rem;
    width: 100%;
    display: flex;
    align-items: center;

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

    .icon{
        position: absolute;
        right: 10px;
        font-size: 1.5rem;
        color: var(--para);
    }

    input{
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
    /* To remove the default placeholder */
    input[type=date]:required:invalid::-webkit-datetime-edit {
    color: transparent;
    }
    input[type=date]:focus::-webkit-datetime-edit {
        color: black !important;
    }

}


@media (max-width:900px) {

    iframe{
        height:300px;
    }
    .container{
        display: grid;
        gap: 3rem;
        grid-template-columns:1fr;
    }
    .schedule-card{
        /* height: 300px; */
    }

    .contant{
        padding: 2rem !important;

    }

    .contect-item{
        row-gap: 1.5rem !important;
    }
}
`