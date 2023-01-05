import { motion } from "framer-motion";
import Image from "next/image";
import { PlayerCard } from "../../types/ClashRoyale";
import PageSection from "../common/PageSection";
import CopyDeckButton from "../CopyDeckButton";
import Deck from "../Deck";

const DeckSection = ({ cards }: { cards: PlayerCard[] }) => {
  return (
    <PageSection title="Current Deck">
      <div className="">
        <Deck cards={cards} />
        <div className="flex-grow mt-2">
          <CopyDeckButton cards={cards} />
        </div>
      </div>
    </PageSection>
  );
};

export default DeckSection;
