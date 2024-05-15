export default async function leadGen(data) {
  try {
    const utm_source_active = localStorage.getItem('utm_source_active');
    const url = `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN}/venue-lead`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, is_ad: utm_source_active }),
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
