import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

:root {

  --primary-color:#870808;
  --secoundary-color:#B88A24;
  --info-color:#F33232;
  --bg-color: #FFEEEE;
  --para: #666666;
  --phone:#17C434;
  --gray:#F1F5FA;
  --yettodefine:#00B28A;
  
  --para-tint: #e4e4e4;
  --third: #fff;
  --helper: #8490ff;
  --black: #212529;
  --helper-tint: #f3f4ff;
  --bg: rgb(249 249 255);
  --overlay-color: #3e64ff;
  --icon-bg: rgba(144, 172, 209, 0.2);
  --gradient: linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%);
  --shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  --shadowSupport: 0 2rem 2rem 0 rgb(132 244 155 / 30%);

}

/* spacing 
desktop = 4.8rem */

html {
  font-size: 55.5%;
  font-family: "Work Sans", sans-serif;
  /* overflow-x: hidden; */
  scroll-behavior: smooth;
}

body {
  /* overflow-x: hidden; */
}

.body::-webkit-scrollbar {
  display: none;
}


p{
  font-family:'Poppins';
  font-weight: 500;
}

h1,
h2,
h3,
h4 {
  font-family: "Poppins", sans-serif;
}

h2{
  font-weight:500;

}


a {
  text-decoration: none;
}

li {
  list-style: none;
}


/*==============================================
              Reuseable code 
================================================ */

.section {
  position: relative;
  padding: 5rem 0rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9rem;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column {
  grid-template-columns: repeat(4, 1fr);
}

.flex {
  display: flex;
  gap: 5rem;
  padding: 3rem;
}

.container {
  max-width: 155rem;
  margin: auto;
  /* margin: 1rem; */
  padding: 1rem;
}

.container-l{
  max-width: 155rem;
  margin: auto;
  padding: 0rem 1rem;

}


//Responsive

@media (max-width:800px) {

  html {
    font-size: 50.5%;

  }

  .section {
    padding: 4rem 0rem;
  }
  
}
@media (max-width:600px) {

  html {
    font-size: 47.5%;

  }


  
}
`;
