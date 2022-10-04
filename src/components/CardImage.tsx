import Image from "next/image";
import { Card, PlayerCard } from "../types/ClashRoyale";

const CardImage = ({ card }: { card: Card | PlayerCard }) => {
  return (
    <Image
      src={`/images/cards/${card.name
        .toLocaleLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(".", "")}.png`}
      alt={card.name}
      layout="responsive"
      height="115%"
      width="100%"
    />
  );
};
export default CardImage;
