import styled from "styled-components";
import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";
import { useState, useEffect } from "react";
import leadGen from "@/lib/request/leadgen/leadGen";
import EncryprKey from "../EncryprKey";
import ReCAPTCHA from "react-google-recaptcha";

export default function HaveUsCallYou() {
  const [recaptcha, setrecaptcha] = useState(null);

  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN_API}/get-csrf`
      );
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {}
  };
  function handerInputNumber(e) {
    if (e.target.value.length <= 10) {
      setNumber(e.target.value);
    }
  }
  const onRecaptchaChange = (value) => {
    setrecaptcha(value);
  };

  const handleSubmit = async () => {
    try {
      if (number.length !== 10) {
        return;
      }
      setIsLoading(true);

      const response = await leadGen({
        mobile: number,
        token: csrfToken,
        recaptcha: recaptcha,
      });
      if (response.status) {
        alert(response.msg);
        setNumber("");
        setrecaptcha(null);
      } else {
        alert(response.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="section section-call-you">
      <div className="container">
        <div className="call-content-container">
          <div className="header">
            <h2>Should we call you</h2>
            <p>
              Please provide us with your contact number (10 digit mobile
              number)
            </p>
          </div>
          <div className="number-form-container">
            <div className="verification-container">
              <div className="input-container">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/flag.png"}
                        fill={true}
                        alt="flag"
                        sizes="()"
                      />
                    </div>
                  </span>
                  +91
                  <AiFillCaretDown className="down-icon" />
                </div>
                <input
                  name="number"
                  type="number"
                  placeholder="Phone number"
                  value={number}
                  onChange={(e) => handerInputNumber(e)}
                />
              </div>
              <div className="captcha-container">
                <CustomReCAPTCHA
                  sitekey="6LfVFGcpAAAAAO606P0XnI79hWitIwuF4HPhB_nR"
                  onChange={onRecaptchaChange}
                />
                {recaptcha === null ? (
                  <span className="error-text">Please Fill ReCAPTCHA</span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="btn-container">
              <button
                className="btn"
                disabled={recaptcha === null}
                onClick={handleSubmit}
              >
                {isLoading ? "Submiting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <div className="vector-img-container">
          <div className="vector-img">
            <Image
              src={"/icons/call.png"}
              fill
              sizes="(100vw)"
              alt="have us call you"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const CustomReCAPTCHA = styled(ReCAPTCHA)`
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
`;

const Wrapper = styled.div`
  /* border: 1px solid black; */
  padding: 2rem !important;
  background-color: var(--bg-color);

  .container {
    background-color: #ffdce6;
    border-radius: 1rem;
    padding: 3rem;
    display: flex;
    justify-content: space-between;
  }

  .captcha-container {
    display: flex;
    flex-direction: column;
    ${"" /* gap: 0.1rem; */}
  }

  .verification-container {
    display: flex;
    gap: 2rem;
    height: 7rem;
  }
  .call-content-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h2 {
        color: var(--primary-color);
        font-size: 3rem;
        font-family: Montserrat;
        font-weight: 700;
        text-transform: capitalize;
      }
      P {
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
      }
    }

    .number-form-container {
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      gap: 3rem;
      /* justify-content: center; */
      .input-container {
        display: flex;
        /* align-items: center; */
        /* justify-content: center; */
        border: 1px solid var(--secoundary-color);
        border-radius: 0.3rem;
        overflow: hidden;

        .country-code {
          padding: 10px 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--secoundary-color);

          color: white;
          font-family: "Poppins";
          font-weight: 400;
          font-size: 1.6rem;

          span {
            margin: 0px 5px;
            .flag-box {
              position: relative;
              width: 20px;
              height: 15px;
            }
          }

          .down-icon {
            font-size: 1.7rem;
            padding-left: 0.3rem;
            color: white;
          }
        }
        input {
          outline: none;
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 400;
          padding: 0.3px 0.9rem;
        }
        //Hide the arrow fron the number input
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      .btn-container {
        .btn {
          border: none;
          font-size: 1.8rem;
          background: var(--secoundary-color);
          color: white;
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 500;
          padding: 10px;
          width: 90%;
          cursor: pointer;
          border-radius: 0.3rem;
        }
      }
    }
  }

  .vector-img-container {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    .vector-img {
      /* border: 1px solid red; */
      position: relative;
      width: 40rem;
      height: 25rem;
    }
  }

  @media (max-width: 700px) {
    .container {
      flex-direction: column-reverse;
      gap: 5rem;
    }
    .call-content-container {
      justify-content: center;
      /* align-items: center; */
    }
  }

  @media (max-width: 500px) {
    .number-form-container {
      flex-direction: column;
      /* justify-content: start;
        align-items: start; */
    }
    input {
      width: 100% !important;
    }
    .btn {
      width: 100% !important;
    }
  }
`;
