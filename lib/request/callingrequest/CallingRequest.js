export default async function CallingRequest(slug) {
    try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAINN}/api/handle_calling_request`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({slug:slug})
        })

        response = await response.json();
        console.log(response)
        return response;
        

    } catch (error) {
        console.log(error)

    }

}