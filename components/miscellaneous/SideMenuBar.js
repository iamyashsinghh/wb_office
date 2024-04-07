import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";
import { useGlobalContext } from "@/context/MyContext";
import { css } from "styled-components";
// ----------------------------------------------------
import { BiSearch } from 'react-icons/bi'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'



export default function SideMenuBar() {


    const { isMenuOpen, setIsMenuOpen, cities, selectedCity, setSelectedCity, loggedUser, setCityRoute } = useGlobalContext();

    const handlers = useSwipeable({
        onSwipedRight: (eventData) => { setIsMenuOpen(false) },

    });

    return (
        <Wrapper {...handlers} isActive={isMenuOpen}>
            <Div isActive={isMenuOpen} onBlur={() => setIsMenuOpen(false)} tabIndex="1" >
                <div className="menu-img">
                    <Image
                        src="/common/menu.png"
                        alt="An example image"
                        fill={true}
                        sizes="(100vw)"
                    />
                    <MdCancel className="cancel-icon" onClick={() => setIsMenuOpen(false)} />
                    <div className="profile">
                        <div className="user-icon-wrapper">
                            <FaUserAlt className="user-icon" />
                        </div>
                        {
                            loggedUser ? <Link href="/user/profile" className="user-name" onClick={() => setIsMenuOpen(false)}>{loggedUser?.name}</Link> : <Link href="/user/signin" className="user-name" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                        }


                    </div>
                </div>
                <div className="city-dropdown-container">
                    <div className="dropdown city-dropdown">
                        <div className="search-icon-wrapper">
                            <BiSearch className='icon' />
                        </div>
                        <select name='cities' value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setCityRoute(e.target.value); setIsMenuOpen(false); }}>
                            <option value={null} disabled>City</option>
                            {
                                cities?.map((city) => {
                                    return (<option value={city.slug} key={city.id}> {city.name}</option>)
                                })
                            }
                        </select>
                        <div className="dropdown-wrapper">
                            <AiFillCaretDown className="down-arrow" size={15} />
                        </div>
                    </div>

                </div>
                <div className="menu-list-container">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link href="/" className="menu-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </li>
                        <li className="menu-item" >
                            <Link href={`/banquet-halls/${selectedCity}/all`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Banquet Halls </Link>
                        </li>
                        <li className="menu-item" >
                            <Link href={`/party-halls/${selectedCity}/all`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Party Halls </Link>
                        </li>
                        <li className="menu-item">

                            <Link href={`/best-wedding-photographers/${selectedCity}/all`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Photographers</Link>
                        </li>
                        <li className="menu-item">
                            <Link href={`/top-makeup-artists/${selectedCity}/all`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Makeup Artist</Link>

                        </li>
                        <li className="menu-item">
                            <Link href={`/best-mehndi-artists/${selectedCity}/all`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Mehndi Artist</Link>
                        </li>


                    </ul>


                </div>
                <div className="menu-list-container">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link href="/blog" className="menu-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                        </li>
                        <li className="menu-item" >
                            <Link href={`/`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Photos </Link>
                        </li>
                        <li className="menu-item" >
                            <Link href={`/`} className="menu-link" onClick={() => setIsMenuOpen(false)}>Real Wedding </Link>
                        </li>

                    </ul>


                </div>
                <div className="menu-list-container">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link href="/career" className="menu-link" onClick={() => setIsMenuOpen(false)}>Career</Link>
                        </li>
                        <li className="menu-item" >
                            <Link href={`/about`} className="menu-link" onClick={() => setIsMenuOpen(false)}>About us </Link>
                        </li>


                    </ul>


                </div>

                <div className="list-your-business-wrapper">
                    {/* <span className="text">List your Business</span> */}
                    <li className="menu-item">
                        <Link href="/business" className="text" onClick={() => setIsMenuOpen(false)}>List Your Business</Link>
                    </li>
                </div>
            </Div>

        </Wrapper>)
}

const Wrapper = styled.div`
transform: translateX(100%);
position: fixed;
top: 0;
right: 0;
min-height: 100vh;
max-height: 100vh;
overflow-x: hidden;
overflow-y:scroll;
z-index: 10;
visibility: hidden;
opacity: 0;
transition: all .3s linear;


${({ isActive }) =>
        isActive &&
        css`
      opacity: 1;
      visibility: visible;
      transform: translateX(0%);
      
      `}

`

const Div = styled.div`


box-shadow: 0 0 10px  2000px rgba(0, 0, 0, .5);
transition: all .3s linear;
z-index: 10;
width: 30%;
margin-left: auto;
background-color: white;

/* position: ; */
top: 0;
right: 0;
min-height: 100vh;
overflow-x: hidden;
overflow-y:scroll;

     


.menu-img{
    position: relative;
    height: 15rem;
    min-width: 100vw;

}

.cancel-icon{
    color: white;
    font-size: 3rem;
    position: fixed;
    top:15px;
    right:15px;
    z-index: 999999999999999;


}
.profile{
    position: absolute;
    bottom: 30px;
    left: 20px;
    display: flex;
    gap: 2rem;
    align-items: center;

    .user-icon-wrapper{
        background-color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: 0%.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .user-icon{
        font-size: 2rem;
        color: black;
    }
    .user-name{
        color: white;
        font-size: 1.7rem;
        font-family: "Montserrat";
        font-weight: 600;
    }
}

.city-dropdown-container{
    border-bottom: 1px solid gray;
    position: relative;
    padding: 2rem 0rem;
    display:flex;
    align-items: center;
    justify-content: center;
    
    .dropdown{
        position: relative;
        border: 1px solid var(--secoundary-color);
        overflow:hidden;
        border-radius: 1rem;
        height: 5rem;
        width: 80%;
        background:none;

        .search-icon-wrapper{
            left: 5px;
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon{
                font-size: 3rem;
                color: var(--secoundary-color);
            }
        }


        select {
            position: absolute;
            font-family: "Poppins";
            background-color: transparent;
            font-size: 1.7rem;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            color: var(--para);
            padding: 0rem 4rem;
            -moz-appearance:none; /* Firefox */
            -webkit-appearance:none; /* Safari and Chrome */
            appearance:none;
            z-index: 1;
        }

        .dropdown-wrapper{
            position: absolute;
            right:0;
            top: 0px;
            background-color: var(--secoundary-color);
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            /* z-index: 99; */

            .down-arrow{
                color:white;

            }
        }

    }


}


.menu-list-container{
    padding: 2rem 3rem;
    border-bottom: 1px solid gray;
    .menu-list{
        display: flex;
        flex-direction: column;
        /* border-bottom: 1px solid gray; */
        gap:1rem;
    }
    .menu-link{
        display: block;
        padding: 5px 0px;
        /* border: 1px solid red; */
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
        font-size: 1.7rem;
        &:hover{
            color: var(--secoundary-color);
        }

    }
}


.list-your-business-wrapper{
    padding: 2rem;
    border-bottom: 1px solid gray;

    .text{
        color: var(--info-color);
        font-size: 1.7rem;
        font-weight: 500;
        font-family: "Poppins";
    }
}


@media (max-width:800px) {
    width: 50%;

}
@media (max-width:600px) {
    width: 70%;

}
`