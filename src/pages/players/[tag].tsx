import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSection from "../../components/LoadingSection";
import NotFoundSection from "../../components/NotFoundSection";
import { IoReloadCircle } from "react-icons/io5";
import Image from "next/image";
import StatItem from "../../components/StatItem";
import { motion } from "framer-motion";
import { FullPlayer, Player } from "../../types/ClashRoyaleAPI/players/player";
import { PlayerCard, PlayerClan } from "../../types/ClashRoyale";
import ProfileClanButton from "../../components/ProfileClanButton";
import TabView from "../../components/TabView/TabView";
import UpcomingChests from "../../components/UpcomingChests";
import ExperienceStar from "../../components/ExperienceStar";
import ArenaIcon from "../../components/ArenaIcon";
import MiniStatItem from "../../components/MiniStatItem";
import { UpcomingChest } from "../../types/ClashRoyaleAPI/players/chests";

// Will use getServerSideProps() in the future.
// I just wanted to get more use with react hooks.

const Player = () => {
  const [playerData, setPlayerData] = useState<FullPlayer | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { tag } = router.query;

  // TODO: fix invalid tags being given

  useEffect(() => {
    if (!tag) return;
    fetchAllPlayerData();
  }, [tag]);

  function fetchAllPlayerData() {
    console.log("fetching all player data...");
    setLoading(true);
    axios
      .get("/api/players/full/" + tag)
      .then((player: any) => {
        console.log(player);
        setPlayerData(player.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  if (isLoading) return <LoadingSection />;
  if (!setPlayerData) return <NotFoundSection />;

  const tabs = [
    {
      title: "Stats",
      content: (
        <div>
          <StatGrid data={playerData?.player as Player} />
        </div>
      ),
    },
    {
      title: "Battles",
      content: <div>Battle History</div>,
    },
    {
      title: "Decks",
      content: <div>Player Decks</div>,
    },
    {
      title: "Cards",
      content: <div>Player Cards</div>,
    },
  ];

  return (
    <section className="px-2 min-h-screen">
      <div className="text-white">
        <div className="flex p-2">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MiniStatItem trophies={playerData?.player.trophies as number} />
          </motion.div>

          <div className="flex flex-col flex-grow items-center justify-center">
            <div className="flex items-center font-supercell">
              <span className="text-2xl md:text-4xl mr-2">
                {playerData?.player.name || "(empty name)"}
              </span>
              <ExperienceStar
                level={playerData?.player.expLevel as number}
                size={50}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <ArenaIcon
                arenaId={playerData?.player.arena.id as number}
                arenaName={playerData?.player.arena.name as string}
                size={100}
              />
              <div className="z-10 relative font-supercell text-sm bg-opaque rounded-md p-1 mt-2 ">
                <span className="drop-shadow-md">
                  {playerData?.player.leagueStatistics?.currentSeason?.rank
                    ? `Ranking: ${playerData.player.leagueStatistics?.currentSeason.rank}`
                    : playerData?.player.arena.name}
                </span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, delay: 0.03 }}
          >
            {playerData?.player.clan ? (
              <ProfileClanButton profile={playerData.player} />
            ) : null}
          </motion.div>
        </div>

        {/* <div>
          <h2>Achievements</h2>
          <div className="grid grid-cols-4 grid-rows-6">
            {playerData.badges.map((badge, index) => {
              return (
                <div className="flex flex-col flex-wrap">
                  <span>{badge.name}</span>
                  <img src={badge.iconUrls.large} width="100" height="100" />
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className="flex flex-row my-4 md:my-12">
        <div className="flex-grow"></div>
        <div className="flex font-supercell text-main text-xs items-center">
          updated just now{" "}
          <button
            onClick={() => fetchAllPlayerData()}
            className="flex font-supercell bg-[#2e4667] text-xs text-white rounded-md py-2 px-3 ml-4 items-center"
          >
            <IoReloadCircle className="text-xl self-center mr-2" />
            Refresh
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-6 mb-8">
        <div className="md:col-span-3">
          <Deck deck={playerData?.player?.currentDeck as PlayerCard[]} />
        </div>

        <div className="md:col-span-3">
          <UpcomingChests
            chests={playerData?.upcomingchests as UpcomingChest[]}
          />
        </div>
      </div>

      <TabView tabs={tabs} />
    </section>
  );
};

const Deck = ({ deck }: { deck: PlayerCard[] }) => {
  return (
    <div className="text-white font-supercell px-2">
      <div className="flex flex-row">
        <h1 className="text-2xl flex-1 border-b-2 border-white pb-2 mb-4">
          Current Deck
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-4 grid-rows-2">
          {deck.map((card, index) => {
            return (
              <div
                key={index}
                className="grid stacked relative justiy-center items-center overflow-hidden"
              >
                <div className="-z-10 relative">
                  <Image
                    src={`/images/cards/${card.name
                      .toLocaleLowerCase()
                      .replaceAll(" ", "-")
                      .replaceAll(".", "")}.png`}
                    alt={card.name}
                    width={150}
                    height={180}
                    layout="responsive"
                  />
                </div>
                {/* <small className="mt-12 bg-main rounded-md text-center mx-2">
                  Level {card.level}
                </small> */}
              </div>
            );
          })}
        </div>
        <div className="flex-grow">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex bg-main rounded-md p-2 gap-2"
          >
            <a
              href={`https://link.clashroyale.com/deck/en?deck=${deck
                .map((c) => c.id)
                .join(";")}`}
              className="flex-grow whitespace-nowrap"
            >
              Copy Deck
            </a>
            <Image
              src="/images/icons/copy.png"
              alt="copy deck"
              width={20}
              height={20}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const StatGrid = ({ data }: { data: Player }) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-3 text-white">
      <StatItem
        label="Highest Trophies"
        value={data.bestTrophies}
        icon="trophies"
      />
      <StatItem
        label="Current Trophies"
        value={data.trophies}
        icon="trophies"
      />
      <StatItem
        label="Challenge Cards Won"
        value={data.challengeCardsWon}
        icon="cards"
      />
      <StatItem
        label="Tourney Cards Won"
        value={data.tournamentCardsWon}
        icon="clan-crown"
      />

      <StatItem
        label="Total Donations"
        value={data.totalDonations}
        icon="playerlevel"
      />
      <StatItem label="Prev Season Rank" value={0} icon="clock" />
      <StatItem label="Prev Season Trophies" value={0} icon="elixir" />
      <StatItem label="Prev Season Highest" value={0} icon="copy" />

      <StatItem label="Wins" value={data.wins} icon="book" />
      <StatItem label="Losses" value={data.losses} icon="battle-friendly" />
      <StatItem
        label="3 Crown Wins"
        value={data.threeCrownWins}
        icon="commoncard"
      />
      <StatItem label="League" value={0} icon="spawnlevel" />
    </div>
  );
};

export default Player;
