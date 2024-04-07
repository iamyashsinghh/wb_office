import Image from "next/image";
import styled from "styled-components";
import { AiFillPhone, AiFillLock } from "react-icons/ai";
import { ButtonDark } from "@/styles/components/buttons";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner1 } from "@/styles/components/spinner";
import { setCookie } from "nookies";

export default function Login() {
  const router = useRouter();

  // setCookie(null, '@testing', JSON.stringify({ "token": `123` }), {
  //     maxAge: 86400,
  //     path: '/',
  // })

  const [isLoading, setIsLoading] = useState(false);

  const [isSent, setIsSent] = useState(false);
  const [msg, setMsg] = useState("");

  const [loginCredential, setLoginCredential] = useState({
    phone: "",
    otp_code: "",
  });

  const formInputHandler = (e) => {
    setLoginCredential({ ...loginCredential, [e.target.name]: e.target.value });
  };

  async function sendOTPHandler() {
    if (!loginCredential?.phone || loginCredential?.phone.length != 10) {
      setMsg("Invalid number");
    } else {
      setMsg("");
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/login`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: loginCredential.phone }),
      });
      response = await response.json();
      if (response.success) {
        setIsLoading(false);
        setIsSent(response.success === true);
        setMsg("OTP sent");
      } else {
        setIsLoading(false);
        // console.log(response)
        setMsg("No record found, check your number");
      }
    }
    setIsLoading(false);
  }

  async function loginHandler() {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/login_process`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: loginCredential.phone,
          otp_code: loginCredential.otp_code,
        }),
      });
      response = await response.json();
      if (response.success) {
        // alert(response.token)

        //Setting token to the cookies
        setCookie(
          null,
          "@VendorApp",
          JSON.stringify({ token: `${response.token}` }),
          {
            maxAge: 86400,
            path: "/",
          }
        );

        setIsSent(response.success === true);
        setIsLoading(false);
        localStorage.setItem(
          "@VendorApp",
          JSON.stringify({ token: `${response.token}` })
        );

        //Redirecting to the dashboard page.
        router.push("/business/dashboard");
      } else {
        setMsg("Invalid OTP");
      }
      // console.log(response)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper className=" login-section">
      <div className="login-container">
        <div className="login-banner">
          <Image
            src={"/business/1.jpeg"}
            fill={true}
            alt="login image"
            sizes="(100vw)"
          />
        </div>
        <div className="login-form">
          <div className="card">
            <h2 className="title-label"> Vendor Login</h2>
            <div className="form-item">
              <div className="country-code">+91</div>
              <input
                type="number"
                name="phone"
                value={loginCredential.phone}
                onChange={(e) => formInputHandler(e)}
              />
              <AiFillPhone className="placeholder-icon" />
            </div>
            {isSent ? (
              <div className="form-item">
                <input
                  type="number"
                  placeholder="OTP "
                  name="otp_code"
                  value={loginCredential.otp_code}
                  onChange={(e) => formInputHandler(e)}
                  disabled={!isSent}
                />
                <AiFillLock className="placeholder-icon" />
              </div>
            ) : (
              ""
            )}

            <div className="already-have-account">
              <h2>{msg}</h2>
            </div>

            <ButtonDark onClick={isSent ? loginHandler : sendOTPHandler}>
              {isLoading ? <Spinner1 /> : isSent ? "Login" : "Send OTP"}
            </ButtonDark>
            {/* <div className="already-have-account">
                            <h2>Are you a vendor? </h2> <Link href={'/'} className="btn">Vendor Login</Link>
                        </div> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .login-container {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .login-banner {
      position: relative;
      height: 450px;
    }
  }

  .login-form {
    .card {
      max-width: 60rem;
      margin: auto;
      /* border: 1px solid red; */

      background-color: white;
      width: 100%;
      height: 100%;
      padding: 5rem 10rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 2.7rem;

      .title-label {
        color: black;
        font-family: "Montserrat";
        font-size: 2.5rem;
        font-weight: 500;
        text-align: center;
      }

      .label {
        color: var(--para);
        font-family: "Poppins";
        font-size: 1.8rem;
        font-weight: 500;
        text-align: center;
      }

      .form-item {
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
      }
      .country-code {
        font-size: 16px;
        font-weight: 600;
      }
      input,
      select,
      label {
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        color: var(--para);
        width: 95%;
        outline: none;
        padding: 1rem;
        font-weight: 500;
        background-color: transparent;
      }
      .placeholder-icon {
        color: var(--para);
        font-size: 2rem;
      }
      .already-have-account {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--para);
        justify-content: end;

        .btn {
          color: var(--primary-color);
          font-size: 1.8rem;
          font-family: "Poppins";
          font-weight: 500;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .login-container {
      display: flex;
      flex-direction: column-reverse;

      .login-banner {
        position: relative;
        height: 300px;
      }
    }
  }

  @media (max-width: 800px) {
    .card {
      padding: 5rem !important;
    }
  }
`;
