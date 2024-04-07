
import styled from "styled-components"
import Header from "@/components/layout.js/Header"
import Image from "next/image"

export default function Page() {


    return (<Wrapper>

        <Header />

        <div className="section">

            <section className="container">
                <article className="header-article">
                    <div className="contant">
                        <h2 className="title"> About us </h2>
                        <p className="desc">Wedding Banquets is one of India’s largest and most trusted Wedding Company, connecting engaged couples with local wedding professionals, including Wedding Venues and Vendors around Delhi NCR. Millions of couples from around the world can search, compare and book from a directory of over 500,000 Venues and vendors. Wedding Banquets disrupt the Event Management industry by providing a one-stop destination to discover and book venues and vendors.</p>
                        <p className="desc">Find exclusively curated party packages, order party supplies and party gifts, along with managing events online, whether it is a birthday party, a corporate event, or a wedding. Our Team at Wedding Banquets is working round the clock to make sure that every event booked through Wedding Banquets upholds the highest professional quality.</p>
                    </div>
                    <div className="privacy-vector-image">
                        <Image
                            src={"/common/about.jpg"}
                            fill
                            sizes="(100vw)"
                            alt="img"
                        />
                    </div>
                </article>

                <article>
                    <div className="contant">

                        <h2 className="title">
                            WHY ChOOSE US:
                        </h2>
                    </div>
                </article>

                <article>
                    <div className="contant">

                        <h2 className="title">
                            1. Beginning
                        </h2>

                        <p className="desc">
                            Marriage is that the starting—the beginning of the family—and may be a life-long commitment. ”Marriage is that the starting—the beginning of the family—and may be a life-long commitment. It additionally provides a chance to grow in selflessness as you serve your better half and youngsters.
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            2. Purity
                        </h2>

                        <p className="desc">
                            Marriage is meant for purity. We have a tendency to face temptation nearly each minute and from all directions. The bond of marriage offers us the support to defeat temptation by partaking in deep, satisfying.
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            3. Oneness
                        </h2>

                        <p className="desc">
                            When a man and woman unite, the “two become one.” A wedding may be a bond like no different. It offers us a life partner, a teammate, as we have a tendency to move through the challenges of life along.
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            4. Love
                        </h2>

                        <p className="desc">
                            Marriage is meant to mirror our Creator’s unconditional love for us. It’s a love which will invariably be there and can ne'er leave us or desolate us. Once a person and girl love each other flatly, happiness and joy follow.
                        </p>


                    </div>
                </article>

            </section>
        </div>

    </Wrapper>)
}

const Wrapper = styled.div`

article{
    /* display: flex; */
    .title{
        font-size: 2.5rem;
        font-family: Montserrat;
        font-weight: 500;
        color: var(--primary-color);
        text-transform: capitalize;


    }

    .desc{
        color: var(--para);
        font-family: "Poppins";
        font-size: 1.7rem;
        /* letter-spacing: 2px; */
        line-height: 1.9;
        word-spacing: 2px;
        font-weight: 500;


    }
    .contant{
        display: flex;
        flex-direction: column;
        justify-content:center;
        gap:2rem;
        padding: 3rem;
    }
}

.header-article{
    /* border: 1px solid red; */
    display: flex;
    align-items: center;

    .title{
        font-size: 3rem;
        font-weight: 600;
    }

    .desc{
        font-size: 1.8rem;
        font-weight: 500;


    }

    .privacy-vector-image{
        /* border: 1px solid black; */
        position: relative;
        width: 100%;
        height: 30rem;
    }

}

.footer-article{
    display: flex;
}


@media (max-width:900px) {

    .header-article{
        flex-direction: column-reverse;
    }
    .privacy-vector-image{
       
       max-width: 30rem;
       margin: auto;
  
    }
    .footer-article{
        flex-direction: column;
    }
    
}

`