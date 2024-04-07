import styled from "styled-components";
import Heading from "../Heading";
import VendorCategoryCard from "./VendorCategoryCard";

export default function VendorCategoryCardGrid (){



    return(
        <Wrapper>
            <div className="container">
                <Heading text={"Wedding vendors by category"}/>
                <div className="card-container">
                    <VendorCategoryCard bgColor={"#FAF3F0"} title={"Photographer"} desc={"Photgrapher & Videographer"} url={"/best-wedding-photographers/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#FAF0D7"} title={"Makeup Atrist"} desc={"Wedding Makeup Artist"}  url={"/top-makeup-artists/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F7FFE5"} title={"Mehndi Artist"} desc={"Wedding Mehndi Artist"}  url={"/best-mehndi-artists/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F9F5F6"} title={"Decorators"} desc={"Decorators "}  url={"/best-decorators/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#F0EDD4"} title={"Wedding Transport"} desc={"Transport for Wedding"}  url={"/wedding-transportation-and-vintage-cars/delhi/all"}/>
                    <VendorCategoryCard bgColor={"#E3F4F4"} title={"Band-Baja"} desc={"Band-Baja"}  url={"/band-baja-ghodiwala/delhi/all"}/>

               </div>
            </div>
        
        </Wrapper>
    )

}

const Wrapper = styled.section`

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