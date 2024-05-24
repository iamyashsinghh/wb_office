import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai';
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/MyContext";

export default function RatingCardDynamic({ rating, ratingcount, slug }) {
    const finalRating = rating ?? 4.5;
    const finalRatingCount = ratingcount === 0 ? 158 : ratingcount ?? 158;
    const { selectedCity } = useGlobalContext();
    const router = useRouter();
    let route ;
    if (slug == 0){
        // ment this is detail page
        route = `#rating-section`;
    }else{
        // this is listing page
        route = `/${selectedCity}/${slug}#rating-section`;
    }


    const getBackgroundColor = (rating) => {
        if (rating >= 4.5) return "#00B28A";
        if (rating >= 4.0) return "#A3D97E";
        if (rating >= 3.0) return "#FFD700";
        return "#FF6347";
    };

    return (
        <Wrapper backgroundColor={getBackgroundColor(finalRating)} onClick={(e) => { router.push(route) }}>
            <AiFillStar className="star" />
            <div>
                <p className="rating">{finalRating}</p>
                <p className="reviews">{`${finalRatingCount} reviews`}</p>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .star {
        color: #fff;
        font-size: 2.5rem;
    }
    .rating {
        font-size: 1.4rem;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
    }
    .reviews {
        font-size: 1.2rem;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        color: white;
    }
`;
