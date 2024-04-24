import styled from "styled-components";
import Heading from "../Heading";
import VenueCardPage from "./VenueCardPage";
import { useGlobalContext } from "@/context/MyContext";

export default function VenueCardGridPage (){
    const {selectedCity} = useGlobalContext()
    return(
        <Wrapper>
            <div className="container">
                <Heading text={`Venues in ${selectedCity}`}/>
                <div className="card-container">
                    <VenueCardPage bgColor={"#FAF3F0"} imgUrl={'/vendor-cat/photographer.jpeg'} title={"Banquet Halls"} desc={"Banquet Halls"} url={"/best-wedding-photographers/delhi/all"}/>
                    <VenueCardPage bgColor={"#FAF0D7"} imgUrl={'/vendor-cat/makeup.jpeg'} title={"Marriage Gardens"} desc={"Marriage Gardens"}  url={"/top-makeup-artists/delhi/all"}/>
                    <VenueCardPage bgColor={"#F7FFE5"} imgUrl={'/vendor-cat/mehndi-artist.jpeg'} title={"Wedding Farmhouse"} desc={"Wedding Farmhouse"}  url={"/best-mehndi-artists/delhi/all"}/>
                    <VenueCardPage bgColor={"#F9F5F6"} imgUrl={'/vendor-cat/wedding-decorator.jpeg'} title={"Party Halls"} desc={"Party Halls"}  url={"/best-decorators/delhi/all"}/>
                    <VenueCardPage bgColor={"#F0EDD4"} imgUrl={'/vendor-cat/wedding-transport.jpeg'} title={"5 Start Wedding Hotels"} desc={"5 Start Wedding Hotels"}  url={"/wedding-transportation-and-vintage-cars/delhi/all"}/>
                    <VenueCardPage bgColor={"#E3F4F4"} imgUrl={'/vendor-cat/band-baja.jpeg'} title={"Corporate Events"} desc={"Corporate Events"}  url={"/band-baja-ghodiwala/delhi/all"}/>
                    <VenueCardPage bgColor={"#E3F4F4"} imgUrl={'/vendor-cat/band-baja.jpeg'} title={"Destination Weddings"} desc={"Destination Weddings"}  url={"/band-baja-ghodiwala/delhi/all"}/>
                    <VenueCardPage bgColor={"#E3F4F4"} imgUrl={'/vendor-cat/band-baja.jpeg'} title={"Small Function Halls"} desc={"Small Function Halls"}  url={"/band-baja-ghodiwala/delhi/all"}/>
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