import { motion } from "framer-motion";
import Image from "next/image";
import { UpcomingChest } from "../../types/ClashRoyaleAPI/players/chests";
import PageSection from "../common/PageSection";

export interface UpcomingChestsProps {
  chests: UpcomingChest[];
}

const UpcomingChests = ({ chests }: UpcomingChestsProps) => {
  function chestSlug(chestName: string) {
    return chestName.toLowerCase().replace(/ /g, "");
  }

  return (
    <PageSection title="Upcoming Chests">
      <div className="flex overflow-hidden overflow-x-scroll md:grid grid-cols-4">
        {chests?.map((chest, index) => {
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={`${chest.index} ${chest.name}`}
              className="group justify-center z-0 inline-block"
            >
              <div className="text-[0.8rem]">
                <div className="flex flex-col">
                  <div className="bg-magic-medium rounded-full p-2 -mb-8 self-start z-10">
                    <span className="font-supercell">
                      {chest.index > 0 ? `+${chest.index}` : "Next"}
                    </span>
                  </div>

                  <div className="relative w-20 h-20 z-0">
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
            </motion.div>
          );
        })}
      </div>
    </PageSection>
  );
};

export default UpcomingChests;
