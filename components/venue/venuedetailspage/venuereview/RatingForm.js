import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Swal from 'sweetalert2'
import ReCAPTCHA from "react-google-recaptcha";


const RatingForm = ({venue_id, onCloseOffCanvas }) => {
  const onRecaptchaChange = (value) => {
    setrecaptcha(value);
  };
  const [rating, setRating] = useState(5);
  const [recaptcha, setrecaptcha] = useState(null);

  let product_id = venue_id;
  let product_for = 'venue';
  let status = 0;


  const saveRatingAjax = async (values) => {
      let data = { ...values, rating ,product_id, product_for, status,recaptcha }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LEAD_SERVER_DOMAIN}/review-data`, {
          
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log('weddingbanquets.in');
        if (response.ok) {
            onCloseOffCanvas();
            Swal.fire({
                title: 'Saved',
                text: 'Verification Pending',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
        } else {
            console.error("Failed to save rating and form data");
        }
    } catch (error) {
        console.error("Error while saving rating and form data", error);
    }
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".fsrrw-star");
    const handleMouseOver = (index) => {
      stars.forEach((star, i) => {
        const svgId = i > index ? "star-blank" : "star-filled";
        star.firstChild.setAttribute("xlink:href", `#${svgId}`);
      });
    };

    const handleMouseDown = (index) => {
      setRating(index + 1);
    };

    const handleMouseLeave = () => {
      stars.forEach((star, i) => {
        const svgId =
          i + 1 > rating || rating === 0 ? "star-blank" : "star-filled";
        star.firstChild.setAttribute("xlink:href", `#${svgId}`);
      });
    };
    

    stars.forEach((star, index) => {
      star.addEventListener("mouseover", () => handleMouseOver(index));
      star.addEventListener("mousedown", () => handleMouseDown(index));
    });

    const starWrapper = document.querySelector(".fsrrw-star-wrapper");
    starWrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Cleanup event listeners
      stars.forEach((star, index) => {
        star.removeEventListener("mouseover", () => handleMouseOver(index));
        star.removeEventListener("mousedown", () => handleMouseDown(index));
      });

      starWrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rating]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    comment: Yup.string().required("Comment is required"),
    number: Yup.string().required("Number is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", comment: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        saveRatingAjax(values);
      }}
    >
      <StyledForm>
      <svg style={{ display: 'none', enableBackground: 'new 0 0 50 50' }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" xmlSpace="preserve">
  <symbol id="star-blank" viewBox="0 0 50 50">
    <path fill="gold" d="M50,19.4l-17.3-2.5L25,1.2l-7.7,15.7L0,19.4l12.5,12.2l-3,17.2L25,40.7l15.5,8.1l-3-17.2L50,19.4z M37.5,44.7
    L25,38.2l-12.5,6.6l2.4-13.9L4.8,20.9l14-2L25,6.2l6.3,12.7l14,2l-10.1,9.9L37.5,44.7z"/>
  </symbol>
  <symbol id="star-filled" viewBox="0 0 50 50">
    <polygon fill="gold" points="50,19.4 32.7,16.9 25,1.2 17.3,16.9 0,19.4 12.5,31.6 9.5,48.8 25,40.7 40.5,48.8 37.5,31.6 "/>
  </symbol>
  <symbol id="star-half" viewBox="0 0 50 50">
    <path fill="gold" d="M50,19.4l-17.3-2.5L25,1.2l-7.7,15.7L0,19.4l12.5,12.2l-3,17.2L25,40.7l15.5,8.1l-3-17.2L50,19.4z M37.5,44.7
    L25,38.2l0,0V6.2l0,0l6.3,12.7l14,2l-10.1,9.9L37.5,44.7z"/>
  </symbol>
</svg>
        <Section className="fsrrw-star-wrapper">
          <svg className="fsrrw-star">
            <use xlinkHref="#star-filled" />
          </svg>
          <svg className="fsrrw-star">
            <use xlinkHref="#star-filled" />
          </svg>
          <svg className="fsrrw-star">
            <use xlinkHref="#star-filled" />
          </svg>
          <svg className="fsrrw-star">
            <use xlinkHref="#star-filled" />
          </svg>
          <svg className="fsrrw-star">
            <use xlinkHref="#star-filled" />
          </svg>
        </Section>

        <ReviewForm>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <div className="text-err">
            <ErrorMessage name="name" />
            </div>
          </div>

          <div>
            <label htmlFor="number">Number:</label>
            <Field type="text" id="number" name="number" />
            <div className="text-err">
             <ErrorMessage name="number" />
            </div>
          </div>

          <div>
            <label htmlFor="comment">Comment:</label>
            <Field as="textarea" id="comment" name="comment" />
            <div className="text-err">
            <ErrorMessage name="comment"/>
            </div>
          </div>

          
        </ReviewForm>
        <ReCAPTCHA sitekey="6LfVFGcpAAAAAO606P0XnI79hWitIwuF4HPhB_nR" onChange={onRecaptchaChange} />
        {recaptcha===null ?( <span className="error-text">Please Fill ReCAPTCHA</span>):(<></> )}
        <br></br>
        <br></br>

        <StyledButton type="submit"  disabled={recaptcha===null}>Submit</StyledButton>
      </StyledForm>
    </Formik>
  );
};
const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const Section = styled.div`
  background-color: #fff;
  svg.fsrrw-star {
    width: 35px;
    height: 35px;
    display: inline-block;
    cursor: pointer;
  }
`;

const ReviewForm = styled.div`
  label {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    display: block;
    color: #000;
    margin-bottom: 2px;
  }

  input,
  textarea {    
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  textarea {  
    height: 150px;
    }

  .text-err{
    color: red;
    margin-bottom:3px;
    font-size:12px;
  }

//   div {
//     color: red;
//   }
`;

const StyledButton = styled.button`
background: var(--primary-color);
color: white;
font-size: 1.8rem;
font-family: "Poppins";
font-weight: 500;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default RatingForm;
