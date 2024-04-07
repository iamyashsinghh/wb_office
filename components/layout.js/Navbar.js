import Link from 'next/link'
import styled from "styled-components"
import { IoIosCall } from 'react-icons/io'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { useGlobalContext } from '@/context/MyContext'
import Image from 'next/image'
import CallingRequest from '@/lib/request/callingrequest/CallingRequest'

function Navbar() {

    const { isMenuOpen, setIsMenuOpen, selectedCity, setSelectedCity, cities, vendorCategories, venueCategories, setCityRoute, loggedUser } = useGlobalContext()
    // console.log(loggedUser)
    async function handleAnchorClick(e, slug) {
        // console.log("Clicked")
        e.stopPropagation();
        const response = await CallingRequest(slug);
        // alert(response.message)
        // console.log(response.message);
    }
    return (<Nav>

        <div className="logo-container">
            <Link href={"/"} className='logo-img'>
                <Image
                    src={"/logo.png"}
                    alt='logo'
                    fill
                    sizes="(100vw)"
                />
            </Link>
        </div>
        <div className="menus-container">
            <div className="menu-info side-menu">
                <span className="email">
                    <IoIosCall size={20} />
                    <a href="tel: 18008890082" onClick={e=>handleAnchorClick(e,"home")}>1800 889 0082</a>
                </span>
                <ul className="menu-list">
                    <li className="menu-item">
                        <Link href="/blog" className="menu-item" >Blog</Link>
                    </li>
                    <li className="menu-item">
                        <Link href={`/business`} className="menu-item" >List Your Business</Link>
                    </li>
                    {
                        loggedUser ? <Link href={`/user/profile`} className="menu-item" ><FaUser /></Link> : (
                            <li className="menu-item">
                                <Link href={`/user/signin`} className="menu-item" >Sign in</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="menu-btns side-menu">
                <ul className="menu-list">
                    <li>
                        <Link href="/" className='menu-item'>Home</Link>
                    </li>
                    <li className="menu-item venue-dropdown-item">Venue <AiFillCaretDown className='down-icon' />
                        <div className="dropdown">
                            <div className="dropdown-content">
                                <div className="caret"></div>

                                <div className="l-content venue-dropdown-items">
                                    <ul>
                                        {
                                            venueCategories?.slice(0, 4).map((category, i) => {
                                                return (

                                                    <li className="menu-item" key={i}>
                                                        <Link href={`/${category.slug}/${selectedCity}/all`} className="drop-down-menu-link" >{category.name} </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="r-content venue-dropdown-items">
                                    <ul>
                                        {
                                            venueCategories?.slice(4).map((category, i) => {
                                                return (
                                                    <li className="menu-item" key={i}>
                                                        <Link href={`/${category.slug}/${selectedCity}/all`} className="drop-down-menu-link" >{category.name} </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="menu-item vendors-dropdown-item">Vendors <AiFillCaretDown className='down-icon' />
                        <div className="dropdown">
                            <div className="dropdown-content">
                                <div className="caret"></div>

                                <div className="l-content vendors-dropdown-items">
                                    <ul>
                                        {
                                            vendorCategories?.slice(0, 5).map((category, i) => {
                                                return (

                                                    <li className="menu-item" key={i}>
                                                        <Link href={`/${category.slug}/${selectedCity}/all`} className="drop-down-menu-link" >{category.name} </Link>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>

                                <div className="r-content vendors-dropdown-items">
                                    <ul>
                                        {
                                            vendorCategories?.slice(5).map((category, i) => {
                                                return (
                                                    <li className="menu-item" key={i}>
                                                        <Link href={`/${category.slug}/${selectedCity}/all`} className="drop-down-menu-link" >{category.name} </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

                    {/* <li >
                        <Link href="/royal-banquets" className='menu-item'>Real Wedding</Link>
                    </li> */}
                    <li className="menu-item">
                        <Link href="/#why-us" className='menu-item'>Why us</Link>
                    </li>
                    <li className="menu-item city-drop-down">
                        {/* <FaRegUser size={20} /> */}
                        <select name='cities' value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setCityRoute(e.target.value) }}>
                            <option value={null} disabled>City</option>
                            {
                                cities?.map((city) => {
                                    return (<option value={city.slug} key={city.id}> {city.name}</option>)
                                })
                            }
                        </select>
                    </li>
                </ul>
            </div>
        </div>
        <div className="hamburger">
            {/* <MdPhone className='phone-icon'/> */}
            <HiOutlineMenuAlt3 className="menubar" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <div className="phone">
            <a href="tel: 18008890082" onClick={e=>handleAnchorClick(e,"home")}>
                <IoIosCall className='phone-icon' />
            </a>
            {/* <HiOutlineMenuAlt3 className="menubar" onClick={() => setIsMenuOpen(!isMenuOpen)} /> */}
        </div>


    </Nav>)
}


export default Navbar;

const Nav = styled.nav`
position: absolute;
/* position: sticky; */
top: 0;
/* border: 2px solid white; */
width: 100%;
height: 10rem;
top: 0;
left: 0;
right: 0;
z-index: 9;
/* background:none; */
display: grid;
grid-template-columns: 4fr 6fr;


.logo-container{
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0rem 2rem;
    width: 100%;
    
    .logo-img{
        /* border: 1px solid green; */
        
        position: relative;
        min-width: 200px;
        height: 50px;
    }
}


.menus-container{

    max-width: 100%;
    height: 100px;
   
    //Reuseable css
    .menu-list{
        display: flex;
        gap: 5rem;
        align-items: center;
        justify-content: space-between;
        /* border: 2px solid tomato; */
        /* padding-right: 8rem; */

        .down-icon{
            position: relative;
            top: 4px;
        }

        .menu-item{
            font-size: 1.7rem;
            font-weight: 400;
            color: white;
            font-family: 'Poppins';
            position: relative;
            white-space: nowrap;
            cursor: pointer;
            transition: all .3s linear;

            &:hover{
                color:var(--secoundary-color);
            }
        }
        .city-drop-down{
            background-color: none;
            background: transparent;

            select{
                padding: 0px 10px;
                background-color: transparent;
                color: white;
                font-size: 1.7rem;
                font-weight: 400;
                overflow: hidden;
                color: white;
                font-family: 'Poppins';
                border: 1px solid white;
                border-radius: 3px;

                option{
                    color: black;
                }
            }
        }

    }
    
    .side-menu{
        /* border: 1px solid tomato; */
        height: 50%;
        padding:0rem 15rem 0rem 10rem;
        color: white;
    }

    .menu-info{
        /* background: var(--info-color); */
        background-color: var(--primary-color);
        border-radius: 20% 17% 10% 6% / 0% 0% 0% 100% ;
        display: flex;
        /* gap: 6rem; */
        align-items: center;
        /* border: 2px solid blue; */
        justify-content: space-between;
        /* padding-right:15rem; */

        .email{
            display: flex;
            align-items: center;
            gap: 1rem;

            a{
                color: white;
                font-family: 'Poppins';
                font-size: 1.7rem;
            }
        }

    }

}

.menu-btns{
    display: flex;
    align-items: center;
    /* border: 2px solid blue; */
    justify-content: space-between;

    //To align the menu info and menu button from the right side.
    .menu-list{
        width: 100%;
    }

}

//Hamburger
.hamburger{
    display: none;
    position: absolute;
    right: 4rem;
    top:20px;
    cursor: pointer;
    /* display: none; */
    /* border: 11px solid green; */
    .menubar{
        color: white;
        font-size: 3.5rem;
    }

}

.phone{
    display: none;
    position: absolute;
    right: 12rem;
    top:17px;
    cursor: pointer;
    /* display: none; */
    /* border: 11px solid green; */
    .phone-icon{
        color: white;
        font-size: 3rem;
    }
}


//Venue mega dropdown css
.venue-dropdown-item{
    
 &:hover{
    .dropdown{
        visibility: visible;
        opacity: 1;
        top: 2.5rem;
    }
 }
}

.vendors-dropdown-item{
    &:hover{
    .dropdown{
        visibility: visible;
        opacity: 1;
        top: 2.5rem;
    }
 }
}
.dropdown{
    visibility: hidden;
    opacity: 0;
    transition: all .1s linear;
    margin: 2rem 0rem ;
    position: absolute;
    z-index: 3;
    left: 0%;
    top: 3rem;
    transform: translateX(-50%);
    border-top: 5px solid var(--primary-color);
    background-color: white;
    /* border: 2px solid red; */
    
    .dropdown-content{
       
        padding: 2rem 5rem;
        position: relative;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 10rem;
        color: black;

        .caret {
        position: absolute;
        top: -20px;
        left: 50%;
        /* transform: translateX(-50%); */
        border-left: solid 25px transparent; 
        border-right: solid 25px transparent; 
        border-bottom: solid 20px var(--primary-color); 


        }


        ul{
            display: flex;
            flex-direction:column;
            gap: 1rem;

            li{

                list-style: disc;
                color: black !important;
            }
            
            .drop-down-menu-link{
                transition: all .1s linear;
                color: black !important;
                &:hover{
                    
                    color: var(--primary-color) !important;

                }

            }
        }
        
    }
}






@media (max-width:1000px) {
    /* border-top: 1px solid var(--secoundary-color); */
    position: sticky ;
    top: 0px;
    height: 8rem;
    background-color: var(--primary-color);

    .logo-container{

        .logo-img{

            min-width: 200px;
            height: 40px;
        }
    } 
    .menus-container{
        display: none;
    }

    //Hamburger
    .hamburger{
        display: block;
    }
    .phone{
        display: block;
    }
}

@media (max-width:600px) {
    height: 7rem;

    .logo-container{
        /* border: 2px solid red; */

        .logo-img{
            display: block;
            /* border: 2px solid green; */
            min-width: 160px;
            height: 35px;
        }
    } 
    .hamburger{
        top: 15px;
        .menubar{

        }
    }

}

`

