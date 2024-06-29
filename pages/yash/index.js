import BlogList from "@/components/blog/bloglist/BlogList";
import Header from "@/components/layout.js/Header";
import styled from "styled-components";

export default function Blog({ data }) {
  return (
    <>
    <Header />
      <Wrapper className="section container">
        <BlogList data={data}/>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps() {

    const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/blog_list`;
    let newLists = await fetch(url);
    let data = await newLists.json();
    data = data.data;
    // console.log(data.data)

  return {
    props: {
      data,
    },
  };
}

const Wrapper = styled.section``;
