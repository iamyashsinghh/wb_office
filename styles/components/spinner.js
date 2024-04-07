import styled from "styled-components"

export function Spinner1() {


    return (
        <Spinner1Style>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Spinner1Style>
    )
}

const Spinner1Style = styled.div`

.lds-ring {
  display: inline-block;
  position: relative;
  width: 15px;
  height: 15px;
  /* height: 20px; */
  /* border: 2px solid black; */
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  /* width: 20px;
  height: 20px; */
  width: 100%;
  height: 100%;

  border: 3px solid #B88A24;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #B88A24 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`


export function Spinner2(){
    return(
        <Spinner2Style>
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </Spinner2Style>
    )
}


const Spinner2Style = styled.div`
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 8px;
  background: #B88A24;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}



`