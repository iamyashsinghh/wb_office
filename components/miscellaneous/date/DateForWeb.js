import styled from "styled-components";
import { useState } from "react";
export default function DateForWeb({eventDate,setEventDate}){

    const today = new Date().toISOString().split('T')[0];
    // alert(today)

    return (

        <Wrapper>
            {
                eventDate == "" ? (
                    <label
                        className='input'
                        onClick={(e)=>setEventDate(today)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#aaa',
                            // pointerEvents: 'none',  //When none, then no event will be listen, but i want to listen click so add comment this code.
                            // zIndex: "-1"
                        }}
                    >
                        Event Date
                    </label>
                ) : (
                    <input
                    type="date"
                    className='input'
                    // style={{
                    //     background: "none",
                    //     zIndex: "9"
                    // }}
                    name="date"
                    min={today}
                    value={eventDate}
                    placeholder=" "
                    onChange={(e) => setEventDate(e.target.value)}
                // placeholder='Event Date'
                />
                )
            }
           
        </Wrapper>

    )
}

const Wrapper  = styled.div`
display: block;
position: relative;
width: 100%;

@media (max-width:600px) {
    display: none;
}

`