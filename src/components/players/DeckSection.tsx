import { motion } from "framer-motion";
import Image from "next/image";
import { PlayerCard } from "../../types/ClashRoyale";
import Deck from "../Deck";

const DeckSection = ({ cards }: { cards: PlayerCard[] }) => {
  return (
    <section className="text-white font-supercell px-2">
      <div className="flex flex-row">
        <h1 className="text-2xl flex-1 border-b-2 border-white pb-2 mb-2">
          Current Deck
        </h1>
      </div>
      <div className="flex flex-col">
        <Deck cards={cards} />
        <div className="flex-grow mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex bg-main rounded-md p-2 gap-2 hover:bg-pink-medium"
          >
            <a
              href={`https://link.clashroyale.com/deck/en?deck=${cards
                .map((c) => c.id)
                .join(";")}`}
              className="flex-grow whitespace-nowrap"
            >
              Copy Deck
            </a>
            <Image
              src="/images/icons/copy.png"
              alt="copy deck"
              width={20}
              height={20}
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DeckSection;
