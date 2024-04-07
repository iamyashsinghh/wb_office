//This is a single venue and vender details page
//Here category will be city and city will be venue or vendor slug

    
import VendorDetailsPage from "@/components/vendor/vendordetailspage/VendorDetailsPage";
import VenueDetailsPage from "@/components/venue/venuedetailspage/VenueDetailsPage";
import Head from "next/head";


export default function Page({ response }) {

    // console.log(response)
    // console.log(similar_packages)

    if (response.tag === 'venue') {
        return (
            <>
                <Head>
                    <title>{response.data.venue.meta_title}</title>
                    <meta name="description" content={response.data.venue.meta_description} />
                    <meta name="keywords" content={response.data.venue.meta_keywords}/>   

                    <meta property="og:title" content={response.data.venue.meta_title}/>
                    <meta property="og:description" content={response.data.venue.meta_description}/>
                   
                </Head>
                <VenueDetailsPage response={response} />

            </>
        )

    }
    else {

        return (
            <>
                <Head>
                    <title>{response.data.vendor.meta_title}</title>
                    <meta name="description" content={response.data.vendor.meta_description} />
                    <meta name="keywords" content={response.data.vendor.meta_keywords}/>   

                    <meta property="og:title" content={response.data.vendor.meta_title}/>
                    <meta property="og:description" content={response.data.vendor.meta_description}/>
                 
                </Head>
                <VendorDetailsPage response={response} />

            </>
        )
    }

}

export async function getServerSideProps({ query, req, res }) {

    try {
        // res.setHeader(
        //     'Cache-Control',
        //     'public, s-maxage=900, stale-while-revalidate=1200'
        // )

        const { category: city, city: slug } = query;

        // const url = `http://192.168.29.128/wedding_benquets/website/api/venue/${slug}`
        const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_details/${slug}`

        let response = await fetch(url);
        response = await response.json();
        // console.log(response)

        if (!response.success) {
            return ({
                notFound: true,
            })
        }
        // console.log(response)



        return ({
            props: {
                response: response || null
            }
        })



    } catch (error) {
        console.log("some error occur featching the data" + error)
        return ({
            notFound: true,
        })
    }
}


// const Div = styled.div`
// position: relative;

// `
