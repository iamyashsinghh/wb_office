// import { useGlobalContext } from "@/context/MyContext";

export default async function iscity(city) {

    try {
        if (city) {
            // const { cities } = useGlobalContext();
            let cities = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/cities`)
            cities = await cities.json();
            // console.log("isCity")
            // console.log(cities)
            
            const cityList = cities.data.map((city) => {
                return city.slug;
            })

            return cityList.includes(city);


        }
        else {
            return false;
        }

    } catch (error) {
        console.log(error)

    }

}

