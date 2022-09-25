import axios from "axios";
import { useEffect, useState } from "react";
import { BattleLog } from "../types/ClashRoyaleAPI/players/battlelog";
import moment from "moment";

export interface TrophyGraphProps {
  tag: string;
}

const TrophyGraph = ({ tag }: TrophyGraphProps) => {
  const [logData, setLogData] = useState<BattleLog[]>([]);
  const [isLoading, setLoading] = useState(true);

  const logTimes = [{ battleTime: 0 }].map((log) => {
    return moment(log.battleTime).utc().format("MMM D");
  });
  const logTrophies = logData.map((log) => log.team[0]?.startingTrophies);

  useEffect(() => {
    if (!tag) return;
    fetchBattlelog();
  }, [tag]);

  function fetchBattlelog() {
    console.log("fetching battlelog for: ", tag);
    setLoading(true);
    axios
      .get("/api/battlelogs/" + tag)
      .then((player: any) => {
        console.log(logData);
        setLogData(player.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="mt-4 text-white">
      <h1 className="text-white font-supercell text-3xl">
        Trophy Progression {logTimes.length} - {logTrophies.length}
      </h1>
      {/* <ChartistGraph data={data} options={options} type={type} /> */}
    </div>
  );
};

export default TrophyGraph;
