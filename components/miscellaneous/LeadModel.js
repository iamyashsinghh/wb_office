import styled, { css } from "styled-components";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "@/context/MyContext";
import { useEffect, useState } from "react";
import { Spinner1 } from "@/styles/components/spinner";
import EncryprKey from "./EncryprKey";
import ReCAPTCHA from "react-google-recaptcha";

export default function LeadModel() {
  const today = new Date().toISOString().split("T")[0];
  const { leadFormData, isLeadsModelOpen, setIsLeadsModelOpen } =
    useGlobalContext();
  const [recaptcha, setrecaptcha] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState({
    phoneNumber: "",
    name: "",
  });

  useEffect(() => {
    if (isLeadsModelOpen) {
      conversionHandler("click");
      fetchCsrfToken();
    } else {
      console.log("Lead model close");
    }
  }, [isLeadsModelOpen]);

  async function conversionHandler(type) {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/click_conversion_handle`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...leadFormData, type: type }),
      });

      response = await response.json();
      // console.log(response);
      if (response.success) {
        // alert("success")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN_API}/get-csrf`
      );
      const data = await response.json();
      setCsrfToken(data.csrfToken);
      // console.log(data.csrfToken);
    } catch (error) {}
  };
  const onRecaptchaChange = (value) => {
    setrecaptcha(value);
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value;

    setPhoneNumber(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber:
        value.length === 10
          ? parseInt(value, 10) >= 6000000000
            ? ""
            : "Phone number must be greater than or equal to 6000000000"
          : "Phone number must be 10 digits",
    }));
  };

  const handleNameInput = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: value.length <= 200 ? "" : "Name must be 200 characters or less",
    }));
  };

  const hideCard = () => {
    setIsLeadsModelOpen(false);
    setIsSent(false);
    setPhoneNumber("");
    setName("");
    setErrors({
      phoneNumber: "",
      name: "",
    });
  };
  const closeModal = () => {
    setIsLeadsModelOpen(false);
    setIsSent(false);
  };

  async function submitHandler() {
    try {
      if (errors.phoneNumber || errors.name) {
        return;
      }
      setIsLoading(true);

      const url = `${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN}/venue-lead`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          preference: leadFormData.venue_slug,
          name: name,
          token: csrfToken,
          recaptcha: recaptcha,
        }),
      });
      response = await response.json();

      if (response.status === true) {
        setIsSent(true);
        setrecaptcha(null);
        conversionHandler("conversion");
        setTimeout(closeModal, 3000);
      } else {
        // console.log(response.msg)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Wrapper show={isLeadsModelOpen}>
      <div className="discont-container" tabIndex="1">
        <AiOutlineClose className="cancel-icon" onClick={hideCard} />
        <div className="content">
          {isSent ? (
            <Image
              src="/common/namaste.png"
              alt="thank you"
              width={150}
              height={150}
            />
          ) : (
            <Image
              src="/common/discount.png"
              alt="An example image"
              width={130}
              height={130}
            />
          )}
          {isSent ? (
            <h3 className="title"> Thank You</h3>
          ) : (
            <h3 className="title"> Send Enquiry</h3>
          )}
          <h2 className="discount-heading">{!isSent && "get upto 40% off"}</h2>
          <p className="discount-text">
            {isSent
              ? "Our team will reach you soon with best price.."
              : "Share your mobile number to see the prices"}
          </p>
          {!isSent && (
            <>
              <div className="discount-form">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/name.png"}
                        fill={true}
                        alt="flag"
                        sizes="()"
                      />
                    </div>
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="discount-form">
                <div className="country-code">
                  <span>
                    <div className="flag-box">
                      <Image
                        src={"/icons/calender.png"}
                        fill={true}
                        alt="calender"
                        sizes="()"
                      />
                    </div>
                  </span>
                </div>
                <input
                  type="date"
                  className="input"
                  name="date"
                  min={today}
                  placeholder="Event Date"
                  onClick={(e) => e.target.showPicker()}
                />
              </div>
              <div className="discount-form">
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
                </div>
                <input
                  type="number"
                  name="phone-number"
                  className={`input ${errors.phoneNumber ? "error" : ""}`}
                  placeholder="Phone Number"
                  max={10}
                  value={phoneNumber}
                  onChange={handlePhoneInput}
                />
              </div>
              {errors.phoneNumber && (
                <span className="error-text">{errors.phoneNumber}</span>
              )}
              <ReCAPTCHA
                sitekey="6LfVFGcpAAAAAO606P0XnI79hWitIwuF4HPhB_nR"
                onChange={onRecaptchaChange}
              />
            </>
          )}
          {recaptcha === null ? (
            <span className="error-text">Please Fill ReCAPTCHA</span>
          ) : (
            <></>
          )}
          {isSent ? (
            <button className="discount-btn" onClick={hideCard}>
              CLOSE
            </button>
          ) : (
            <button
              className="discount-btn"
              disabled={recaptcha === null}
              onClick={submitHandler}
            >
              {isLoading ? <Spinner1 /> : "SUBMIT"}
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  transition: all 0.3s linear;
  opacity: 1;
  visibility: visible;

  ${({ show }) =>
    !show &&
    css`
      opacity: 0;
      visibility: hidden;
    `}

  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .discont-container {
    transition: all 0.3s linear;
    transform: scale(0.5);

    ${({ show }) =>
      show &&
      css`
        transform: scale(1);
      `}

    max-width: 45rem;
    min-width: 45rem;
    position: relative;
    background-color: white;
    z-index: 9;
    border-radius: 5px;
    box-shadow: 0 0 10px 2000px rgba(0, 0, 0, 0.5);
    padding: 4rem 3rem 5rem 3rem;

    .cancel-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 3rem;
      color: var(--primary-color);
      cursor: pointer;
    }

    .title {
      color: var(--primary-color);
      font-size: 2.5rem;
      font-family: Montserrat;
      font-weight: 700;
      text-transform: capitalize;
    }

    .content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;

      .discount-heading {
        color: var(--primary-color);
        font-size: 3rem;
        font-family: Montserrat;
        font-weight: 700;
        text-transform: capitalize;
      }

      .discount-text {
        font-size: 1.6rem;
        color: var(--para);
        text-align: center;
        font-family: "Poppins";
      }

      .discount-form {
        display: flex;
        width: 100%;
        border-radius: 0.3rem;
        border: 1px solid var(--primary-color);

        .country-code {
          padding: 10px 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary-color);
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

        .input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 400;
          padding: 5px 0.9rem;
          background-color: white;
        }

        input[type="date"] {
          display: block;
          -webkit-appearance: textfield;
          -moz-appearance: textfield;
          min-height: 1.2em;
        }

        .date-picker {
          border: none;
          outline: none;
          width: 100%;
          border: 2px solid red;
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 400;
          padding: 5px 0.9rem;
          background-color: white;
        }
      }

      .discount-btn {
        background-color: var(--primary-color);
        white-space: nowrap;
        color: white;
        font-size: 2rem;
        border: none;
        width: 100%;
        padding: 1rem 3rem;
        border-radius: 0.3rem;
        cursor: pointer;
        text-transform: uppercase;
      }
    }
  }

  // Hide the arrow from the number input
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
