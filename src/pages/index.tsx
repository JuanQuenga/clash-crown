import type { NextPage } from "next";
import Head from "next/head";
import HeroItem from "../components/HeroItem";
import SearchBox from "../components/SearchBox/SearchBox";
import Carousel from "../components/Carousel/Carousel";
import GradientText from "../components/common/GradientText";
import { RefObject, useRef } from "react";

const Home: NextPage = () => {
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  return (
    <>
      <Head>
        <title>Clash Crown</title>
        <meta name="description" content="Clash Crown - Clash Royale Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home min-h-screen text-center pt-16 px-2">
        <div className="mx-auto">
          <h1 className="font-supercell text-2xl md:text-3xl text-white pb-6 max-w-xl mx-auto drop-shadow-xl">
            Track your <GradientText>Clash Royale Stats</GradientText> and{" "}
            <GradientText>Chests</GradientText>
          </h1>
        </div>
        <div className="h-[100px]">{/* <SearchBox /> */}</div>
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
        <section className="mb-20">
          <h2 className="font-supercell text-3xl pb-6">ClashRoyale News</h2>
          <Carousel id="main-carousel" delayInSeconds={5}>
            <div className="flex justify-center gap-2">
              <div className="flex flex-col">
                <img
                  src="https://clashroyale.com/uploaded-images-blog/_1440xAUTO_crop_center-center_90/1424339663_1665130280.png?mtime=20221007081119"
                  alt=""
                  className="object-cover h-64"
                />
                <div>
                  {" "}
                  <h3 className="font-supercell">Celebrate #OneSpecialDay!</h3>
                  <small>Oct 7, 2022</small>
                </div>
              </div>
              <div className="flex flex-col  justify-center gap-2">
                <img
                  src="https://clashroyale.com/uploaded-images-blog/_1440xAUTO_crop_center-center_90/1424339663_1665130280.png?mtime=20221007081119"
                  alt=""
                  className="object-cover h-64"
                />
                <div>
                  {" "}
                  <h3 className="font-supercell">Celebrate #OneSpecialDay!</h3>
                  <small>Oct 7, 2022</small>
                </div>
              </div>
              <div className="flex flex-col  justify-center gap-2">
                <img
                  src="https://clashroyale.com/uploaded-images-blog/_1440xAUTO_crop_center-center_90/1424339663_1665130280.png?mtime=20221007081119"
                  alt=""
                  className="object-cover h-64"
                />
                <div>
                  {" "}
                  <h3 className="font-supercell">Celebrate #OneSpecialDay!</h3>
                  <small>Oct 7, 2022</small>
                </div>
              </div>
            </div>
          </Carousel>
        </section>
        <section className="mb-20">
          <h2 className="font-supercell text-3xl pb-6">Deck Of The Day</h2>
        </section>
        <section className="mb-20">
          <h2 className="font-supercell text-3xl pb-6">Popular Cards</h2>
        </section>
      </div>
    </>
  );
};

export default Home;
