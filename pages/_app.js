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
        <title>Banquet Halls, Wedding Venues, Wedding Planning in India- Wedding Banquets</title>
        <meta
          name="description"
          content="Wedding Banquet to Plan your wedding and make sure it is a memorable occasion. Look over 1000+ Indian Wedding venues for corporate events, weddings, birthday parties, and more."
        />
        <meta
          name="keywords"
          content="Affordable Banquet Halls Banquet Halls Top Banquet Halls Best Banquet Halls with price Banquet Halls with review Luxury Banquet Halls Best Banquet Halls List of Banquet Halls Cheapest Banquet Halls Banquet Halls near by Banquet Halls near Marriage Halls Party Halls Birthday Party Halls Function Halls Wedding Venues"
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
        <link rel="preload" href="/banner/banner.png" as="image"/>

        
        {/* Open graph meta tag */}
        <meta property="og:site_name" content="Weddingbanquets" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        {/* twiiter card */}
          <meta name="twitter:card" content="summary_large_image" />
          
          <meta name="twitter:title" content="Weddingbanquets" />
          <meta name="twitter:url" content="https://weddingbanquets.in" />
          <meta name="twitter:description" content="Your one-stop shop for all of your wedding needs. Browse 1000+ party halls &amp; wedding banquets. Get budget-friendly photographers, mehndi artists, makeup artists, &amp; more..." />
          <meta name="twitter:image" content="https://weddingbanquets.in/twitter-img.png"/>
      </Head>
      <Layout>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M8J8X27"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager */}
        <Script
          id="my-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-M8J8X27');,`
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          id="my-script2"
          src="https://www.googletagmanager.com/gtag/js?id=G-F1S085RR3J"
          strategy="afterInteractive"
        />

        <Script strategy="afterInteractive" id="my-script3">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F1S085RR3J');
        `}
        </Script>
        {/* End Google tag (gtag.js) */}

        <a
      href="https://api.whatsapp.com/send?phone=918882198989&text=Hi"
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        right: '25px', 
        bottom: '25px',
        zIndex: '99999999',
      }}
    >
  <Image src="https://i.ibb.co/VgSspjY/whatsapp-button.png" width={55} height={55} alt=""></Image>
  </a>
        <Component {...pageProps} />
      </Layout>
    </MyContextProvider>
  );
}