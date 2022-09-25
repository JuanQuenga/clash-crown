import { motion } from "framer-motion";
import { PlayerClan } from "../types/ClashRoyale";
import { Player } from "../types/ClashRoyaleAPI/players/player";
import ClanBadge from "./ClanBadge";

const ProfileClanButton = ({ profile }: { profile: Player }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex bg-opaque pl-2 items-center rounded-md cursor-pointer text-sm  h-10"
    >
      <div className="flex flex-col text-right mr-2">
        <small className="font-supercell text-xs -mb-1">
          {profile.clan?.name || "No Clan"}
        </small>
        <span className="capitalize">{profile.role}</span>
      </div>
      <div className="-mr-2">
        <ClanBadge clan={profile.clan as PlayerClan} />
      </div>
    </motion.div>
  );
};

export default ProfileClanButton;
