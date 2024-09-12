import React from "react";
import styled from "styled-components";
import Header from "@/components/layout.js/Header";
import BlogDeatil from "@/components/blog/blogdetail/BlogDeatil";
import { useRouter } from "next/router";
import Head from "next/head";

function BlogDetailPage({ data }) {
  const router = useRouter();
  const blog = data.data;
  return (
    <Wrapper>
      <Head>
        <title>{blog.meta_title}</title>
        <meta name="description" content={blog.meta_description} />
        <meta name="keywords" content={blog.meta_keywords} />
        <meta name="og:image" content={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${blog.image}`} />
        <meta property="og:title" content={blog.og_title} />
        <meta property="og:description" content={blog.og_description} />
        <meta property="og:url" content={`https://weddingbanquets.in${router.asPath}`} />
      </Head>
      <div className="position">
        <Header />
      </div>
      <BlogDeatil data={data} />
    </Wrapper>
  );
}

export default BlogDetailPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/blog_detail/${params.slug}`;
  let bloddata = await fetch(url);
  let data = await bloddata.json();
  return {
    props: {
      data,
      params,
    },
  };
}

const Wrapper = styled.section`
  .position {
    position: fixed;
    width: 100%;
    z-index: 9998;
  }
`;
