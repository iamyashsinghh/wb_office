//Redirect to the blog site, The will handle /blog => blog.weddingbanquets.in

 const App = ()=> null;

export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: 'https://weddingbanquets.in/blog', // the URL you want to redirect to
        permanent: true, // true for a 301 redirect, false for 302
      },
    }
  }
  

  export default App;