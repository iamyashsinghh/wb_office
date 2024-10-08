import { useGlobalContext } from '@/context/MyContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { IoIosCall } from 'react-icons/io';
import styled from 'styled-components';

function Ad() {
    const router = useRouter();
    const { setLeadFormData, setIsLeadsModelOpen } = useGlobalContext();

    const openLeadsModel = (e, type = 'click') => {
        if (e) e.stopPropagation();

        const pathSegments = router.asPath.split('/').filter((segment) => segment.length > 0);
        let venue_slug = pathSegments.length === 2 ? pathSegments[1] : router.asPath;

        const leadData = {
            url: router.asPath,
            venue_slug: venue_slug,
            type: type,
            request_handle_by: 'form',
        };

        setLeadFormData(leadData);
        setIsLeadsModelOpen(true);
    };
  return (
    <Wrapper>
       <div className="action-btns">
            <button className="venue-card-btn" onClick={(e) => openLeadsModel(e)}>Get Quotation</button>
            <span className="call-btn">
                <a href={`tel:07969071909`} aria-label="call icon">
                    <IoIosCall className="call-icon" size={30} />
                </a>
            </span>
        </div>
        <div className="bannar-img">
            <Image
                src="/common/venue.jpg"
                alt="An example image"
                fill={true}
                />
        </div>
    </Wrapper>
  )
}

export default Ad

const Wrapper = styled.div`
background-color: white;
margin-top: 2rem;
position: sticky;
top: 100px;
z-index: 1;

    .action-btns{
        padding: 2rem 3rem;
        display: flex;
        justify-content: space-between;

        .venue-card-btn{
            border: none;
            white-space: nowrap;
            background:none;
            border: 1px solid #F33232;
            color: #F33232;
            padding: 1rem 2.5rem;
            text-transform: uppercase;
            border-radius:.5rem;
            font-size: 2rem;
            cursor: pointer;
            transition: all .3s linear;
            &:hover{
                background: #F33232;
                color: white;
            }
        }
       
        .call-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--phone);  
            padding:  0rem 1rem;
            border-radius: .5rem;
            cursor: pointer;
            transition: all .2s linear;
            .call-icon{
                color: var(--phone);
            }
            
            &:hover{
                background-color: var(--phone);
                border: 1px solid white;
                .call-icon{
                    color: white;
                }
            }
        }
    }

    .bannar-img{
        position: relative;
        width: 100%;
        height: 400px;
        z-index: 0;
    }

`;