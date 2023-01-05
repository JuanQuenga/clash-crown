import { motion } from "framer-motion";
import Image from "next/image";
import { UpcomingChest } from "../../types/ClashRoyaleAPI/players/chests";

export type PageSectionProps = {
  title: string;
  children: React.ReactNode;
};

const PageSection = ({ title, children }: PageSectionProps) => {
  return (
    <div className="relative text-white my-2">
      <div className="w-full bg-dark rounded-lg md:p-4 p-2">
        <h2 className="text-lg md:text-xl mb-2 font-supercell">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default PageSection;
