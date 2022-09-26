import { PlayerCard } from "../../types/ClashRoyale";
import CardImage from "../CardImage";

const CardsSection = ({ cards }: { cards: PlayerCard[] }) => {
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 grid-rows-3 text-white">
        {cards.map((card, index) => {
          return <CardImage card={card} key={index} />;
        })}
      </div>
    </section>
  );
};

export default CardsSection;
