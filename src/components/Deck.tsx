import Image from "next/image";
import { Card, PlayerCard } from "../types/ClashRoyale";
import { cardImageURL } from "../util/ClashRoyale";

interface DeckProps {
  cards: Card[] | PlayerCard[];
}

const Deck = ({ cards }: DeckProps) => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2">
        {cards.map((card, index) => {
          return (
            <div key={index} className="">
              <Image
                src={cardImageURL(card.name)}
                alt={card.name}
                layout="responsive"
                height="110%"
                width="100%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Deck;
