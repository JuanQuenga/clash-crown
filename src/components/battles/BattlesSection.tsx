import { BattleLog } from "../../types/ClashRoyaleAPI/players/battlelog";
import BattleComponent from "./BattleComponent";
import LoadingSection from "../LoadingSection";

interface BattlesSectionProps {
  battleLog: BattleLog[];
}

const BattlesSection = ({ battleLog }: BattlesSectionProps) => {
  if (!battleLog) return <LoadingSection />;

  return (
    <section className="relative rounded-lg p-4 bg-dark">
      {battleLog.map((battle, index) => {
        return (
          <div className="my-4" key={battle.battleTime}>
            <BattleComponent battle={battle} key={battle.battleTime} />
          </div>
        );
      })}
    </section>
  );
};

export default BattlesSection;
