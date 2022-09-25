import Image from "next/image";
import { PlayerClan } from "../types/ClashRoyale";

const ClanBadge = ({ clan }: { clan: PlayerClan }) => {
  return (
    <div className="w-12 h-14 relative">
      <Image
        src={`/images/clan-badges/${clan?.badgeId || 0}.png`}
        alt={clan?.name || "No Clan"}
        layout="fill"
      />
    </div>
  );
};

export default ClanBadge;
