
import Features from "@/components/career/home/Features";
import HeroBanner from "@/components/career/home/HeroBanner";
import JobsForm from "@/components/career/home/JobForm";
import Jobs from "@/components/career/home/jobs/Jobs";
import Header from "@/components/layout.js/Header";
import Navbar from "@/components/layout.js/Navbar";



export default function Page(){


    return(

        <>
        {/* <Header/> */}
        <Navbar/>
        <HeroBanner/>
        <Features/>
        <Jobs/>
        <JobsForm/>
        </>
    )
}



