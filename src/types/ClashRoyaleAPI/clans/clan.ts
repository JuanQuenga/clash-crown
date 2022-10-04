import { Arena, Location } from "../../ClashRoyale";

export interface Clan {
	tag: string;
	name: string;
	description: string;
	badgeId: number;
	location: Location;

	clanScore: number;
	requiredTrophies?: number;
	clanWarTrophies: number;
	donationsPerWeek: number;

	clanChestStatus: string;
	clanChestLevel: number;
	clanChestMaxLevel: number;

	members: number;
	memberList: ClanMember[];
}

export interface ClanMember {
	tag: string;
	name: string;
	role: string;
	lastSeen: string;
	expLevel: number;
	trophies: number;
	arena: Arena;
	clanRank: number;
	previousClanRank: number;
	donations: number;
	donationsReceived: number;
	clanChestPoints: number;
}

