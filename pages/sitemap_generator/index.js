
import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import getLocalities from "@/lib/request/getlocalities/getLocalities";

export default function SitemapGenPage() {



    const { cities, vendorCategories, venueCategories } = useGlobalContext();
    const [localites, setLocalities] = useState([])
    const [count, setCount] = useState(0)

    const [selectedCity, setSelectedCity] = useState('delhi')
    const [selectedCat, setSelectedCat] = useState('')

    const [sitemapData, setSiteMapData] = useState("")
    const [venuesData, setVenuesData] = useState("")
    const [vendorssData, setVendorsData] = useState("")



    const baseUrl = 'https://weddingbanquets.in';

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_all_venues`);
                const data = await response.json();
                setVenuesData(data);
                console.log(data);
                } catch (error) {
                console.error("Error fetching venues:", error);
            }
        }
        fetchVenues();
    }, []);
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/get_all_vendors`);
                const data = await response.json();
                setVendorsData(data);
                console.log(data);
                } catch (error) {
                console.error("Error fetching venues:", error);
            }
        }
        fetchVendors();
    }, []);


    useEffect(() => {

        const fetchLocalities = async () => {
            const response = await getLocalities(selectedCity)

            if (response.success) {
                setLocalities(response.data);
            }
        }

        fetchLocalities();
    }, [selectedCity])


    // console.log(localites)


    //Generate date and time
    function getCurrentDateTime() {
        const now = new Date();
        const isoString = now.toISOString();
        return isoString.substring(0, isoString.length - 1) + '+00:00';
    }



    const generateSitemap = async () => {
        let rawsitemap = ``

        //IF category is not selected then return
        if (!selectedCat) {
            alert("Select category")
            return;
        }

        //Generate url for uenue
        if (selectedCat == "1") {
            venueCategories.forEach(cat => {
                localites.forEach((locality) => {
                    const url = ` ${baseUrl}/${cat.slug}/${selectedCity}/${locality.slug} `;
                    // console.log(`<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>`);
                    const sitemap = `<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`;
                    rawsitemap += sitemap;
                })

            });
            setCount(venueCategories.length * localites.length)
        }
        //Generate url for vendor
        if (selectedCat == "2") {
            vendorCategories.forEach(cat => {

                localites.forEach((locality) => {
                    const url = `${baseUrl}/${cat.slug}/${selectedCity}/${locality.slug} `;
                    // console.log(`<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`);
                    const sitemap = `<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`;

                    rawsitemap += sitemap;
                })

            });

            setCount(vendorCategories.length * localites.length)

        }
        //Generate url for both venue and vendor category
        if (selectedCat == "3") {

            vendorCategories.forEach(cat => {

                localites.forEach((locality) => {
                    const url = `${baseUrl}/${cat.slug}/${selectedCity}/${locality.slug} `;
                    // console.log(`<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`);
                    const sitemap = `<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`;

                    rawsitemap += sitemap;
                })
            });

            vendorCategories.forEach(cat => {

                localites.forEach((locality) => {
                    const url = `${baseUrl}/${cat.slug}/${selectedCity}/${locality.slug} `;
                    const sitemap = `<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`;
                    rawsitemap += sitemap;
                })
            });
            setCount((vendorCategories.length * localites.length) + (venueCategories.length * localites.length))
        }
        if (selectedCat === "4") {
            let tempSitemap = ``;
            let totalCount = 0;
            console.log(cities);
            for (const city of cities) {

                const allCategories = [...vendorCategories, ...venueCategories];
                console.log(allCategories);
                const localitiesResponse = await getLocalities(city.slug);
                console.log(localitiesResponse);
                const cityLocalities = localitiesResponse.success ? localitiesResponse.data : [];
                for (const cat of allCategories) {
                    console.log(cityLocalities);
                    for (const locality of cityLocalities) {
                        const url = `${baseUrl}/${cat.slug}/${city.slug}/${locality.slug}`;
                        const sitemapEntry = `<url>\n<loc>${url}</loc>\n<lastmod>${getCurrentDateTime()}</lastmod>\n<priority>1.00</priority>\n</url>\n\n`;
                        tempSitemap += sitemapEntry;
                        totalCount++;
                    }
                }
            }
    
            rawsitemap = tempSitemap;
            setCount(totalCount);
        }
        // console.log(rawsitemap)
        setSiteMapData(rawsitemap);
    }

    return (
        <Wrapper className="section">

            <div className="container sitemap-container">
                <Heading text={"Generate sitemap"} />


                <div className="sitemap-filter-container">

                    <div className="dropdown" >
                        <select name="city" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                            <option value=""> Select City</option>
                            {
                                cities?.map((city) => {
                                    return <option key={city.id} value={city.slug}> {city.name}</option>
                                })

                            }

                        </select>
                    </div>
                    <div className="dropdown" >
                        <select name="category" id="category" onChange={(e) => setSelectedCat(e.target.value)}>
                            <option value=""> Select category</option>
                            <option value="1"> For venue</option>
                            <option value="2"> For Vendor</option>
                            <option value="3"> Venue and Vendor</option>
                            <option value="4"> All With Cities</option>
                        </select>
                    </div>
                    <div className="dropdown" >
                        <button onClick={generateSitemap}>Generate</button>
                    </div>

                </div>


                <div>

                    <h2>Total Sitemap Generated : {count}</h2>

                    <textarea value={sitemapData}></textarea>
                </div>



            </div>




        </Wrapper>
    )
}


const Wrapper = styled.section`
.sitemap-container{
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.sitemap-filter-container{

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    select{
        padding: 1rem 2rem;
        font-size: 2rem;
    }

    button{
        padding: 1rem 2rem;
        font-size: 2rem;
        background-color: tomato;
        color: white;
        cursor: pointer;
        border: 2px solid white;
    }


}

textarea{
    /* border: 5px solid var(--primary-color); */

    min-width: 100%;
    max-width: 100%;
    height: 400px;
    padding: 1rem;
    font-size: 1.8rem;  
    font-family:"Poppins" ;
    /* font-family:"montserrat" ; */
    
}

`