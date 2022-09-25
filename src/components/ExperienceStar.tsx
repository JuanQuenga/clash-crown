import Image from "next/image";

interface ExperienceStarProps {
  level: number;
  size?: number;
}

const ExperienceStar = ({ level, size = 30 }: ExperienceStarProps) => {
  return (
    <>
      <div className="grid stacked mr-1 items-center text-center text-light">
        <div className="flex items-center z-0">
          <Image
            src="/images/icons/playerlevel.png"
            className="exp-star drop-shadow-lg"
            width={size}
            height={size}
          />
        </div>
        <div className="z-10 text-[#fff]" style={{ fontSize: size / 2.5 }}>
          {level}
        </div>
      </div>
    </>
  );
};

export default ExperienceStar;
