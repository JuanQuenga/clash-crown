import { PlayerCard } from "../../types/ClashRoyale";
import CardImage from "../CardImage";

const CardsSection = ({ cards }: { cards: PlayerCard[] }) => {
  return (
    <section>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-11 grid-rows-3 text-white">
        {cards.map((card, index) => {
          return <CardImage card={card} key={index} />;
        })}
      </div>
    </section>
  );
};

export default CardsSection;
