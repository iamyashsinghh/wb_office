export default async function getLocalitiesCat(city, cat){

    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/locations_cat/${city}/${cat}`;
        let response = await fetch(`${url}`);
        response =  await response.json();

        return response;

    } catch (error) {
        console.log(error)
        return {};
    }
}