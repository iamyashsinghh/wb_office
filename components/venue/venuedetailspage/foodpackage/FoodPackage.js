import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import FoodCardTemplate from "./FoodCardTemplate";

export default function FoodPackage({veg_foods,nonveg_foods}) {

    // veg_foods = JSON.parse(veg_foods)
    // // console.log(veg_foods)

    // nonveg_foods = JSON.parse(nonveg_foods)
    // // console.log(nonveg_foods)


    //Handling the error when the veg and non veg foods value is null 

    veg_foods = veg_foods ? JSON.parse(veg_foods) : [];
    // console.log(veg_foods)
    
    nonveg_foods = nonveg_foods ? JSON.parse(nonveg_foods) : [];
    // console.log(nonveg_foods)
    
    

    return (
        <Section>
            <Heading text={"Food Package"} />
            <div className="container package-container">
                <FoodCardTemplate title={"Vegetarian"} type={"green"} foods={veg_foods}/>
                <FoodCardTemplate title={"Non Vegetarian"} type={"red"} foods={nonveg_foods} />
            </div>
        </Section>
    )
}


const Section = styled.div`
padding: 1rem 0rem;
background-color: var(--bg-color);
.package-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15rem;
    padding: 2rem;
}


@media (max-width:1000px) {
    .package-container{

        grid-gap: 5rem;

    }
    
}
@media (max-width:700px) {
    .package-container{
        grid-template-columns: 1fr;
        grid-gap: 5rem;

    }
    
}


`