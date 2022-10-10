import Image from "next/image";
import { PlayerClan } from "../types/ClashRoyale";

const ClanBadge = ({
  badgeId,
  name,
}: {
  badgeId?: number | string;
  name?: string;
}) => {
  return (
    <Image
      src={`/images/clan-badges/${badgeId || 0}.png`}
      alt={name || "No Clan"}
      layout="fill"
    />
  );
};

export default ClanBadge;
