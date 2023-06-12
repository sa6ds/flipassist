import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/font.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS as string; // Cast the variable to string

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} // Use the casted variable here
      />

      <Script id="ga-script" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
