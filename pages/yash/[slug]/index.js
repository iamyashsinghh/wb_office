import BlogDeatil from "@/components/blog/blogdetail/BlogDeatil";
import Header from "@/components/layout.js/Header";
import React from "react";
import styled from "styled-components";

function BlogDetailPage({ data }) {
  return (
    <Wrapper>
      <div className="position">
        <Header />
      </div>
      <BlogDeatil data={data.data} />
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
    },
  };
}

const Wrapper = styled.section`
  .position {
    position: fixed;
    width: 100%;
    z-index: 99999;
  }
`;
