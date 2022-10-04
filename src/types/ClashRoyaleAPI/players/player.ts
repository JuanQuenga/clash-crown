import { Arena, IconUrls, PlayerCard, PlayerClan } from "../../ClashRoyale";
import { BattleLog } from "./battlelog";
import { UpcomingChest } from "./chests";

export interface FullPlayer {
	player: Player;
	battlelog: BattleLog[];
	upcomingchests: UpcomingChest[];
}

export interface Player {
	tag: string;
	name: string;
	arena: Arena;
	expPoints: number
	starPoints: number;

	wins: number;
	losses: number

	badges: Badge[];
	achievements: Achievement[];

	cards: PlayerCard[];
	currentDeck: PlayerCard[];
	currentFavouriteCard: PlayerCard;

	expLevel: number;
	trophies: number;
	bestTrophies: number;
	battleCount: number;
	threeCrownWins: number;

	challengeCardsWon: number;
	challengeMaxWins: number;

	tournamentCardsWon: number;
	tournamentBattleCount: number;

	clan?: PlayerClan;
	role: string;
	warDayWins: number;
	clanCardsCollected: number;

	donations: number;
	donationsReceived: number;
	totalDonations: number;

	leagueStatistics?: LeagueStatistics;
}

export interface LeagueStatistics {
	currentSeason: Season;
	previousSeason: Season;
	bestSeason: Season;
}

export interface Season {
	id?: string;
	rank?: number;
	trophies: number;
	bestTrophies?: number;
}

export interface Badge {
	name: string;
	level: number;
	maxLevel: number;
	progress: number;
	target: number;
	iconUrls: IconUrls;
}

export interface Achievement {
	name: string;
	stars: number;
	value: number;
	target: number;
	info: string;
	completionInfo?: string;
}
