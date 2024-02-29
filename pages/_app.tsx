import React, { StrictMode } from "react";
import { AppType } from "next/app";
import "../public/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {

  return (
    <StrictMode>
      <Head>
        <title>BOT SCRAPPER</title>
        <meta name="description" content="scrapper"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </StrictMode>
  )
}

export default MyApp;