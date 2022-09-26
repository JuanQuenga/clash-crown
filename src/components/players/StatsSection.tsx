import { Player } from "../../types/ClashRoyaleAPI/players/player";
import StatItem from "./StatItem";

const StatsSection = ({ data }: { data: Player }) => {
  return (
    <section>
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
    </section>
  );
};

export default StatsSection;
