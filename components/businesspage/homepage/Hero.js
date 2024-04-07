import styled from "styled-components";
import Image from "next/image";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";

export default function Hero() {

    return (
        <Wrapper className="section">
            <div className="hero-container">
                <div className="hero-content">
                    <Link href={"/"}>
                        <div className="logo-container">
                            <Image
                                src={'/logo.png'}
                                fill={true}
                                sizes="(100vw)"
                                alt="logo"
                            />

                        </div>
                    </Link>
                    <h2 className="hero-title">TAKE YOUR BUSINESS TO NEXT LEVEL WITH WB </h2>
                    <ul className="hero-lists">
                        <li className="hero-list">Promote your services on our best in business site.</li>
                        <li className="hero-list"> Commute to local engaged couples and book more weddings</li>
                        <li className="hero-list"> Trusted by over 10,000 professionals. </li>
                    </ul>
                    <Link href={"/business/signup"}><ButtonDark>Signup</ButtonDark></Link>

                </div>
                <div className="hero-banner">
                    <Image
                        src={"/business/vendor_hero.png"}
                        alt="hero-img"
                        fill={true}
                        sizes="(100vw)"
                    />

                </div>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`

/* background-color: var(--bg-color); */
background-color:rgb(239,239,239);


.hero-container{
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.logo-container{
    width: 25rem;
    height: 50px;
    cursor: pointer;
    position: relative;
    /* margin: 4rem auto; */
    /* border: 1px solid red; */
}

.hero-content{
    /* border: 1px solid red; */
    padding: 5rem 8rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    max-width: 80rem;

    .hero-title{
        color: var(--primary-color);
        font-size: 3rem;
        font-family: "Montserrat";
        font-weight: 600;

    }
    .hero-lists{
        color: var(--para);
        display: flex;
        flex-direction: column;
        gap: .5rem;

        .hero-list{
            list-style:disc !important;
            font-size: 1.8rem;
            font-family: "Poppins";
            font-weight: 400;
        }
    }

}
.hero-banner{
    height: 400px;
    /* border: 2px solid blue; */
    position: relative;

}

@media (max-width:1000px) {
    .hero-container{
    display: grid;
    grid-template-columns: 1fr;

}

.hero-banner{
    height: 300px;
    /* border: 2px solid blue; */
    position: relative;

}
    
}

@media (max-width:800px) {

.hero-content{
    /* border: 1px solid red; */
    padding: 5rem;
}
    
    
}
`