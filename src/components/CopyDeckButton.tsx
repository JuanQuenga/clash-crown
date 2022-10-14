import { motion } from "framer-motion";
import Image from "next/image";
import { Card, PlayerCard } from "../types/ClashRoyale";

interface CopyDeckButtonProps {
  cards: Card[] | PlayerCard[];
  buttonText?: string;
}

const CopyDeckButton = ({
  cards,
  buttonText = "Copy Deck",
}: CopyDeckButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex bg-main rounded-md p-2 gap-2 hover:bg-magic-medium"
  >
    <a
      href={`https://link.clashroyale.com/deck/en?deck=${cards
        .map((c) => c.id)
        .join(";")}`}
      className="flex-grow whitespace-nowrap"
    >
      {buttonText}
    </a>
    <Image
      src="/images/icons/copy.png"
      alt="copy deck"
      width={20}
      height={20}
    />
  </motion.button>
);

export default CopyDeckButton;
