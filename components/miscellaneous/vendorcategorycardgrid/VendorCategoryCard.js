// import Image from "next/image";
import {BsArrowRight} from 'react-icons/bs'
import styled from "styled-components";
import Link from 'next/link';

export default function VendorCategoryCard({bgColor,title,desc,url}) {


    return (
        <Wrapper color={bgColor}>
            <div className="content">
                <h2 className="title">{title}</h2>
                <p>{desc && desc}</p>
            </div>
            <div className="btn-container">
                <Link href={url} className="btn">Explore  <BsArrowRight className='icon'/></Link>
               
            </div>
            {/* <div className="img-container">
                <Image
                    src={'/bannar.png'}
                    fill
                    alt="img"
                    sizes="(100vw)"
                />

            </div> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
/* border: 1px solid red; */
background-color: ${(props)=>props?.color};
display: flex;
height: 120px;
justify-content: space-between;
.content{
    /* border: 1px solid black;     */
    /* width: 60%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    font-family: "Poppins";

    .title{
        font-size: 1.8rem;


    }
    p{
        font-family: "Poppins";
        font-weight: 400;
        font-size: 1.5rem;
        color: var(--para);
    }

}
.btn-container{
    margin-right:3rem;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;

    .btn{
        background-color: transparent;
        border: 1px solid var(--primary-color);
        /* border-radius: 5rem; */
        border: none;
        font-size: 1.7rem;
        font-family: "Poppins";
        color: var(--primary-color);
        padding: .2rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        .icon{
            color: var(--primary-color);
            font-size: 2rem;
            transition: all .3s linear;

        }

        &:hover{
            .icon{
                transform:translateX(5px);
            }
        }

    }



}
.img-container{
    border: 1px solid black;
    position: relative;
    width: 40%;
    height: 100%;
    overflow: hidden;
    /* border-radius:9% 10% 10% 9% / 48% 0% 0% 53%  ; */
    clip-path: ellipse(99% 140px at 100% 50%);


}


@media (max-width:500px) {
    height: 100px;
    
    .img-container{
        width: 50%;
    }
}

`