import Image from "next/image";
import { useState } from "react";
import { Card, PlayerCard } from "../types/ClashRoyale";

const CardImage = ({ card }: { card: Card | PlayerCard }) => {
  const cardName = card.name || "unknown";
  const [imgSrc, setImgSrc] = useState(
    `/images/cards/${cardName
      .toLocaleLowerCase()
      .replaceAll(" ", "-")
      .replaceAll(".", "")}.png`
  );

  return (
    <Image
      src={imgSrc}
      alt={cardName}
      layout="responsive"
      height="115%"
      width="100%"
      onError={() => {
        setImgSrc("/images/cards/unknown.png");
      }}
    />
  );
};
export default CardImage;
