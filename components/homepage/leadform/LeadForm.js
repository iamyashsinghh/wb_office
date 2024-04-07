import styled from "styled-components";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCalendar, AiFillPhone } from "react-icons/ai";
import { ButtonDark } from "@/styles/components/buttons";
import Heading from "@/components/miscellaneous/Heading";
import { useGlobalContext } from "@/context/MyContext";
import leadGen from "@/lib/request/leadgen/leadGen";
import { Spinner1 } from "@/styles/components/spinner";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

export default function LeadForm() {
  const [recaptcha, setrecaptcha] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const { localities } = useGlobalContext();
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
  const onRecaptchaChange = (value) => {
    setrecaptcha(value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
    },
    validate: async (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name required";
      }
      if (!values.mobile && values.mobile.length !== 10) {
        errors.mobile = "invalid phone";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        values.token = csrfToken;
        values.recaptcha = recaptcha;
        const response = await leadGen(values);
        if (response.status === true) {
          alert(response.msg);
          setrecaptcha(null);
          formik.resetForm();
        } else {
          alert(response.msg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });
  const errorStyle = {
    borderColor: "red",
  };
  return (
    <Wrapper className="section lead-form-section">
      <Heading
        text={"Give life to your Fairytale Wedding with Wedding Banquets"}
      />
      <div className="container">
        <div className="form-container">
          <div className="img-banner">
            <Image
              src={"/common/signup-single.png"}
              fill={true}
              alt="image"
              sizes="(100vw)"
            />
          </div>
          <div className="form">
            <Image
              src={"/common/signup-single-flip.png"}
              fill={true}
              sizes="(100vw)"
              alt="image"
            />
            <div className="form-items">
              <div className="card">
                <h2 className="form-title">
                  Shaadi ki Tyaari, Zimmedari Hamari
                </h2>

                <div
                  className="form-item"
                  style={
                    formik.errors.name && formik.touched.name ? errorStyle : {}
                  }
                >
                  <input
                    type="text"
                    required
                    name="name"
                    {...formik.getFieldProps("name")}
                  />
                  <label htmlFor="name" className="label">
                    Your Full Name
                  </label>
                  <FaUser className="placeholder-icon" />
                </div>
                <div
                  className="form-item"
                  style={
                    formik.errors.mobile && formik.touched.mobile
                      ? errorStyle
                      : {}
                  }
                >
                  <input
                    type="text"
                    id="phone"
                    required
                    name="mobile"
                    {...formik.getFieldProps("mobile")}
                  />
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <AiFillPhone className="placeholder-icon" />
                </div>
                <div className="form-item">
                  {/* <input type="text" min={today} placeholder=' Event Date' onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} name="event_date" /> */}
                  <input
                    type="date"
                    required
                    name=""
                    id="event_date"
                    min={today}
                    onClick={(e) => e.target.showPicker()}
                  />
                  <label htmlFor="event_date" className="label">
                    Event Date
                  </label>
                  {/* <AiFillCalendar className="placeholder-icon" /> */}
                </div>
                <div className="form-item">
                  <div className="dropdown locality-dropdown">
                    <select>
                      <option value="null">Select Location</option>
                      {localities.map((locality) => {
                        return (
                          <option value={locality.slug} key={locality.id}>
                            {locality.name}
                          </option>
                        );
                      })}
                    </select>

                    {/* <label htmlFor="location" className="label">Select Location</label> */}
                  </div>
                  <AiFillCaretDown className="down-arrow" size={15} />
                </div>
                <div>
                  <CustomReCAPTCHA
                    sitekey="6LfVFGcpAAAAAO606P0XnI79hWitIwuF4HPhB_nR"
                    style={{ width: "200px" }}
                    onChange={onRecaptchaChange}
                  />

                  {/* <div className="">
    <h2>I Am</h2>
    <div className="radio">
        <span><label htmlFor="groom">Groom </label><input type="radio" name="iam" id="groom" /></span>
        <span><label htmlFor="bride">Bride </label><input type="radio" name="iam" id="bride" /></span>
        <span><label htmlFor="other">Other </label><input type="radio" name="iam" id="other" /></span>

    </div>
</div> */}
                  {recaptcha === null ? (
                    <span className="error-text">Please Fill ReCAPTCHA</span>
                  ) : (
                    <></>
                  )}
                </div>

                <ButtonDark
                  disabled={recaptcha === null}
                  onClick={formik.handleSubmit}
                >
                  {isLoading ? <Spinner1 /> : "Submit"}
                </ButtonDark>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const CustomReCAPTCHA = styled(ReCAPTCHA)`
  transform: scale(0.77);
  -webkit-transform: scale(0.77);
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
`;

const Wrapper = styled.section`
  /* border: 1px solid red; */
  background-color: var(--bg-color);

  .form-container {
    padding-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 125rem;
    margin: auto;
  }

  .img-banner {
    position: relative;
    height: 630px;
    width: auto;
  }

  .form {
    position: relative;
    height: 630px;

    .form-items {
      padding: 2rem;
      display: flex;
      width: 100%;
      height: 100%;

      position: absolute;
      /* color: white; */
      /* z-index: 111; */

      .card {
        background-color: white;
        width: 100%;
        height: 100%;
        padding: 7rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        /* border:2px solid red; */

        .form-title {
          /* border: 1px solid black ; */
          font-size: 2.2rem;
          font-family: "Poppins";
          text-align: left;
          font-weight: 500;
          color: var(--primary-color);
        }

        .form-item {
          border-bottom: 1px solid black;
          background-color: white;
          /* border: 1px solid red; */
          position: relative;
          display: flex;
          align-items: center;
          /* justify-content: center; */

          .dropdown {
            width: 100%;
          }
        }

        .label {
          transition: all 0.2s linear;
          /* border: 1px solid red; */
          position: absolute;
          padding: 0 1rem;
          font-size: 1.7rem;
          color: var(--para);
          font-family: "Poppins";
          pointer-events: none;
          /* cursor: pointer; */
          left: 0;
          background-color: white;
        }

        input,
        select {
          font-size: 1.8rem;
          font-family: "Poppins";
          border: none;
          color: var(--para);
          width: 100%;
          outline: none;
          padding: 1rem 1rem 1rem 1rem;
          font-weight: 500;
          background-color: transparent;

          &:focus ~ .label,
          &:valid ~ .label {
            transform: translateX(5px) translateY(-20px);
            z-index: 2;
            font-size: 1.4rem;
          }
        }

        input[type="date"]:required:invalid::-webkit-datetime-edit {
          color: transparent;
        }

        input[type="date"]:focus::-webkit-datetime-edit {
          color: black !important;
        }

        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .placeholder-icon {
          color: var(--para);
          font-size: 2rem;
        }

        .radio {
          display: flex;
          gap: 2rem;

          span {
            display: flex;
          }
        }
      }
    }
  }

  @media (max-width: 800px) {
    .form-container {
      grid-template-columns: 1fr;
    }

    .img-banner {
      display: none;
    }

    .card {
      padding: 5rem 3rem !important;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
  }

  @media (max-width: 600px) {
    .form {
      height: 550px;
    }
  }
`;
