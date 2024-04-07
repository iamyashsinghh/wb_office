import styled from "styled-components";
import Image from "next/image";

import { AiTwotoneMail, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useFormik } from "formik";
import { Spinner1 } from "@/styles/components/spinner";
import { useState } from "react";
import { setCookie } from "nookies";
import { useGlobalContext } from "@/context/MyContext";
import Header from "@/components/layout.js/Header";
export default function SignInPage() {
  //------------------------------------------------------------
  // If user is already login then redirect to the dashboard
  const router = useRouter();
  const cookies = parseCookies();
  if (cookies["@UserApp"]) {
    router.push("/user/profile");
  }

  // -------------------------------------------------
  const { setLoggedUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors["username"] = "Username required";
      }

      if (!values.password) {
        errors["password"] = "Password required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 digit";
      }

      return errors;
    },
  });

  //Error style
  const errorStyle = {
    borderColor: "red",
  };

  async function handleSubmit(values) {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/user/login`;

      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // console.log(response)

      response = await response.json();
      // console.log(response)
      if (response.success) {
        setCookie(
          null,
          "@UserApp",
          JSON.stringify({ token: `${response.token}` }),
          {
            maxAge: 86400,
            path: "/",
          }
        );

        //Adding user details to the context
        setLoggedUser(response.user);

        //adding user details local storage
        localStorage.setItem("@UserApp", JSON.stringify(response.user));

        router.push("/user/profile");
        setIsLoading(false);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wroung");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Header />
      <div className="container">
        {/* <Link href={"/"}>
                    <div className="logo-container">
                        <Image
                            src={'/logo.png'}
                            alt="logo"
                            fill={true}
                            sizes="()"
                        />

                    </div>
                </Link> */}

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
              alt="image"
              fill={true}
              sizes="(100vw)"
            />
            <div className="form-items">
              <div className="card">
                <div className="card-header">
                  <h2 className="head-title">Log In To Your Accunt</h2>
                  <p className="label">
                    Are you a vendor?{" "}
                    <Link href={"/business"} className="btn">
                      Vendor Login
                    </Link>
                  </p>
                  {/* <p className="label">Dont have an account? <Link href={"/user/signup"} className="btn">Free SignUp</Link></p> */}
                </div>

                <div className="google-facebook-title">
                  <div className="line"></div>
                  <p className="label">Sign in with</p>
                </div>

                <div className="google-facebook">
                  <div className="facebook">
                    <FcGoogle className="google-icon" />
                  </div>
                  <div className="google">
                    <FaFacebook className="facebook-icon" />
                  </div>
                  ;
                </div>
                <p className="label">Or Login with your email</p>

                <div
                  className="form-item"
                  style={
                    formik.errors.username && formik.touched.username
                      ? errorStyle
                      : {}
                  }
                >
                  <input
                    type="text"
                    placeholder="Email or phone "
                    name="username"
                    {...formik.getFieldProps("username")}
                  />
                  <AiTwotoneMail className="placeholder-icon" />
                </div>
                <div
                  className="form-item"
                  style={
                    formik.errors.password && formik.touched.password
                      ? errorStyle
                      : {}
                  }
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password "
                    name="password"
                    {...formik.getFieldProps("password")}
                  />

                  {showPassword ? (
                    <AiFillUnlock
                      className="placeholder-icon"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiFillLock
                      className="placeholder-icon"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>

                <ButtonDark onClick={formik.handleSubmit}>
                  {isLoading ? <Spinner1 /> : "Log in"}
                </ButtonDark>
                <div className="already-have-account">
                  <h2>Dont have an account? </h2>{" "}
                  <Link href={"/user/signup"} className="btn">
                    Free SignUp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: var(--bg-color);

  /* .logo-container{ */
  /* width: 30rem; */
  /* height: 50px; */
  /* cursor: pointer; */
  /* position: relative; */
  /* margin: 4rem auto; */
  /* border: 1px solid red; */
  /* } */

  .form-container {
    display: grid;
    padding: 2rem 0rem 5rem 0;
    grid-template-columns: 1fr 1fr;
    max-width: 120rem;
    margin: auto;
  }

  .img-banner {
    position: relative;
    height: 600px;
    width: auto;
  }

  .form {
    position: relative;
    height: 600px;

    .form-items {
      padding: 2rem;
      display: flex;
      width: 100%;
      height: 100%;
      /* border: 2px solid red; */
      position: absolute;
      /* color: white; */
      /* z-index: 111; */

      .card {
        background-color: white;
        width: 100%;
        height: 100%;
        padding: 5rem 7rem;
        display: flex;
        flex-direction: column;
        gap: 2.7rem;

        .label {
          color: var(--para);
          font-family: "Poppins";
          font-size: 1.8rem;
          font-weight: 500;
          text-align: center;
        }

        .card-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .head-title {
            color: black;
            font-family: "Montserrat";
            font-size: 2.5rem;
            font-weight: 600;
          }
        }
        .google-facebook-title {
          /* border: 1px solid red; */
          margin-top: 5rem;
          position: relative;

          .line {
            border: 1px solid gray;
          }
          p {
            position: absolute;
            background-color: white;
            top: -12px;
            left: 40%;
          }
        }
        .google-facebook {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          background-color: white;

          .google,
          .facebook {
            display: flex;
            align-items: center;
            justify-content: center;
            /* width: 40px;
                    height: 0px; */
            background-color: white;
            z-index: 1;
            cursor: pointer;

            .google-icon,
            .facebook-icon {
              font-size: 3rem;
            }
          }
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

        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .placeholder-icon {
          cursor: pointer;
          color: var(--para);
          font-size: 2rem;
        }

        .form-item {
          border-bottom: 1px solid black;
          display: flex;
          align-items: center;
          /* justify-content: center; */

          .dropdown {
            width: 100%;
          }
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

    .already-have-account {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--para);
      justify-content: center;

      .btn {
        color: var(--primary-color);
        font-size: 1.8rem;
        font-family: "Poppins";
        font-weight: 500;
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
      height: 500px;
    }
  }
`;
