import styled from "styled-components";
import Veg from "@/components/miscellaneous/Veg";

export default function FoodCardTemplate({ type, title,foods }) {


    
    const styles = {
        borderTop: "4px solid green",
        borderLeft: "4px solid green",
        borderColor: type,
    }

    let headerBgStyle = {}


    if (type === "green") {
        headerBgStyle = {
            backgroundColor: " rgb(205, 236, 205)",
        }
    }
    if (type === "red") {
        headerBgStyle = {
            backgroundColor: "rgb(232, 203, 203)",
        }
    }
    return (<Div className="box" style={styles}>

        <div className="header" style={headerBgStyle}>
            <Veg color={type} />
            <h2 style={{ color: type }}>{title} </h2>
        </div>
        <div className="package-content">
            <table>
                <thead >
                    <tr>
                        <th>Food Items</th>
                        <th className="center">Package</th>
                    </tr>
                </thead>
                <tbody>
                    {foods?.map((food, index) => (
                        <tr key={index} >
                            <td>{food.name}</td>
                            <td className="center">{food.package}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>


    </Div>)

}


const Div = styled.div`

box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
padding-bottom: 5rem;
background: white;
    .header{
        padding: 1rem 2rem;
        display: flex;
        gap: 2rem;
        align-items: center;
        h2{
            font-size: 3rem;
            font-family: "Montserrat";
            font-weight: 500;
            color: #F33232;
        }
    }

    .package-content{
        table{
            width: 100%;
            padding: 1rem 6rem;


        }       

        .center{
            text-align: center;
        }

        th{
            text-align: left;
            font-size: 2rem;
            font-family: "Montserrat";
            font-weight: 500;
            padding-top: 1rem;
            /* border: 1px solid red; */
        }
        td{
            padding-top: 1.5rem;  
            font-size: 1.8rem;
            /* border: 1px solid gray; */
            font-family: "Poppins";
            
        }

    
 }

 @media (max-width:600px) {
    padding-bottom: 3rem;


    .package-content{
        table{
            
            padding: 1rem 2rem;

        }       
    }
   
}
`

