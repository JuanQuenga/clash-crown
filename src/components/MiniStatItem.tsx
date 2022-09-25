import { motion } from "framer-motion";
import Image from "next/image";
import { PlayerClan } from "../types/ClashRoyale";
import { Player } from "../types/ClashRoyaleAPI/players/player";
import ClanBadge from "./ClanBadge";

const MiniStatItem = ({ trophies }: { trophies: number }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex bg-opaque pr-2 items-center rounded-md cursor-pointer text-sm  h-10 "
    >
      <div className="-ml-2">
        <Image src={`/images/icons/trophies.png`} width={50} height={50} />
      </div>
      <div className="flex flex-col text-left ml-2">
        <small className="font-supercell text-sm -mb-1">{trophies}</small>
        <small className="capitalize">Trophies</small>
      </div>
    </motion.div>
  );
};

export default MiniStatItem;
