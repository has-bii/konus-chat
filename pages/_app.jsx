import "@styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Konus | Chat with Us",
  description: "Limitless chatting app",
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Konus | Chat with Us</title>
        <meta
          title="Konus | Chat with Us"
          description="Limitless chatting app"
        />
      </Head>
      <main className={inter.className}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
}
