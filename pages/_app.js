import { MyContextProvider } from "@/context/MyContext";
import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/GlobalStyle";
import Script from "next/script";
import Layout from "@/components/layout.js/Layout";
import Head from "next/head";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <GlobalStyles />
      <Head>
        <title>Best Banquet Halls And Wedding Venues at 40% Discount</title>
        <meta
          name="description"
          content="Wedding Banquet To Plan Your Wedding And Make Sure It is a Memorable Occasion. Look Over 10000+ Indian Wedding Venues For Corporate Events, Weddings And Parties"
        />
        <meta
          name="keywords"
          content="Affordable Banquet Halls, Banquet Halls, Top Banquet Halls, Best Banquet Halls with price, Banquet Halls with review, Luxury Banquet Halls, Best Banquet Halls, List of Banquet Halls, Cheapest Banquet Halls, Banquet Halls near by, Banquet Halls near, Marriage Halls, Party Halls, Birthday Party Halls, Function Halls, Wedding Venues"
        />
        <meta name="author" content="y@sh" />
        {/* For google search console */}
        <meta
          name="google-site-verification"
          content="4Q3RIzsSNzX4U-DYRcJMcvwuCw3Iai4zzCToI58L7gA"
        />
        {/* For browser color */}
        <meta name="theme-color" content="#870808" />
        <meta name="msapplication-navbutton-color" content="#870808" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#870808" />
        {/* favicon */}
        <link
          rel="icon"
          type="image/png"
          href="https://weddingbanquets.in/fav-icon/favicon14.png"
        />

        {/* Open graph meta tag */}
        <meta property="og:site_name" content="Weddingbanquets" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* twiiter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weddingbanquets" />
        <meta name="twitter:url" content="https://weddingbanquets.in" />
        <meta name="twitter:description" content="Your one-stop shop for all of your wedding needs. Browse 1000+ party halls &amp; wedding banquets. Get budget-friendly photographers, mehndi artists, makeup artists, &amp; more..." />
        <meta name="twitter:image" content="https://weddingbanquets.in/twitter-img.png" />
      </Head>
      <Layout>
        <a
          href="https://api.whatsapp.com/send?phone=918882198989&text=Hi"
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            right: '25px',
            bottom: '70px',
            zIndex: '99999999',
          }}
        >
          <Image alt='weddingbanquets whatsapp' src="https://i.ibb.co/VgSspjY/whatsapp-button.png" width={55} height={55}></Image>
        </a>
        <Component {...pageProps} />
      </Layout>
    </MyContextProvider>
  );
}
