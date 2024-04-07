import styled from "styled-components";
import Heading from "../../miscellaneous/Heading";
import BlogCard from "./BlogCard";
import { ButtonDark } from "@/styles/components/buttons";
import Link from "next/link";


function Blog({ posts }) {
    // console.log(posts)

    return (
        <Section className="section section-blog">
            <Heading text={"Take a cue - Trending Blogs"} desc={"Looking for Wedding Inspiration? Put a full stop to your search as Wedding Banquets has got your back! Keep up to date with the hot trends on Wedding decor,Fashion inspirations, Phtography and much more to make your D-Day a phenomenal affair. "} />
            {/* <Description text={"Looking for wedding inspiration? Look no further than Wedding Banquet's blogs! We've got all the latest trends, useful tips, and creative ideas to help you plan the wedding of your dreams. From stunning decor to fashion inspiration, our blogs are your ultimate resource for you to explore. "}/> */}
            <div className="container">
                <div className="blog-cards">

                    {
                        posts?.map((post) => {
                            return (<BlogCard post={post} key={post.ID} />)
                        })
                    }

                    {/* <BlogCard img={'/blog.png'}/>
                    <BlogCard img={'/blog-2.png'}/> */}

                </div>
                <div className="btn">
                    <Link href={"https://weddingbanquets.in/blog"}>
                        <ButtonDark>
                            View All
                        </ButtonDark>
                    </Link>
                </div>
            </div>

        </Section>
    )
}

export default Blog;

const Section = styled.section`

.blog-cards{
    overflow-x: auto;
    padding: 2rem 0rem;
    display: grid;
    grid-template-columns:1fr 1fr 1fr;
    gap: 3rem;;

    &::-webkit-scrollbar { width: 0 !important }
}

.btn{
    margin-top:4rem;
    text-align:center;
}


`