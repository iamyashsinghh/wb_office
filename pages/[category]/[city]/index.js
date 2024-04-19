import VendorDetailsPage from "@/components/vendor/vendordetailspage/VendorDetailsPage";
import VenueDetailsPage from "@/components/venue/venuedetailspage/VenueDetailsPage";
import Head from "next/head";

export default function Page({ response }) {
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
        const { category: city, city: slug } = query;

        const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_details/${slug}`
        let response = await fetch(url);
        response = await response.json();
        if (!response.success) {
            return ({
                notFound: true,
            })
        }
        if(response.city.slug !== city){
            return {
                redirect: {
                  permanent: true,
                  destination: `/${response.city.slug}/${slug}`,
                },
            };
        }
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