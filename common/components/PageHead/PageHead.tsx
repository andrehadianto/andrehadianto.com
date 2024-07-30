import Head from "next/head";
import { PropsWithChildren, useMemo } from "react";

export interface PageHeadProps {
  name?: string;
  description?: string;
  removeTitleAppend?: boolean;
  titleAppendSeparator?: string;
}

const appName = "Andre Hadianto Lesmana";

export const PageHead = ({
  name,
  description,
  removeTitleAppend = false,
  titleAppendSeparator = "|",
  children,
}: PropsWithChildren<PageHeadProps>) => {
  const pageName = useMemo(() => {
    if (!removeTitleAppend) {
      return name ? `${name} ${titleAppendSeparator} ${appName}` : appName;
    }
    return name ?? appName;
  }, [name, removeTitleAppend, titleAppendSeparator]);

  const pageDesc =
    description ??
    "Welcome to my page! Check out my projects and contact me if you want to work together!";

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>{pageName}</title>
      <meta content={pageDesc} name="description" />
      <meta content={pageName} name="og:title" />
      <meta content={pageDesc} name="og:description" />
      <meta content={appName} property="og:site_name" />
      <meta content="en" property="og:locale" />
      <meta content="website" property="og:type" />
      {/* Note: using <ThemeProvider themeColor> for this in _app */}
      {/* <meta content="var(--theme-color)" name="theme-color" /> */}

      {children}
    </Head>
  );
};
