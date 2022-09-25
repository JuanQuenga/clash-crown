import Image from "next/image";

interface ArenaIconProps {
  arenaId: number;
  arenaName: string;
  size?: number;
}

const ArenaIcon = ({ arenaId, arenaName, size = 30 }: ArenaIconProps) => {
  return (
    <>
      <div className="grid stacked mr-1 items-center text-center text-light">
        <div className="flex items-center z-0">
          <Image
            src={`/images/arenas/${arenaId}.png`}
            className="exp-star drop-shadow-lg"
            alt={arenaName}
            width={size}
            height={size}
          />
        </div>
        {/* <div className="z-10 text-[#fff]" style={{ fontSize: size / 2.5 }}>
          {arenaName}
        </div> */}
      </div>
    </>
  );
};

export default ArenaIcon;
