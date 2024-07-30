import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="/andrehadianto.com/favicons/icon-dark.png"
          media="(prefers-color-scheme: dark)"
          rel="icon"
        />
        <link
          href="/andrehadianto.com/favicons/icon-light.png"
          media="(prefers-color-scheme: light)"
          rel="icon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
