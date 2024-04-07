// pass obejct as a argument to this function
export default async function leadGen(data) {
  try {
    const url = `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN}/venue-lead`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();

    return response;
  } catch (error) {
    console.log(error);
  }
}
