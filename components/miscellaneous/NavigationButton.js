// some-inner-component.jsx
import { React } from "react";
import { useSwiper } from "swiper/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import styled from "styled-components";

export default function NavigationButton({ direction }) {
  const swiper = useSwiper();

  return (
    <Wrapper
      className={`nav-btn ${direction}`}
      direction={direction}
      onClick={
        direction === "left"
          ? () => swiper.slidePrev()
          : () => swiper.slideNext()
      }
    >
      {direction === "left" ? (
        <GrPrevious className="nav-icon" />
      ) : (
        <GrNext className="nav-icon" />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 2rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: absolute;
  top: 40%;
  ${(props) => (props.direction === "left" ? "left" : "right")}: 0;
  cursor: pointer;
  transform: translateY(-50%);
  z-index: 2;
  width: 30px;
  height: 30px;
  /* padding: 10px; */
  border-radius: 50%;
  background: rgba(255, 238, 238, 0.5);
  box-shadow: 1px 1px 5px gray;
  color: #fff;

  .nav-icon {
    font-size: 1.5rem;
    color: black !important;
  }
`;
