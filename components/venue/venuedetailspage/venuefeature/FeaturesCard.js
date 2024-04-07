import styled from "styled-components"
import { CiBaseball } from 'react-icons/ci'
import Image from "next/image"

export default function FeaturesCard({img_url,data}) {


    return (<Div>
        <div className="img_vector">
            <Image
            src={img_url}
            fill
            sizes="(100vw)"
            alt="vector"
            />
        </div>

        <p>{data}</p>


    </Div>)
}

const Div = styled.div`
max-width: 30rem;
box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
padding: 2rem 3rem;

.icon{
    font-size: 13rem;
}

.img_vector{
    position: relative;
    width: 100px;
    height: 100px;
}
p{
    font-size: 1.6rem;
    font-family: "Poppins";
    text-align: center;
    color: var(--para);
}


@media (max-width:600px) {

    padding: 1.5rem;
    gap: 1rem;

    .img_vector{
        position: relative;
        width: 80px;
        height: 80px;
        /* width: 15rem;
        height: 15rem; */
    }
}
`