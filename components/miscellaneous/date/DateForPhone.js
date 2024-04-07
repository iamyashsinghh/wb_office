import styled from "styled-components";


export default function DateForPhone({eventDate,setEventDate}) {
    const today = new Date().toISOString().split('T')[0];


    return (

        <Wrapper>
            {
                eventDate == "" ? (
                    <label
                        className='input'
                        style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#aaa',
                            pointerEvents: 'none',
                            zIndex: "-1"
                        }}
                    >
                        Event Date
                    </label>
                ) : null
            }
            <input
                type="date"
                className='input'
                style={{
                    background: "none",
                    zIndex: "9"
                }}
                name="date"
                min={today}
                value={eventDate}
                placeholder=" "
                onChange={(e) => setEventDate(e.target.value)}
            // placeholder='Event Date'
            />
        </Wrapper>

    )
}

const Wrapper  = styled.div`
display: none;
position: relative;
width: 100%;

@media (max-width:600px) {
    display: block;
}

`