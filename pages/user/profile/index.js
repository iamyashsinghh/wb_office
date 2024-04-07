
import ProfileCard from "@/components/businesspage/vendor/vendorDashboard/tabspage/dashboard/ProfileCard";
import PopularVenue from "@/components/miscellaneous/popular venue/PopularVenue";
import VendorSlider from "@/components/miscellaneous/vendorcategoryslider/VendorSlider";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import HaveUsCallYou from "@/components/miscellaneous/haveuscallyou/HaveUsCallYou";
import { parseCookies } from "nookies";
import nookies from 'nookies'
import Header from "@/components/businesspage/vendor/vendorDashboard/header/Header";

export default function UserProfilePage({data}) {

    const { vendorCategories } = useGlobalContext();

    // Printing the cookies
    // const cookies = parseCookies()
    // console.log({ cookies })

    // console.log(data)

    //This function have no use but we have to pass this because we are using the same component VendorSlider that takes two args.
    const setSelectedIndex=(id)=>{
        null
    }

    return (

        <Wrapper>
            <Header cookie_name={"@UserApp"} setSelectedIndex={setSelectedIndex}/>
            <ProfileCard user={data}/>
            <VendorSlider vendorCategories={vendorCategories}/>
            <HaveUsCallYou />
            {/* <LeadForm/> */}
            <PopularVenue />
        </Wrapper>
    )
}


const Wrapper = styled.section`



`


export async function getServerSideProps(ctx) {

    try {
        // Parse the cookies
        const cookies = nookies.get(ctx)



        const { token } = JSON.parse(cookies["@UserApp"] || "{}");
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
                    destination: '/user/signin', // Where you want to redirect to
                    permanent: false, // Whether the redirect is permanent or not
                  },
             };
        }
        else {

            const url = `${process.env.SERVER_DOMAIN}/api/user/get_user`;

            let response = await fetch(url, {
                method: "GET",
                headers: {
                    bearer: token
                },
            })
            response = await response.json();

            if (response.success) {

                return {
                    props: {
                        data: response.user,
                    },

                }
            }
            else {
                
                // Destroy
                nookies.destroy(ctx, '@UserApp',{
                    path:'/'
                })

                return { 
                    redirect: {
                        destination: '/user/signin', // Where you want to redirect to
                        permanent: false, // Whether the redirect is permanent or not
                      },
                 };

            }

        }


    } catch (error) {
        console.log(error);
        return {
            notFound: true
        };

    }

}