import moment from "moment";
import Image from "next/image";
import { Card } from "../../types/ClashRoyale";
import { BattleLog } from "../../types/ClashRoyaleAPI/players/battlelog";
import ArenaIcon from "../ArenaIcon";
import CopyDeckButton from "../CopyDeckButton";
import Deck from "../Deck";
import ExperienceStar from "../ExperienceStar";

const BattleComponent = ({ battle }: { battle: BattleLog }) => {
  return (
    <div>
      <div className="grid grid-cols-6 md:grid-cols-7 justify-center items-center font-supercell overflow-hidden">
        <div className="col-span-2 md:col-span-1">
          <div className="flex flex-col items-right md:items-center">
            <span className="py-2 text-xl">
              {battle.team[0] ? battle.team[0].name : "No Name"}
            </span>
            <span className="flex flex-row items-center text-sm gap-2 mb-4">
              <Image
                src="/images/ui-icons/trophies.png"
                width={20}
                height={20}
                alt="Trophies"
              />
              <div>
                {battle.team[0]?.startingTrophies}
                <span className="text-main ml-1 text-sm">+23</span>
              </div>
            </span>
            <CopyDeckButton
              cards={battle.team[0]?.cards as Card[]}
              buttonText="Copy"
            />
          </div>
        </div>
        <div className="col-span-4 md:col-span-2">
          <Deck cards={battle.team[0]?.cards as Card[]} />
        </div>

        <div className="col-span-6 md:col-span-1 my-3 md:my-0 grid stacked items-center justify-center md:translate-x-0">
          <div className="text-magic-dark text-8xl -z-10">VS</div>
          <div className="flex flex-col items-center gap-2">
            <small className="text-light">
              {moment(battle.battleTime).utc().format("MMM D, YYYY")}
            </small>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/ui-icons/crown-blue.png"
                width={30}
                height={30}
                alt="Blue Crown"
              />
              <span className="text-2xl">
                {battle.team[0]?.crowns} - {battle.opponent[0]?.crowns}
              </span>
              <Image
                src="/images/ui-icons/crown-red.png"
                width={30}
                height={30}
                alt="Red Crown"
              />
            </div>
            <small className="text-light">{battle.type}</small>
          </div>
        </div>

        <div className="col-span-4 md:col-span-2">
          <Deck cards={battle.opponent[0]?.cards as Card[]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="flex flex-col items-center">
            {/* <div className="flex items-center">
              <ArenaIcon arenaName="" arenaId={54000020} size={70} />
            </div> */}
            <span className="py-2 text-xl flex justify-center items-center overflow-hidden">
              {/* <ExperienceStar level={14} size={40} /> */}
              {battle.opponent[0] ? battle.opponent[0].name : "No Name"}
            </span>
            <span className="flex flex-row items-center text-sm gap-2 mb-4">
              <Image
                src="/images/ui-icons/trophies.png"
                width={20}
                height={20}
                alt="trophies"
              />
              <div>{battle.opponent[0]?.startingTrophies}</div>
            </span>
            <CopyDeckButton
              cards={battle.opponent[0]?.cards as Card[]}
              buttonText="Copy"
            />
          </div>
        </div>
      </div>
      <hr className="border-magic-dark my-6" />
    </div>
  );
};

export default BattleComponent;
