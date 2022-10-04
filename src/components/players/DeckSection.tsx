import { motion } from "framer-motion";
import Image from "next/image";
import { PlayerCard } from "../../types/ClashRoyale";
import CopyDeckButton from "../CopyDeckButton";
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
          <CopyDeckButton cards={cards} />
        </div>
      </div>
    </section>
  );
};

export default DeckSection;
