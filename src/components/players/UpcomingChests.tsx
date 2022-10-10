import { motion } from "framer-motion";
import Image from "next/image";
import { UpcomingChest } from "../../types/ClashRoyaleAPI/players/chests";

export interface UpcomingChestsProps {
  chests: UpcomingChest[];
}

const UpcomingChests = ({ chests }: UpcomingChestsProps) => {
  function chestSlug(chestName: string) {
    return chestName.toLowerCase().replace(/ /g, "");
  }

  return (
    <div className="text-white">
      <h2 className="text-lg md:text-2xl mb-2 font-supercell border-b-2 border-white pb-2">
        Upcoming Chests
      </h2>
      <ul className="grid grid-cols-4 lg:grid-cols-7 grid-rows-3 lg:grid-rows-2 gap-y-2">
        {chests?.map((chest, index) => {
          return (
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={`${chest.index} ${chest.name}`}
              className="flex flex-row group justify-center"
            >
              <div className="text-[0.8rem]">
                <div className="flex flex-col">
                  <div className="bg-pink-medium rounded-full p-2 -mb-8 self-start ">
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

                  <div className="hidden self-end group-hover:inline-block bg-main rounded-md p-1 text-center mt-[5rem] whitespace-nowrap uppercase absolute font-supercell">
                    {chest.name}
                  </div>
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
