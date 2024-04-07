import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import JobCard from "./JobCard";

export default function Jobs() {

    const jobsData = [
        {
            id: 1,
            name: "Customer Service Executive",
            requirement:"Only Female Candidate",
            address: "Subhash Nagar, New Delhi",
            nature: "Full time",
            type: "WFO",
            salary: "15k-20k",
            incentive: true,
            jd: `
            
                The ideal candidate, with 1-6 years of professional experience in telesales and inside sales, should excel in cold calling and exhibit a minimum of 1 year of proficiency. Fluency in English and Hindi is essential for effective communication. Candidates are expected to leverage their experience to engage potential clients proactively. The role demands a strong foundation in sales practices, making this an excellent opportunity for individuals seeking a dynamic and challenging environment to further enhance their skills and contribute to the company's growth.


            `


        },
        {
            id: 2,
            name: "Venue Manager",
            address: "Subhash Nagar, New Delhi",
            nature: "Full time",
            type: "WFO",
            salary: "15k-35k",
            incentive: true,
            jd: ` With over a year of experience, the candidate will be responsible for overseeing the maintenance and repairs of venue grounds, property, and equipment. This role involves ensuring cleanliness and organization, managing event bookings, and negotiating with clients. Additionally, the candidate will supervise staff, coordinate equipment rentals, liaise with catering services, and promote events through various marketing channels. Administrative tasks such as scheduling, invoicing, and enforcing security protocols will also be crucial in this role, emphasizing a comprehensive approach to venue management.`



        },
        {
            id: 3,
            name: "3 Months SEO Internship",
            address: "Subhash Nagar, New Delhi",
            nature: "Full time",
            type: "WFO",
            salary: "5k",
            incentive: true,
            jd: `
            During this three-month internship, the candidate will support the marketing team by contributing to the development of SEO strategies aimed at enhancing clients' web traffic. Responsibilities include researching and analyzing SEO trends to identify areas for improvement and new ranking opportunities. The intern will actively engage in keyword research, create SEO-friendly content, and stay abreast of SEO and web development trends. Additionally, tasks involve enhancing metadata and addressing broken links in published articles, demonstrating a hands-on approach to optimizing online content.
            `



        }
    ]

    return (
        <Wrapper className="section">

            <div className="container">
                <Heading text={"Current Job Openings"} desc={"Join Our Team Today"} />

                <div className="jobs-container">
                    {
                        jobsData.map((jobs, i) => {
                            return (

                                <JobCard key={i} {...jobs} />
                            )
                        })
                    }

        

                </div>
            </div>


        </Wrapper>
    )

}


const Wrapper = styled.section`

/* background-color: var(--bg-color); */


.jobs-container{
    margin-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
}

@media (max-width:600px) {

    .jobs-container{
        margin-top: 1rem;
    }
    
}

`