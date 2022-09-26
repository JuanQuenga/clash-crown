import Image from "next/image";
import { Card, PlayerCard } from "../types/ClashRoyale";
import { cardImageURL } from "../util/ClashRoyale";

const CardImage = ({ card }: { card: Card | PlayerCard }) => {
  return (
    <Image
      src={cardImageURL(card.name)}
      alt={card.name}
      layout="responsive"
      height="115%"
      width="100%"
    />
  );
};
export default CardImage;
