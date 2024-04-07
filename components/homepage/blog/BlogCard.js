import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

function BlogCard({ post }) {

    const dateObj = new Date(post?.post_date);

    // Define months array for conversion
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Extract the month and date
    const month = months[dateObj.getMonth()]; // getMonth() returns a value between 0-11
    const date = dateObj.getDate(); // getDate() returns the day of the month
    const year = dateObj.getFullYear(); // getFullYear() returns the year

    // Format the date
    const formattedDate = `${date} ${month} ${year}`;

    return (
        <Div href={`https://weddingbanquets.in/blog/${post?.post_slug}`}>
        {/* // <Div href={`https://blog.weddingbanquets.in/${post?.post_slug}`}> */}
            <div className="img-container" >

                <Image

                    className="blog-img"
                    src={post?.post_thumbnail}
                    alt="blog thumbnail"
                    fill={true}
                    sizes="(100vw)"
                />

                {/* <p className="title">{post?.post_title}</p> */}
                <div className="overlay">

                </div>

            </div>
            <div className="content">
                <h2 className="title">
                    {
                        post?.post_title
                    }
                </h2>
                <span className="date">
                    {formattedDate}
                </span>
            </div>


        </Div>
    )
}

const Div = styled(Link)`
padding: 5px;
position:relative;
border: 2px solid #f7f7f7;
box-shadow: 0px 4px 14px #dedede40;
    
padding-bottom:20px;
cursor: pointer;
overflow: hidden;

.overlay{
    position:absolute;
    left: 0;
    bottom:0;
    right:0;
    width: 100%;
    height: 100%;
    background-color:var( --primary-color);
    opacity: 0.6;
    /* transform: translateY(100%); */
    display: none;
    transition: all .3s linear;

}

&:hover{
    .overlay{
        /* transform: translateY(0); */
        display: block;
    }

}

.img-container{

    position: relative; 
    width: 100%;
    min-height:250px;



}
.content{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    /* border: 1px solid red; */
    /* height: 100%; */
    /* margin-bottom: 10px; */


    .title{
        color: black;
        font-family: "Poppins";
        font-size: 2rem;
        
    }

    .date{
        position: absolute;
        bottom: 5px;
        color: var(--para);
        font-family: "Poppins";
        font-size: 1.6rem;
    }

}




@media (max-width:900px) {
    min-width: 40rem;
    min-height:250px;
    
}


@media (max-width:600px) {
    .img-container{
        min-height:180px;
    }
    
}

`

export default BlogCard;
