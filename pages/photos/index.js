
import Header from "@/components/layout.js/Header";
import PhotosGrid from "@/components/photos/PhotosGrid";


export default function Page({data}) {

    if(!data){
        return(<div className="text-center">No photos available</div>);
    }


    // console.log(data)

    return (<>

        <Header/>
        <PhotosGrid data={data}/>

    </>)
}



export async function getStaticProps(){

    try {
        let photos = await fetch('http://192.168.29.128/wedding_benquets/website/api/photos') ;
        photos = await photos.json();


        return{
            props:{
                data :  photos || null,
            }
        }
        
    } catch (error) {
        // console.log(error);
        return{
            props: {
                data:null
            },
        }
    }
}