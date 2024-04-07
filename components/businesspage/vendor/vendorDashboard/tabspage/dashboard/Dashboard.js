import Heading from "@/components/miscellaneous/Heading";
import ProfileCard from "./ProfileCard";
import CardContent from "./CardContent";
import PhotoGrid from "./PhotoGrid";

export default function Dashboard({data}) {

    // console.log(data)

    return (

        <>
            <Heading text={"Dashboard"} desc={"Welcome to your Dashboard! All your information is displayed below. Please note that this information is live on the website. You can edit out your details as per your convenience."} />
            
            {/* Top profile card */}
            <ProfileCard user={data.vendorUser} setSelectedIndex={data.setSelectedIndex}/>   

            {/* 3 card content */}
            <CardContent user={data.vendorUser} vendor_content={data.vendorContent} setSelectedIndex={data.setSelectedIndex}/>
            <PhotoGrid images={data.vendorContent?.images}/>
        </>
    )
}