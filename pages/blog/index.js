import BlogList from "@/components/blog/bloglist/BlogList";
import Header from "@/components/layout.js/Header";
import Head from "next/head";
import styled from "styled-components";

export default function Blog({ data }) {
  return (
    <>
      <Header />
      <Head>
        <title>Tips and Ideas for your Wedding | Wedding Banquets</title>
        <meta name="description" content='Discover expert tips and creative ideas for planning an unforgettable wedding. From venue selection to decor inspiration | Wedding Banquets Blog' />
        <meta name="keywords" content='wedding planning, venue selection, decor inspiration, wedding tips, wedding ideas, wedding banquet, wedding reception, wedding decorations' />
      </Head>
      <Wrapper className="section container">
        <BlogList data={data} />
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
