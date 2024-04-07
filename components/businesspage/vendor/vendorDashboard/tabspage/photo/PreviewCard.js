import styled from "styled-components";
import Image from "next/image";
import {AiFillDelete} from 'react-icons/ai'
export default function PreviewCard({ url,index,images,setImages }) {

    

    const deletePreview = (index)=>{

        const newImages = images.filter((url,i)=>{
            return i != index;
        })
        setImages(newImages);

    }
    
    return (<Wrapper>
        <Image
            src={url}
            fill={true}
            sizes="(100vw)"
            alt="image"
        />
        <div className="overlay" onClick={()=>deletePreview(index)}>
            <AiFillDelete className="delete-icon" title="delete"/>
        </div>

    </Wrapper>)
}

const Wrapper = styled.div`

position: relative;
height: 200px;
border: 2px dashed var(--primary-color);
cursor: pointer;



&:hover{
    .overlay{
    position: absolute ;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: .5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    .delete-icon{
        color: white;
        z-index: 2;
        font-size: 3rem;
    }
}
}

`