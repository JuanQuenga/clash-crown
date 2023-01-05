import Image from "next/image";
import { Badge } from "../../types/ClashRoyaleAPI/players/player";
import BadgeImage from "../BadgeImage";

const BadgeSection = ({ badges }: { badges: Badge[] }) => {
  if (badges.length === 0)
    return (
      <div className="font-supercell text-4xl flex justify-center items-center">
        No Badges To Show
      </div>
    );

  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 grid-rows-3 text-white">
        {badges.map((badge) => {
          return <BadgeImage badge={badge} key={badge.name} />;
        })}
      </div>
    </section>
  );
};

export default BadgeSection;
