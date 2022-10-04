import Image from "next/image";

interface GameIconProps {
  fileName: string;
  size?: number;
}

const GameIcon = ({ fileName, size = 50 }: GameIconProps) => {
  return (
    <Image
      src={`/images/icons/${fileName}.png`}
      layout="fixed"
      height={size}
      width={size}
    />
  );
};

export default GameIcon;
