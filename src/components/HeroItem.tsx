import Image from "next/image";

interface HeroItemProps {
  title: string;
  description: string;
  imageSrc: string;
}
const HeroItem = ({ title, description, imageSrc }: HeroItemProps) => {
  return (
    <div className="grid stacked items-center justify-center">
      <div className="bg-dark rounded-md  text-left px-6 md:py-8 py-10 min-h-[180px] min-w-[380px]">
        <h2 className="text-white text-2xl font-supercell mb-3">{title}</h2>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <p className="text-light max-w-[11rem]">{description}</p>
          </div>
        </div>
      </div>
      <div className="relative self-start">
        <div className="absolute -top-5 -right-5">
          <Image src={imageSrc} width={190} height={220} />
        </div>
      </div>
    </div>
  );
};

export default HeroItem;
