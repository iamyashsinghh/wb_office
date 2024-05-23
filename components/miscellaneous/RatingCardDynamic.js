import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai'

export default function RatingCardDynamic({rating, ratingcount}) {

    const finalRating = rating ?? 4.5;
    const finalRatingCount = ratingcount === 0 ? 158 : ratingcount ?? 158;
    return (
        <Wrapper>

            <AiFillStar className="star" />
            <span className="rating">{finalRating}</span>
            <span className="reviews">{`(${finalRatingCount})`}</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #00B28A;
    border-radius: 3px;
    padding: 0px 3px;
    color: white;
    padding: 0px 2px;
    display: flex;
    align-items: center;
    gap: .2rem;


.star{
    color:#fdcd00;
    font-size: 2rem;

}
.rating{
    font-size: 1.5rem;
    font-family: "Poppins";
    font-weight: 500;
}
.reviews{
    font-size: 1.3rem;
    font-family: "Poppins";
    font-weight: 500;
    color: white;
    /* color: lightgreen; */
}

`