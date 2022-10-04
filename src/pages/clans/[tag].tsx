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

import MiniStatItem from "../../components/MiniStatItem";
import { Clan, ClanMember } from "../../types/ClashRoyaleAPI/clans/clan";
import Head from "next/head";
import TabView from "../../components/TabView/TabView";
import Image from "next/image";
import MemberList from "../../components/MemberList";

const Clan = () => {
  const [clanData, setClanData] = useState<Clan | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { tag } = router.query;

  // TODO: fix invalid tags being given

  useEffect(() => {
    if (!tag) return;
    fetchClanData();
  }, [tag]);

  function fetchClanData() {
    console.log("fetching clan data...");
    setLoading(true);
    axios
      .get("/api/clans/" + tag)
      .then((clan: any) => {
        console.log(clan);
        setClanData(clan.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  if (isLoading) return <LoadingSection />;
  if (!setClanData) return <NotFoundSection />;

  const tabs = [
    {
      title: "Members",
      content: <MemberList members={clanData?.memberList as ClanMember[]} />,
    },
  ];

  return (
    <>
      <Head>
        <title>{(clanData?.name || clanData?.tag) + " | Clash Crown"}</title>
      </Head>
      <section className="px-2 min-h-screen">
        <div className="flex gap-4 mb-4">
          <div className="grid stacked items-center">
            <div className="relative">
              <Image
                src={`/images/clan-badges/${clanData?.badgeId}.png`}
                alt={clanData?.name}
                layout="intrinsic"
                width={77}
                height={95}
              />
            </div>
            <div className="flex items-center">
              <Image
                src={`/images/war/${getLeague(
                  clanData?.clanWarTrophies || 0
                )}.png`}
                alt={clanData?.name}
                layout="intrinsic"
                width={80}
                height={110}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="font-supercell text-2xl md:text-4xl">
              {clanData?.name}
            </h1>
            <p>{clanData?.description || "No Description."}</p>
          </div>
        </div>
        <TabView tabs={tabs} />
      </section>
    </>
  );
};

function getLeague(score: number): string {
  switch (true) {
    // Bronze
    case score < 200:
      return "bronze-1";
    case score < 400:
      return "bronze-2";
    case score < 600:
      return "bronze-3";
    // Silver
    case score < 900:
      return "silver-1";
    case score < 1200:
      return "silver-2";
    case score < 1500:
      return "silver-3";
    // Gold
    case score < 2000:
      return "gold-1";
    case score < 2500:
      return "gold-2";
    case score < 3000:
      return "gold-3";
    // Legendary
    case score >= 3000:
      return "legendary";
    default:
      return "bronze-1";
  }
}

export default Clan;
