import styled from "styled-components";
import Image from "next/image";
import {  destroyCookie } from "nookies";
import Link from "next/link";
import { useRouter } from "next/router";
import {MdLogout} from 'react-icons/md'
import { useGlobalContext } from "@/context/MyContext";

export default function Header({cookie_name}) {

    const router = useRouter();

    const {setLoggedUser} = useGlobalContext();

    function LogoutHandler() {

        destroyCookie({}, cookie_name, {
            path: '/'
        })
        
        setLoggedUser(null);
        localStorage.removeItem(cookie_name);
        router.push("/")
    }
    return (
        <Wrapper>

            <div className="logo-container">
                <Link href={"/"}>
                    <Image
                        src={'/logo.png'}
                        fill={true}
                        alt="img"
                        sizes="(100vw)"
                    />
                </Link>
            </div>
            <div className="logout-btn">
                {/* <button className="btn" onClick={LogoutHandler}>Logout</button> */}
                <MdLogout className="logout-icon" title="Logout" onClick={LogoutHandler}/>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.nav`
display: flex;
align-items: center;
justify-content: space-between;
height: 80px;
position: relative;
padding: 2rem 10rem;
background-color: var(--primary-color);

     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     right: 0;
 /* } */ 

.logo-container{
    position: relative;
    z-index: 1;
    width: 210px;
    height: 50px;
}
.logout-icon{
    font-size: 3rem;
    cursor: pointer;
    color: white;
}


@media (max-width:700px) {
    padding: 2rem 5rem;
    height: 50px;

    .logo-container{

        width: 150px;
        /* width: 40%; */
        height: 30px;
        /* height: 100%; */
    }
    
}
`