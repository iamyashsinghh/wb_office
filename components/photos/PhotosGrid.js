import styled from "styled-components";
import { PhotoCard } from "./PhotoCard";

export default function PhotosGrid({data}){

    // console.log(data)

    return (<Section className="section photos-seciton" >
        <div className="container">
            <div className="photos-gallary ">
               {
                data?.map((item)=>{
                    return (<PhotoCard url={item.image} key={item.id}></PhotoCard>)
                })
               }
            </div>
        </div>
    
    
    </Section>)
} 

const Section = styled.section`


.photos-gallary{

    padding: 1rem;
    border: 2px solid black;
    display: grid;
    gap: 2rem;
    grid-template-columns:  1fr 1fr 1fr;

}


`