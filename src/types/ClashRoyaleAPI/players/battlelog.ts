
import { Arena, BattleType, Deckselection, ParticipantCard, PlayerClan } from "../../ClashRoyale";

export interface BattleLog {
	type: BattleType;
	battleTime: string;
	isLadderTournament: boolean;
	gameMode: GameMode
	arena: Arena;
	deckSelection: Deckselection;
	team: BattleParticipant[];
	opponent: BattleParticipant[];
}

export interface BattleParticipant {
	tag: string;
	name: string;
	startingTrophies: number;
	crowns: number;
	kingTowerHitPoints: number;
	princessTowersHitPoints: number;
	clan?: PlayerClan;
	cards: ParticipantCard[];
	elixirLeaked: number;
}

export interface GameMode {
	id: number;
	name: string;
}
