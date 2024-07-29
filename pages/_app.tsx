import { CoreLayout } from "@/common/components/CoreLayout";
import { inter } from "@/common/fonts";

import type { AppProps } from "next/app";

import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).layout
    ? (Component as any).layout
    : CoreLayout;

  return (
    <>
      {/* This is required for fonts to work in Portal too  */}
      <style global jsx>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
