import cn from "classnames";
import { motion } from "framer-motion";

interface TargetSwitchProps {
  onClick: () => void;
  searchPlayer: boolean;
}

const TargetSwitch = ({ onClick, searchPlayer }: TargetSwitchProps) => {
  return (
    <div
      onClick={onClick}
      className="grid stacked items-center cursor-pointer px-1"
    >
      <div
        className={cn(
          "flex justify-start p-0 min-w-[106px] items-center bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.2)] rounded-md transition-colors duration-1000 group-hover:duration-200 animate-tilt",
          {
            "justify-end": !searchPlayer,
          }
        )}
        // data-isOn={searchPlayer}
      >
        <motion.div
          className="rounded-md w-[30px] h-[40px] flex items-center p-[4px] bg-[rgba(255,255,255,0.1)] shadow-md"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        >
          <img
            src={`/images/icons/${searchPlayer ? "members" : "no-clan"}.png`}
            alt="icon"
            className="w-auto"
          />
        </motion.div>
      </div>
      <div
        className={cn(
          "flex h-[34px] select-none z-10 items-center justify-start px-2",
          {
            "justify-end w-[100px]": searchPlayer,
            "w-[90px]": !searchPlayer,
          }
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="text-white text-md"
        >
          {searchPlayer ? "Players" : "Clans"}
        </motion.span>
      </div>
    </div>
  );
};

export default TargetSwitch;
