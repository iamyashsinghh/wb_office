

export default async function getLocalities(city){

    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/locations/${city}`;
        let response = await fetch(`${url}`);
        response =  await response.json();
        
        return response;
        
    } catch (error) {
        console.log(error)
        return {};
    }
}