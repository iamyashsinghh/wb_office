// import CardContent from "@/components/businesspage/vendor/vendorDashboard/tabspage/dashboard/CardContent";
// import PhotoGrid from "@/components/businesspage/vendor/vendorDashboard/tabspage/dashboard/PhotoGrid";
// import VendorInfo from "@/components/businesspage/vendor/vendorDashboard/tabspage/dashboard/VendorInfo";

import nookies from 'nookies'
import { parseCookies, destroyCookie } from "nookies";
import HeaderTabs from "@/components/businesspage/vendor/vendorDashboard/headertabs/HeaderTabs";
import Header from "@/components/businesspage/vendor/vendorDashboard/header/Header";
import { useState } from "react";
import Dashboard from "@/components/businesspage/vendor/vendorDashboard/tabspage/dashboard/Dashboard";
import PersnalDetails from "@/components/businesspage/vendor/vendorDashboard/tabspage/persnaldetails/PersnalDetails";
import PhotoUpload from "@/components/businesspage/vendor/vendorDashboard/tabspage/photo/PhotoUpload";

import VendorBusinessDetails from "@/components/businesspage/vendor/vendorDashboard/tabspage/businessdetails/BusinessDetails";
import VenueBusinessDetails from '@/components/businesspage/venue/tabspage/businessdetails/BusinessDetails';

import VenuePricing from '@/components/businesspage/venue/tabspage/pricing/Pricing';
import VendorPricing from "@/components/businesspage/vendor/vendorDashboard/tabspage/pricing/Pricing";



export default function VendorDashboard({ data }) {

    // destroyCookie({}, '@VendorApp',{
    //     path:'/'
    // })

    // console.log(data)   

    //Printing the cookies
    // const cookies = parseCookies()
    // console.log({ cookies })


    // -----------------------------------
    
    const [vendorUser,setVendorUser] = useState(data.user || []);
    const [vendorContent,setVendorContent] = useState(data.content || []);


    const [selectedIndex, setSelectedIndex] = useState(1)

    // console.log(data)

    return (
        <>
            <Header cookie_name={"@VendorApp"} />
            <HeaderTabs selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            {
                (() => {
                    switch (selectedIndex) {
                        case 1:
                            return (<Dashboard data={{vendorUser,vendorContent,setSelectedIndex}} />)
                            break;
                        case 2:
                            return (<PersnalDetails vendorUser={vendorUser} setVendorUser={setVendorUser} />)
                            break;
                        case 3:
                            return vendorUser.business_type === 1 ? (
                                <VenueBusinessDetails vendorContent={vendorContent} setVendorContent={setVendorContent} />
                            ) : vendorUser.business_type === 2 ? (
                                <VendorBusinessDetails vendorContent={vendorContent} setVendorContent={setVendorContent} />
                            ) : null;
                          
                            break;
                        case 4:
                            return vendorUser.business_type === 1 ? (<VenuePricing  vendorContent={vendorContent} setVendorContent={setVendorContent} />) : vendorUser.business_type === 2 ? (
                                <VendorPricing  vendorContent={vendorContent} setVendorContent={setVendorContent} />
                            ) : null;
                            // return (<VenuePricing  vendorContent={vendorContent} setVendorContent={setVendorContent} />)
                            break;
                        case 5:
                            return (<PhotoUpload vendorContent={vendorContent} setVendorContent={setVendorContent}/>)
                            break;
                        default:
                            return null
                    }
                })()}






        </>
    )
}


export async function getServerSideProps(ctx) {

    try {
        // Parse the cookies
        const cookies = nookies.get(ctx)



        const { token } = JSON.parse(cookies["@VendorApp"] || "{}");
        //   console.log(token)

        // Set
        // nookies.set(ctx, 'fromGetInitialProps', 'value', {
        //     maxAge: 30 * 24 * 60 * 60,
        //     path: '/',
        // })

        // Destroy
        // nookies.destroy(ctx, 'fromGetInitialProps',{
        //     path:'/'
        // })

        if (!token) {
            return { 
                redirect: {
                    destination: '/business', // Where you want to redirect to
                    permanent: false, // Whether the redirect is permanent or not
                  },
             };
        }
        else {          //If we found the token, then again check either the token is valid or not

            const url = `${process.env.SERVER_DOMAIN}/api/business/fetch_user_and_content`;

            let response = await fetch(url, {
                method: "GET",
                headers: {

                    bearer: token
                },
            })
            response = await response.json();

            //If token is valid then response will be true and we continue
            if (response.success) {

                return {
                    props: {
                        data: response.data,
                    },

                }
            }
            else {          //If stored token is not valid then revome that invalid token and redirect to the login page
                
                // Destroy
                nookies.destroy(ctx, '@VendorApp',{
                    path:'/'
                })

                return { 
                    redirect: {
                        destination: '/business', // Where you want to redirect to
                        permanent: false, // Whether the redirect is permanent or not
                      },
                 };

            }

        }


    } catch (error) {
        // console.log(error);
        return {
            notFound: true
        };

    }

}