import styled from "styled-components";
import { MdLocationOn } from 'react-icons/md'  //location
import { FaDatabase, FaSuitcase } from "react-icons/fa";     // salary 10-15k  suit for full time  
import { MdWorkHistory } from "react-icons/md";   //For experience
import { FaFemale } from "react-icons/fa";
import Link from "next/link";

export default function JobCard({ ...jobs }) {


    return (
        <Wrapper>
            <div>
                <h2 className="job-title">{jobs.name}</h2>
                {
                    jobs.requirement && (
                        <span className="requirement">
                            <FaFemale className="icon" />
                            <p>{jobs.requirement}</p>
                        </span>
                    )
                }

            </div>


            <p className="job-desc">
                {jobs.jd}</p>

            <div className="info">
                <span className="info-pills">
                    <MdLocationOn className="icon" />
                    <p>{jobs.type}</p>
                </span>
                <span className="info-pills">
                    <FaDatabase className="icon" />
                    <p>{jobs.salary}</p>
                </span>
                <span className="info-pills">
                    <FaSuitcase className="icon" />
                    <p>{jobs.nature}</p>
                </span>

            </div>

            <div className="action-btn">
                <Link href="#job-form" className=" button btn-apply">Apply</Link>
                {/* <button className="btn-details">See Details</button> */}
            </div>

        </Wrapper>
    )
}


const Wrapper = styled.div`
/* background-color: white; */
/* background-color: var(--bg-color); */
max-width: 45rem;
padding: 2rem;
border-radius: 5px;
border: 1px solid silver;
display: flex;
flex-direction: column;
gap: 2rem;

.job-title{
    font-size: 2.5rem;
    font-family: "montserrat";
    /* font-weight: 600; */
}
.requirement{
    margin-top: 5px;
    color: red;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: .5rem;
}
.job-desc{
    font-size: 1.6rem;
    font-family: "Poppins";
    color: var(--para);

}

.info{
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    .info-pills{
        color: var(--para);
        display: flex;
        align-items: center;
        gap: 1rem;

        .icon{
            font-size: 1.8rem;
        }
        p{
            font-size: 1.6rem;
            font-family: "Poppins";
        }
    }
}
.action-btn{
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .button{
        font-size: 1.7rem;
        font-family: "Poppins";
        font-weight: 500;
        background-color: none;
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        cursor: pointer;
    }

    .btn-apply{
        background-color: var(--primary-color);
        color: white;
    }
}

`