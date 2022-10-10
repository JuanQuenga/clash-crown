import { motion } from "framer-motion";
import Link from "next/link";
import { PlayerClan, Role } from "../../types/ClashRoyale";
import { normalizeHashtag } from "../../utils/ClashRoyale";
import ClanBadge from "../ClanBadge";

interface ProfileClanButtonProps {
  clan?: PlayerClan;
  role?: Role;
}

const ProfileClanButton = ({ clan, role }: ProfileClanButtonProps) => {
  return (
    <Link href={`/clans/${normalizeHashtag(clan?.tag as string)}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex bg-opaque pl-2 items-center rounded-md cursor-pointer text-sm  h-10"
      >
        <div className="flex flex-col text-right mr-2">
          <small className="font-supercell text-xs -mb-1">
            {clan ? clan.name : "No Clan"}
          </small>
          <span className="capitalize">{role}</span>
        </div>
        <div className="-mr-2">
          <ClanBadge badgeId={clan?.badgeId} name={clan?.name} />
        </div>
      </motion.div>
    </Link>
  );
};

export default ProfileClanButton;
