import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BattleComponent from "../components/BattleComponent";
import HeroItem from "../components/HeroItem";
import SearchBox from "../components/SearchBox";
import { trpc } from "../utils/trpc";

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
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6 mt-24">
              <HeroItem
                title="Decks"
                description="Need a good deck to win a tournament or challenge? We got them!"
                imageSrc="/images/art/the-bowler.png"
              />
              <HeroItem
                title="Chests"
                description="Wondering when that Legendary chest is coming? We got you covered."
                imageSrc="/images/art/hog-rider.png"
              />
              <HeroItem
                title="Stats"
                description="See how well you're doing in-game and eaily share it with others!"
                imageSrc="/images/art/prince.png"
              />
            </div>
          </section>
          <section className="my-20">
            <h2 className="font-supercell text-3xl pb-6">Game Of The Day</h2>
            {/* <BattleComponent /> */}
          </section>
        </section>
      </div>
    </>
  );
};

export default Home;
