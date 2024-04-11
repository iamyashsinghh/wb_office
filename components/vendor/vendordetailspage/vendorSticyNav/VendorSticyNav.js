import React from "react";
import styled from "styled-components";

export default function VendorSticyNav() {
    return (

        <Wrapper id="vendor-fixed-tab" class="VendorFixedTab sc-jzJRlG dfOmka">
                <div class="nav-list">Projects</div>
                <div class="nav-list">About</div>
                <div class="nav-list">Reviews</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
        background-color: white;
        width: 100%;
        padding: 1rem 0;
        display:flex;
        margin-bottom: 1rem;
        .nav-list{
            padding: 1rem 0;
            margin: 0 2rem;
            cursor: pointer;
            font-size: 1.6rem;
        }
`;