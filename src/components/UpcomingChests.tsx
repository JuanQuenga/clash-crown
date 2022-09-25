import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { UpcomingChest } from "../types/ClashRoyaleAPI/players/chests";

export interface UpcomingChestsProps {
  chests: UpcomingChest[];
}

const UpcomingChests = ({ chests }: UpcomingChestsProps) => {
  function chestSlug(chestName: string) {
    return chestName.toLowerCase().replace(/ /g, "");
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl mb-2 font-supercell border-b-2 border-white pb-2 mb-4">
        Upcoming Chests
      </h1>
      <ul className="grid grid-cols-4 grid-rows-2">
        {chests?.map((chest, index) => {
          return (
            <motion.li
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              key={`${chest.index} ${chest.name}`}
              className="flex flex-row group"
            >
              <div className="text-[0.8rem]">
                <div className="flex flex-col items-center">
                  <div className="bg-main rounded-full p-2 -mb-8 self-start ">
                    <span className="font-supercell">
                      {chest.index > 0 ? `+${chest.index}` : "Next"}
                    </span>
                  </div>

                  <div className="relative w-20 h-20">
                    <Image
                      src={`/images/chests/${chestSlug(chest.name)}.png`}
                      alt={chest.name}
                      layout="fill"
                      className="-z-10"
                    />
                  </div>

                  {/* <div className="hidden group-hover:inline-block text-center -bottom-5 whitespace-nowrap uppercase">
                    {chest.name}
                  </div> */}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingChests;
