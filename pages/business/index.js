import Contactus from "@/components/businesspage/homepage/Contactus";
import Features from "@/components/businesspage/homepage/Features";
import Footerbanner from "@/components/businesspage/homepage/Footerbanner";
import Hero from "@/components/businesspage/homepage/Hero";
import Login from "@/components/businesspage/homepage/Login";
import Showcase from "@/components/businesspage/homepage/Showcase";
import styled from "styled-components";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";


export default function BusinessVendorPage() {


    const router = useRouter();

    const cookies = parseCookies()

    // console.log(cookies)
    
    if (cookies["@VendorApp"]) {

        router.push('/business/dashboard')

    }


    return (
        <Wrapper>

            <Hero />
            <Login />
            <Features />
            <Showcase />
            {/* <Footerbanner/> */}
            <Contactus />
        </Wrapper>
    )

}

const Wrapper = styled.section`


`