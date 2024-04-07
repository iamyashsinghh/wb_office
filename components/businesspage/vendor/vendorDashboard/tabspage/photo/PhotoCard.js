import styled from "styled-components";
import Image from "next/image";

export default function PhotoCard({ url }) {

    // console.log(url)
    return (<Wrapper>

        <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${url}`}
            fill={true}
            sizes="(100vw)"
            alt="image"
        />
    </Wrapper>)
}

const Wrapper = styled.div`

position: relative;
height: 200px;
/* max-width: 35rem; */
/* margin: auto; */

`