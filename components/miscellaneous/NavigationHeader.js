import styled from "styled-components";
import { BsShare } from 'react-icons/bs';
import { GrPrevious } from 'react-icons/gr';
import { useRouter } from "next/router";

export default function BreadCrumb({ meta_title }) {
    const router = useRouter();

    const handleShareClick = () => {
        const currentUrl = window.location.href;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Wrapper className="container-l">
            <span className="icon-container" onClick={() => { router.back(); }}>
                <GrPrevious className="icon" />
            </span>
            <span className="icon-container" onClick={handleShareClick}>
                <BsShare className="icon" />
            </span>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--gray);
        border-radius: 50%;
        width: 25px;
        height: 25px;

        .icon {
            font-size: 2rem;
            color: var(--para);
            cursor: pointer;
        }
    }
`;
