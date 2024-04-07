//This file only contain the  redirect.

// pages/blog.js

export async function getServerSideProps({query}) {

  const {slug} = query;

    return {
      redirect: {
        destination: `https://weddingbanquets.in/blog/${slug}`, // the URL you want to redirect to
        permanent: true, // true for a 301 redirect, false for 302
      },
    }
  }
  
const Blog = () => null; // A placeholder component
export default Blog;

