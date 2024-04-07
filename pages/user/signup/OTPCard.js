
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ButtonDark } from '@/styles/components/buttons';
import { MdOutlineCancel } from 'react-icons/md'
import { Spinner1 } from '@/styles/components/spinner';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';


export default function OTPCard({ data }) {
  // console.log(data)
  const values  = data?.values || {};


  const router = useRouter();

  const [otp, setOtp] = useState(Array(6).fill('')); // Initializing the OTP array with 6 empty strings
  const inputs = useRef([]);
  const [isLoading, setIsLoading] = useState(false)

  const focusNextInput = (currentIndex) => {
    if (currentIndex < 5) {
      inputs.current[currentIndex + 1].focus();
    }
  };

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    if (/^[0-9]{1}$/.test(value)) {
      setOtp(prevOtp => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      focusNextInput(index);
    } else if (value === '') {
      setOtp(prevOtp => {
        const newOtp = [...prevOtp];
        newOtp[index] = '';
        return newOtp;
      });
    }
  };

  const handleKeyDown = (index, event) => {
    // Check if the pressed key is "Backspace"
    if (event.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        // Focus the previous input and clear its value
        inputs.current[index - 1].focus();
      }
    }
  };

  const closeOTPCard = () => {
    data.setShowOTPCard(false);
  }

  async function handleSubmit() {
    if (otp.join("").length != 6) {
      return;
    }

    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/user/signup_process`;

      let response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ ...values, otp_code: otp.join("") })
      })
      // console.log(response)

      response = await response.json();

      if (response.success) {

        setCookie(null, '@UserApp', JSON.stringify({ "token": `${response.token}` }), {
          maxAge: 86400,
          path: '/',
        })

        //Adding user details to the context
        data.setLoggedUser(response.user);

        //adding user details local storage
        localStorage.setItem("@UserApp", JSON.stringify(response.user))

        router.push('/user/profile');

        setIsLoading(false)
        //Setting token to the cookies
        setShowOTPCard(false);





        // alert("Successfully ")
        // formik.resetForm();



      } else {
        alert(response.message)
      }


    } catch (error) {
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }
  return (
    <Section show={data?.showOTPCard || false}>
      <Wrapper>
        <h2>Enter OTP</h2>

        <div>
          {otp.map((digit, index) => (
            <Input
            name='otp'
              key={index}
              value={digit}
              onChange={event => handleInputChange(index, event)}
              onKeyDown={event => handleKeyDown(index, event)}
              ref={ref => inputs.current[index] = ref}
              maxLength="1"
            />
          ))}
        </div>
        <ButtonDark onClick={handleSubmit}>{isLoading ? <Spinner1 /> : "Submit"}</ButtonDark>
        <p className='otp-number'>OTP sent to : {values?.email}</p>

        <MdOutlineCancel className='cancel-icon' onClick={closeOTPCard} />
      </Wrapper>
    </Section>


  );

};


const Input = styled.input`
  width: 35px;
  height: 35px;
  margin: 0 5px;
  text-align: center;
  border: 1px solid #ccc;
  /* font-size: 16px; */
  font-size: 1.8rem;
  font-family: "Poppins";
  font-weight: 500;
`;

const Wrapper = styled.div`      



padding:5rem  2rem;
max-width: 40rem;
border: 2px solid black;
background-color: var(--bg-color);
display: flex;
align-items: center;
justify-content: center;
z-index: 99;
opacity: 1;
flex-direction: column;
gap: 2rem;
box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
border-radius: 1rem;
position: relative;


    

.cancel-icon{
    position: absolute;
    top:10px;
    right:10px ;
    font-size: 2rem;
    cursor: pointer;
}
h2{
    font-size: 2rem;
    font-family: "Montserrat";
    font-weight: 500;
}
.otp-number{
  color: green;
  font-size: 1.7rem;
  font-family:"Poppins";
  font-weight: 500;
}
button{

}


`

const Section = styled.section`

display: none;
opacity: 0;
visibility: hidden;

width: 100%;
height: 100%;
align-items: center;
justify-content: center;
flex-wrap: wrap;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 2;
/* background-color: black;
opacity:.5 ; */

${({ show }) =>
    show &&
    css`
    opacity: 1 !important;
    visibility: visible !important; 
    display: flex !important;

  `}

`