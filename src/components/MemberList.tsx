import { ClanMember } from "../types/ClashRoyaleAPI/clans/clan";
import ArenaIcon from "./ArenaIcon";
import ExperienceStar from "./ExperienceStar";
import GameIcon from "./GameIcon";

interface MemberListProps {
  members: ClanMember[];
}

const MemberList = ({ members }: MemberListProps) => {
  return (
    <>
      {members.map((member, index) => {
        return (
          <div className="flex gap-2 odd:bg-main items-center" key={index}>
            <div>#{index + 1}</div>
            <div className="font-supercell flex-grow">{member.name}</div>
            <div>
              <ExperienceStar level={member.expLevel} />
            </div>
            <div>
              {/* <ArenaIcon
                arenaId={member.arena.id}
                arenaName={member.arena.name}
                size={50}
              /> */}
            </div>
            <div className="flex items-center">
              <GameIcon fileName="trophy" size={30}></GameIcon>
              <div>{member.trophies}</div>
            </div>
            {/* <div>{JSON.stringify(member.arenaImage)}</div> */}
          </div>
        );
      })}
    </>
  );
};

export default MemberList;
