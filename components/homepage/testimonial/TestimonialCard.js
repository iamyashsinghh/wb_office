import { AiFillStar } from 'react-icons/ai'
import styled from "styled-components";

export default function TestimonialCard() {

    return (
        <Wrapper className='border'>
            <div className="stars">
                <AiFillStar className='star' size={20} />
                <AiFillStar className='star' size={20} />
                <AiFillStar className='star' size={20} />
                <AiFillStar className='star' size={20} />
                <AiFillStar className='star' size={20} />
            </div>
            <p className='review-content'>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam”</p>
            <hr />
            <div className="user-profile">
                    <img src="/icons/User.png" alt="" />
                    <div className="user-details">
                        <span className='user-name'>AzKaaR</span>
                        <sapn className="date">Jan, 2023</sapn>
                    </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
border:1px solid silver;
padding:3rem;
display: flex;
flex-direction:column;
gap:2rem;


/* border: 1px solid silver; */
/* min-width:30rem; */

.stars{
    display: flex;
    gap: .8rem;

    .star{
        color:orange;
    }

}

.review-content{
    font-size:1.7rem;
    color:var(--para)
}

.user-profile{
    display: flex;
    gap: 2rem;  
    align-items: center;
    img{
        width:15%;
    }

    .user-details{
        display: flex;
        flex-direction:column;

    
        .user-name{
            font-family:'Poppins';
            font-size:1.8rem;
            /* font-weight:bold; */
        }
        .date{
            font-size:1.5rem; 
        }
        
    }
}
`