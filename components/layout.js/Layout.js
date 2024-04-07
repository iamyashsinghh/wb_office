
import Footer from "../miscellaneous/footer/Footer"
import NextNProgress from "@/progressbar/NextNProgress"
import SideMenuBar from "../miscellaneous/SideMenuBar"
import LeadModel from "../miscellaneous/LeadModel"
import AvailableCheck from "../miscellaneous/AvailableCheck"
import ScrollToTopButton from "./ScrollToTop"

// import ShareModel from "../model/sharemodel/ShareModel"

export default function Layout(props){
    // console.clear();
    return (
        <>
        {/* <ShareModel/> */}
        <LeadModel/>    
        <AvailableCheck/>    
        <NextNProgress color="var(--secoundary-color)" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
        <SideMenuBar />
        {props.children}
        <Footer />
        <ScrollToTopButton/>
        </>
    )
   
}