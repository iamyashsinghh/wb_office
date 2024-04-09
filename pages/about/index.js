
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
                        <p className="desc">Wedding Banquets is one of India’s largest and most trusted Wedding Company, connecting wed-to-be couples with local wedding specialists, including Wedding Venues and Vendors around Delhi NCR. Millions of couples worldwide can search, compare, and book from a directory of over Pan India 50,000 Venues and vendors. Wedding banquets disrupt the event management industry by providing versatility for discovering and booking venues and vendors.</p>
                        <p className="desc">Our team at Wedding Banquets works around the clock to ensure that every event booked through Wedding Banquets upholds the highest professional quality. Wedding management will be calm and uncomplicated when you choose us as your wedding planners. </p>
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
                          Why Wedding Banquets?
                        </h2>
                    </div>
                </article>

                <article>
                    <div className="contant">

                        <h2 className="title">
                            1. Wide Range of venues
                        </h2>

                        <p className="desc">
                        Wedding Banquets give you a wide range of banquet halls that offer cost-effective plans for the event. We short-listed  50,000 venues on our website that are WB-assured and suitable for all occasions and events. You can pick and book the venue of your choice from wedding banquets, that matches your requirements and is in proximity to your locality. 
                        </p>
                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            2. Professional Vendors
                        </h2>

                        <p className="desc">
                        We are determined to give you a smooth and fast-going experience of wedding arrangements. Wedding Banquets has an abundance of professional vendors that will provide 100% client satisfaction services. They are the experts who have years and years of experience and practice in making weddings unforgettable for hosts, guests, and even the stars. Thus we say we are the one-stop solution for all your wedding itinerary.
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            3. Vigilant Venue managers
                        </h2>

                        <p className="desc">
                        Management is the key point of every wedding. Proper, organized, and vigilant management makes a wedding perfect. Hence, to take this fragile and major responsibility, our managers are present at the wedding venues for you. They are those people who are proficient in managing events in any circumstances. Our venue managers will be present at the banquet halls to give you guided visits and won’t leave your side until they give your wedding their beautiful conclusion. 
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            4. Informative Social media and blogs
                        </h2>

                        <p className="desc">
                        If you are looking for wedding aesthetics like decor, trendy mandap setups, entrance ideas, and more, you should check our social media handles and blogs section. There, you will get lots of wedding inspiration for dresses for the bride and groom, decoration ideas, and entertainment ideas for your wedding event. You will also be updated with the celebrities and famous intellectuals' wedding news only at weddingbanquets.in 
                        </p>


                    </div>
                </article>
                <article>
                    <div className="contant">

                        <h2 className="title">
                            5. Attentive customer support
                        </h2>

                        <p className="desc">
                        It's convenient to have someone who can hear your problems at any time. We can’t disrupt anyone’s individual life, but as your wedding planners, it is our duty to hear you whenever you want. Wedding Banquets has attentive customer support (relationship managers) who will respond to your query or any wedding management problem within 24 hours. Our toll-free number line is available 24/7 but you can also send your queries or complaints on WhatsApp.  
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