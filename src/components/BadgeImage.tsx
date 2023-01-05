import Image from "next/image";
import { useState } from "react";
import { Badge } from "../types/ClashRoyaleAPI/players/player";

const BadgeImage = ({ badge }: { badge: Badge }) => {
  const badgeName = badge.name || "unknown";
  const [imgSrc, setImgSrc] = useState(badge.iconUrls.large as string);

  return (
    <Image
      src={imgSrc}
      alt={badgeName}
      // layout="responsive"
      height="100%"
      width="100%"
      onError={() => {
        setImgSrc("/images/cards/unknown.png");
      }}
    />
  );
};
export default BadgeImage;
