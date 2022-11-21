import { motion } from "framer-motion";
import ClanBadge from "../ClanBadge";
import ExperienceStar from "../ExperienceStar";
import { MdNavigateNext } from "react-icons/md";

export interface Suggestion {
  tag: string;
  name: string;
  expLevel?: number;
  badgeId?: number;
}

interface SuggestionProps {
  suggestion: Suggestion | null;
  onClick: () => void;
}

const SuggestionBox = ({ suggestion, onClick }: SuggestionProps) => {
  return (
    <motion.div
      className="mx-auto suggestion cursor-pointer w-full"
      animate={suggestion ? "visible" : "hidden"}
      initial="hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: {
          y: "-50%",
          scale: 0.4,
          display: "none",
          transition: { display: { delay: 0.2 } },
        },
        visible: {
          y: "0%",
          scale: 1,
          opacity: 1,
          display: "block",
          transition: { display: { delay: 0 } },
        },
      }}
      onClick={onClick}
    >
      <div className=" text-white text-md text-left p-2 rounded-md bg-magic-dark hover:bg-opacity-100 bg-opacity-80">
        <div className="flex justify-between items-center text-md">
          <div className="flex flex-grow font-supercell items-center">
            {suggestion?.badgeId && (
              <div className="relative w-7 h-8 mr-2">
                <ClanBadge
                  badgeId={suggestion?.badgeId}
                  name={suggestion?.name}
                />
              </div>
            )}
            {suggestion?.expLevel && (
              <ExperienceStar level={suggestion?.expLevel as number} />
            )}
            <span className="mr-3 text-md">
              {suggestion?.name || suggestion?.tag}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuggestionBox;
