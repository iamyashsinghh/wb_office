import styled from "styled-components";
import { FaEdit } from 'react-icons/fa'
import Image from "next/image";

export default function ProfileCard({ user, setSelectedIndex }) {


    //This function is only the difination. 

    return (
        <Wrapper className="section section-vendor-info">
            <div className="container">

                <div className="info">

                    <div className="round-banner-container">
                        <Image
                            src={'/icons/user2.png'}
                            fill={true}
                            sizes="(100vw)"
                            alt="banner-image"
                        />

                    </div>
                    <div className="contact-info">
                        <div>
                            <p>Name : </p>
                            <h2>{user?.name}</h2>
                        </div>
                        <div>
                            <p>Phone : </p>
                            <h2>{user?.phone}</h2>
                        </div>
                        <div>
                            <p>Email :  </p>
                            <h2>{user?.email}</h2>
                        </div>
                        <div>
                            <p>City : </p>
                            <h2>{user?.city}</h2>
                        </div>
                    </div>

                </div>
                {
                    user?.about && (
                        <div className="about-info">
                            <div>
                                <p>About: </p>
                                <h2>{user?.about}</h2>
                            </div>
                        </div>
                    )
                }

                <FaEdit className="icon" title="Edit" onClick={e => setSelectedIndex(2)} />
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`


.container{
    background-color:var(--bg-color);
    display: flex;
    gap: 3rem;
    padding: 3rem;
    position: relative;


    .icon{
        position: absolute;
        z-index: 2;
        color: var(--primary-color);
        font-size: 2.5rem;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    

    /* justify-content: space-around; */


    .round-banner-container{
        position: relative;
        min-height: 150px;
       min-width: 150px;

     
    }    

    .info{
        /* padding: 0rem 10rem; */
        /* padding: 0rem 1rem; */
        display: flex;
        gap: 2rem;
        align-items:center;
        width: 100%;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        div{
            display: flex;
            gap: 1rem;
            align-items: center;

            p{
                font-size: 1.8rem;
                color: var(--para);
                font-family: "Poppins";
            }
            h2{
                font-size: 1.8rem;
            }
        }
    }
    .about-info{
        max-width: 40rem;
        
        p{
            font-size: 1.8rem;
            color: var(--para);
            font-family: "Poppins";
            margin-bottom: 5px;
        }
        h2{
            font-family: "Poppins";
            font-size: 1.7rem;
            /* color: var(--para); */
            font-weight: 400;
        }
        
    }
}


@media (max-width:1000px) {
    .round-banner-container{

        min-height: 180px !important;
       min-width: 180px !important;
    }
}
@media (max-width:700px) {
    .container{
        flex-direction: column;
    }
    .info{
        flex-direction: row-reverse;
        justify-content: space-between;
      
  
    }
    .round-banner-container{
        min-height: 100px !important;
       min-width: 100px !important;
    }

}

/* @media (max-width:600px) {
    .container{
        padding: 1rem;
    }
    .round-banner-container{
        min-height: 200px !important;
       min-width: 200px !important;
    }
} */
`