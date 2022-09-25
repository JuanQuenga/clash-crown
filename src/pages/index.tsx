import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SearchBox from "../components/SearchBox";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Clash Crown</title>
        <meta name="description" content="Clash Crown - Clash Royale Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home">
        <section className="flex flex-col container mx-auto h-screen text-center pt-16 px-2">
          <div className="mx-auto">
            <h1 className="font-supercell text-2xl md:text-3xl text-white pb-6 max-w-xl mx-auto drop-shadow-xl">
              Track your Clash Royale Stats and Chests
            </h1>
          </div>
          <div className="">
            <SearchBox />
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-24">
              <HeroItem />
              <HeroItem />
              <HeroItem />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const HeroItem = () => {
  return (
    <div className="">
      <div className="grid grid-cols-3 bg-dark rounded-md text-left p-6 ">
        <div className=" col-span-2">
          <h2 className="text-white text-2xl font-supercell mb-3">Hog Rider</h2>
          <p className="text-light">
            The Hog Rider punishes those who hide behind their puny walls!
          </p>
        </div>
        <div className="relative right-0">
          <Image
            src="/images/art/hog-rider.png"
            layout="responsive"
            width={700}
            height={900}
            className="exp-star drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
