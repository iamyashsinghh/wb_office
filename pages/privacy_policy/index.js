import styled from "styled-components";
import Header from "@/components/layout.js/Header";
import Image from "next/image";

export default function Page() {
  return (
    <Wrapper>
      <Header />

      <div className="section">
        <section className="container">
          <article className="header-article">
            <div className="contant">
              <h2 className="title"> Privacy Policy </h2>
              <p className="desc">
                As valuable customers, our Privacy Policies are constantly being
                used by you. Therefore, it is important that you have complete
                transparency as to how we collect the Intel and use it
                accordingly. We also reserved the right to alter or revise these
                Privacy policies by updating Weddingbanquets.in page.
              </p>
            </div>
            <div className="privacy-vector-image">
              <Image
                src={"/common/p2.jpg"}
                fill
                sizes="(100vw)"
                alt="privacy"
              />
            </div>
          </article>

          <article>
            <div className="contant">
              <h2 className="title">
                The collection and usage of distinguishable Intel and other
                important information:
              </h2>
              <p className="desc">
                Some of our information, present at our platform is collected
                from you. Instructions such as your name, address, email id,
                Social media handle, phone number and so on, may be required to
                be filled in for you to unlock all the beneficial requirements.
                Filling in these details filter the content adhering to your
                specific needs and requirements. You can surely access our
                website without having filled in the aforementioned details.
                Some of the information are tracked through category selections,
                omissions and so on. This information is used, to provide you
                with a podium that is extremely user friendly and serves your
                personalised requirements and services. These Intel is inclusive
                of the date and time of visiting our website, the browser type,
                IP address and so on. The further information is collected via
                software mechanisms like using cookies. Small files that enable
                to store the user's information in their computers are known as
                Cookies, and can be categorized as permanent or temporary. They
                do not hold back any sort of personally identifiable Intel.
                These Cookies provide easier accessibility to your account by
                automated login, without having to enter your password every
                time you want to access the website. You can surely decline the
                use of cookies, even though it shall debar you from basic
                facilities. Some third party cookies or file may be encountered
                with, we just want to inform that we are not responsible for
                them as we do not control them.
              </p>

              <p className="desc">
                We are not entitled to notify you incase you personally contact
                us, or your information has been sent to us via some third
                party, we shall then collect this information. Personal
                information collected are used for purposes of marketing, and
                you can surely opt out of it. Other purposes include:
                troubleshooting, better and safer services, completely
                understanding of the customer’s interest, offer related Intel,
                information regarding our products, services as per your
                requirements, detecting and dismissing of errors, avoiding
                fraudulent or criminal activities. Other affiliates may updates
                with your personal information in order to provide you with
                services. But those affiliates may or may not market to you. If
                something involves legal processing or law related issues, we
                shall share your personal information. To keep up to your
                requirements, your personal information will be shared with our
                business associates.
              </p>
            </div>
          </article>

          <article>
            <div className="contant">
              <h2 className="title">Other website links:</h2>
              <p className="desc">
                WeddingBabquets.in is linked with other entities, and we cannot
                be help responsible for their content or their privacy policies.
                The users should only access to these links at their own
                subjected risks. We also recommend strongly for you to go
                through their Privacy Policies and Terms of Use if needed.
              </p>
            </div>
          </article>
          <article>
            <div className="contant">
              <h2 className="title">Consent:</h2>
              <p className="desc">
                When you access the weddingbanquets.in Website or make an
                account by sharing your personal details, you are automatically
                presumed to have reviewed our policies and terms and hence are
                in agreement.
              </p>
            </div>
          </article>
          <article className="footer-article">
            <div className="contant">
              <h2 className="title">Governing Rule:</h2>
              <p className="desc">
                The privacy Policy of weddingbanquets.in comes under the
                jurisdiction of India. We strongly adhere to the laws of the
                Indian government.
              </p>
            </div>
            <div className="contant">
              <h2 className="title">Contact:</h2>
              <p className="desc">
                If you have any further questions or require information, you
                can connect with us via mail.
              </p>
            </div>
          </article>
        </section>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  article {
    /* display: flex; */
    .title {
      font-size: 2.5rem;
      font-family: Montserrat;
      font-weight: 500;
      color: var(--primary-color);
      text-transform: capitalize;
    }

    .desc {
      color: var(--para);
      font-family: "Poppins";
      font-size: 1.7rem;
      /* letter-spacing: 2px; */
      line-height: 1.9;
      word-spacing: 2px;
      font-weight: 500;
    }
    .contant {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      padding: 3rem;
    }
  }

  .header-article {
    /* border: 1px solid red; */
    display: flex;

    .title {
      font-size: 3rem;
      font-weight: 600;
    }

    .desc {
      font-size: 1.8rem;
      font-weight: 500;
    }

    .privacy-vector-image {
      /* border: 1px solid black; */
      position: relative;
      width: 100%;
      height: 30rem;
    }
  }

  .footer-article {
    display: flex;
  }

  @media (max-width: 900px) {
    .header-article {
      flex-direction: column-reverse;
    }
    .privacy-vector-image {
      max-width: 30rem;
      margin: auto;
    }
    .footer-article {
      flex-direction: column;
    }
  }
`;
