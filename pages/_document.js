import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

function MyDocument(props) {
  return (
    <Html lang="en">
      <Head />
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans&family=Poppins:wght@400;500;800&family=Roboto:wght@400;700&display=swap" as="style" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans&family=Poppins:wght@400;500;800&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

//Using this to rendder the styled component css on the server, Otherwise our css will only apply on client side.z
MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;