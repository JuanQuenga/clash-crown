import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSection from "../../components/LoadingSection";
import NotFoundSection from "../../components/NotFoundSection";
import { IoReloadCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import {
  Badge,
  FullPlayer,
  Player,
} from "../../types/ClashRoyaleAPI/players/player";
import { PlayerCard, Role } from "../../types/ClashRoyale";
import ProfileClanButton from "../../components/players/ProfileClanButton";
import TabView from "../../components/TabView/TabView";
import UpcomingChests from "../../components/UpcomingChests";
import ExperienceStar from "../../components/ExperienceStar";
import ArenaIcon from "../../components/ArenaIcon";
import MiniStatItem from "../../components/MiniStatItem";
import { UpcomingChest } from "../../types/ClashRoyaleAPI/players/chests";
import StatsSection from "../../components/players/StatsSection";
import CardsSection from "../../components/players/CardsSection";
import BadgeSection from "../../components/players/BadgeSection";
import DeckSection from "../../components/players/DeckSection";

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
      content: <StatsSection data={playerData?.player as Player} />,
    },
    {
      title: "Battles",
      content: (
        <div className="">
          <div className="flex h-1/2 justify-center items-start font-supercell text-4xl">
            No Recent Battle History
          </div>
        </div>
      ),
    },
    {
      title: "Badges",
      content: <BadgeSection badges={playerData?.player.badges as Badge[]} />,
    },
    {
      title: "Cards",
      content: (
        <CardsSection cards={playerData?.player.cards as PlayerCard[]} />
      ),
    },
  ];

  return (
    <section className="px-2 min-h-screen">
      <div className="text-white">
        <div className="flex p-2">
          <motion.div
            className="hidden md:block"
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
            className="hidden md:block"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, delay: 0.03 }}
          >
            <ProfileClanButton
              clan={playerData?.player.clan}
              role={playerData?.player.role as Role}
            />
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchAllPlayerData()}
            className="flex font-supercell bg-[#2e4667] text-xs text-white rounded-md py-2 px-3 ml-4 items-center hover:bg-pink-medium"
          >
            <IoReloadCircle className="text-xl self-center mr-2" />
            Refresh
          </motion.button>
        </div>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-2 mb-8">
        <div className="lg:col-span-4 md:col-span-3">
          <UpcomingChests
            chests={playerData?.upcomingchests as UpcomingChest[]}
          />
        </div>

        <div className="lg:col-span-2 md:col-span-3">
          <DeckSection
            cards={playerData?.player?.currentDeck as PlayerCard[]}
          />
        </div>
      </div>
      <TabView tabs={tabs} />
    </section>
  );
};

export default Player;
