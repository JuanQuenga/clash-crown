import { Card, PlayerCard } from "../types/ClashRoyale";
import CardImage from "./CardImage";

interface DeckProps {
  cards: Card[] | PlayerCard[];
}

const Deck = ({ cards }: DeckProps) => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2">
        {cards.map((card, index) => {
          return (
            <div key={index} className="-m-[2px]">
              <CardImage card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Deck;
