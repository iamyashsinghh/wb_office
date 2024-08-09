import styled from "styled-components";
import Heading from "../Heading";
import VendorCategoryCard from "./VendorCategoryCard";

export default function VendorCategoryCardGrid (){



    return(
        <Wrapper>
            <div className="container">
                <Heading text={"Wedding vendors by category"}/>
                <div className="card-container">
                    <VendorCategoryCard bgColor={"#FAF3F0"} imgUrl={'/vendor-cat/photographer.jpeg'} title={"Photographer"} desc={"Photgrapher & Videographer"} url={"/best-wedding-photographers/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#FAF0D7"} imgUrl={'/vendor-cat/makeup.jpeg'} title={"Makeup Artist"} desc={"Wedding Makeup Artist"}  url={"/top-makeup-artists/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F7FFE5"} imgUrl={'/vendor-cat/mehndi-artist.jpeg'} title={"Mehndi Artist"} desc={"Wedding Mehndi Artist"}  url={"/best-mehndi-artists/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F9F5F6"} imgUrl={'/vendor-cat/wedding-decorator.jpeg'} title={"Decorators"} desc={"Decorators "}  url={"/best-decorators/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F0EDD4"} imgUrl={'/vendor-cat/wedding-transport.jpeg'} title={"Wedding Transport"} desc={"Transport for Wedding"}  url={"/wedding-transportation-and-vintage-cars/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#E3F4F4"} imgUrl={'/vendor-cat/band-baja.jpeg'} title={"Band-Baja"} desc={"Band-Baja"}  url={"/band-baja-ghodiwala/delhi/all"}/>
               </div>
            </div>
        
        </Wrapper>
    )

}

const Wrapper = styled.section`
padding: 0rem 0rem;
.card-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

}

@media (max-width:800px) {
    .card-container{
        grid-template-columns: 1fr ;
        gap: 2rem;

    }
    
}

`