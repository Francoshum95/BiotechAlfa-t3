import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>BiotechAlfa</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <div className="flex items-cente min-h-screen">
        <main className="w-full flex items-center justify-center px-4 py-16 flex-col gap-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              BiotechAlfa 
            </h1>
            <button className="text-blue-600 text-3xl animate-bounce font-bold">
              <Link href={'/home'}>
                Enter
              </Link>
            </button>
        </main>
      </div>
    </>
  );
};

export default Home;
