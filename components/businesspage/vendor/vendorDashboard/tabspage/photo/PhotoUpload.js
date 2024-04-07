import Heading from "@/components/miscellaneous/Heading";
import styled from "styled-components";
import { MdCloudUpload } from 'react-icons/md'
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import PhotoCard from "./PhotoCard";
import PreviewCard from "./PreviewCard";
import { parseCookies } from "nookies";
import { Spinner1 } from "@/styles/components/spinner";

// import { PhotoCard } from "@/components/photos/PhotoCard";

export default function PhotoUpload({ vendorContent, setVendorContent }) {

    
    //Extracting the token from the cookie
    const cookies = parseCookies();
    const { token } = JSON.parse(cookies["@VendorApp"] || "")

    //To target the inputFile Element
    const inputFile = useRef()

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    //When use selected the images from local machine, that images will be set in the Images state, and then this useEffect will run and make the Preview of selected images and store the url in imagePreview state
    useEffect(() => {
        const newImagePreviews = [];

        for (let i = 0; i < images?.length; ++i) {

            newImagePreviews.push(URL.createObjectURL(images[i]));

        }
        setImagePreviews(newImagePreviews);

    }, [images])

    

    // On change of image, This will run when a user select the images from the local machine This method will check the validation like img extendion and size, If all the validation is correct then save in Images state.
    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        let isValid = true;


        // Validation
        for (let img of selectedImages) {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(img.type)) {
                alert('Only jpg, jpeg, and png files are allowed.');
                isValid = false;
                break;
            }

            if (img.size > 5 * 1024 * 1024) { // 5MB
                alert('Image size should not be more than 5MB.');
                isValid = false;
                break;
            }

        }

        if (isValid) {
            setImages(selectedImages);
        } else {
            e.target.value = null; // Reset input value
        }
    };


    //This function will run on click of update btn. This function will update the new selected images and return the updated json.
    const handleUpdate = async () => {
        setIsLoading(true)
        if (images.length === 0) {          //If no imaes is selected then return 
            console.error('No images selected.');
            return;
        }


        //Creating the from data, because we are sending  new images in the form of  formData.
        const formData = new FormData();

        //Appendding the object data into the formData. We are not appending the images field.
        for (let key in vendorContent) {
            if (key != 'images') {
                formData.append(key, vendorContent[key]);
            }
        }


        //To append the multiple images in an aray
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }

        // To test:
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            //Making request to update the images
            const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/business/update_user_content`;

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    "bearer": token,
                },
                body: formData
            })


            response = await response.json();
            console.log("Response:")
            console.log(response);

            if (response.success) {
                setVendorContent(response.data)
                alert("Successfully ")
                setImages([]);
                setImagePreviews([]);
            } else {
                alert("something went wroung")
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
        setIsLoading(false)

    };


    return (
        <Wrapper>

            <div className="container">
                <Heading text={"Photos"} />
                <div className="form-container">
                    <div className="form-item" onClick={() => inputFile.current.click()}>

                        <label className="label" htmlFor="photo0">Upload From My Computer</label>
                        <input type="file" multiple name='photo' id="photo" ref={inputFile} onChange={handleImageChange} />
                        <MdCloudUpload className="upload-icon" id="photo" />
                        {/* <DropzoneArea
                        onChange={files => console.log(files)}
                    /> */}
                    </div>
                </div>

                {
                    imagePreviews && (
                        <>
                            {/* <Heading text={"Preview Photos"} /> */}
                            <div className="uploaded-photo-container">
                                {
                                    imagePreviews?.map((url, i) => {
                                        return (

                                            <PreviewCard key={i} url={url} index={i} images={images} setImages={setImages} />
                                        )
                                    })
                                }

                            </div>
                        </>
                    )
                }
                {
                    images?.length > 0 && (
                        <div className="form-btn">
                            <button className="btn" onClick={handleUpdate}>{isLoading ? <Spinner1/> : "Update"}</button>
                        </div>
                    )
                }


                <Heading text={"Uploaded Photos"} />
                <div className="uploaded-photo-container">
                    {
                        vendorContent.images?.split(",").map((url, i) => {
                            return (
                                <PhotoCard url={url} key={i} />
                            )
                        })
                    }


                   
                </div>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`

input[type=file]{
    display: none;
}

.form-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-left: 5px solid var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
    background-color: var(--bg-color);

    height: 300px;


    .upload-icon{
        font-size: 5rem;
        color: var(--primary-color);
    }
    .label{
        font-size: 2rem;
        font-family: "Poppins";
        font-weight: 500;
        color: var(--para);
    }
}

.uploaded-photo-container{
    padding: 2rem 0rem;
    display: grid;
    gap: 3rem;
    /* grid-template-columns: repeat(4,1fr); */
    grid-template-columns: repeat(auto-fill,minmax(auto,350px));
    justify-content: center;
    align-items: center;
}

.add-photo{
    background-color: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .plus-icon{
        font-size: 5rem;
    }
}

.form-btn{
    text-align: center;

    .btn{
        background-color: var(--primary-color);
        color: white;
        font-size: 1.8rem;
        font-family: "Poppins";
        border: none;
        width:200px;
        border-radius: 5px;
        padding: .5rem 5rem;
        cursor: pointer;
    }
}

/* @media (max-width:1000px) {

    .uploaded-photo-container{
        grid-template-columns: repeat(4,1fr);
    }
    
}
@media (max-width:800px) {

    .uploaded-photo-container{
        grid-template-columns: repeat(3,1fr);
    }
    
}
@media (max-width:800px) {

    .uploaded-photo-container{
        grid-template-columns: repeat(2,1fr);
    }
    
} */
`