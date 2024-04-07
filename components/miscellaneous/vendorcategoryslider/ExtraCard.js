import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/vendor-vector/11.png";
import { useGlobalContext } from "@/context/MyContext";

function ExtraCard() {
  const { selectedCity } = useGlobalContext();
  return (
    <Card href={`/banquet-halls/${selectedCity}/all`}>
      <div className="vendor-vector-container">
        <div className="vandor-avatar">
          <Image
            src={img}
            // src={"/test.jpeg"}
            alt="vendor image"
            fill={true}
            sizes="(100vw)"
          />
          {/* <span className="tag">200+</span> */}
        </div>
      </div>

      <div className="vendor-details">
        <h2>Banquet Hall</h2>
        <p>{`(502)`}</p>
      </div>
    </Card>
  );
}

const Card = styled(Link)`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  position: relative;
  transition: all 0.3s linear;

  /* &:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1.01);
} */

  .vendor-vector-container {
    /* position: relative; */
    /* border: 2px solid red; */
    background-color: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 150px;
    width: 150px;
  }
  .vandor-avatar {
    position: relative;
    /* border: 1px solid black; */
    overflow: hidden;
    text-align: center;
    margin: auto;
    height: 100px;
    width: 100px;
    /* border: 2px solid red; */
  }

  .vendor-details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* justify-content:center; */
    /* align-items:center; */
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    h2 {
      text-align: center;
      font-size: 1.7rem;
      color: var(--primary-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 1.5rem;
      color: var(--para);
      font-family: "Poppins";
      text-align: center;
    }
  }

  .tag {
    font-size: 2rem;
  }

  @media (max-width: 800px) {
    min-width: 150px;

    .vendor-vector-container {
      height: 100px;
      width: 100px;
    }
    .vandor-avatar {
      height: 70px;
      width: 70px;
    }
  }
  @media (max-width: 500px) {
    min-width: 100px;

    .vendor-vector-container {
      height: 100px;
      width: 100px;
    }
    .vandor-avatar {
      height: 70px;
      width: 70px;
    }
  }
`;

export default ExtraCard;