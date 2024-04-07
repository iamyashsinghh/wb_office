import styled from "styled-components";
import Image from "next/image";



export function PhotoCard({ url }) {

    // console.log(url)

    return (<Card>
        {/* <Image
            src={`/photo.jpg`}
            fill
            sizes="()"

        /> */}
        <img src="/photo.jpg" alt="" />
    </Card>)
}


const Card = styled.div`

border: 1px solid red;
display: inline-block;
/* position: relative; */
height: auto;


img{
    width: 100%;
}
`