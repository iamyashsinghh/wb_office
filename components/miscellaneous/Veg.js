import styled from "styled-components"


export default function Veg({color})
{



    return(<Wrapper color={color}>

        <div className="circle">

        </div>
    
    </Wrapper>)
}


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0px 3px;
width: 15px;
height: 15px;
border: 1px solid ;
${(props) => ` border: 1px solid ${props.color};`}


.circle{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    ${(props) => ` background: ${props.color};`}
}




`