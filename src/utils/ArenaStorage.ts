import * as Axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Arena Storage
 */

export class ArenaStorage {
	public arenasMap: Map<number, ArenaCSV> = new Map(); // Map<SCID, Arena>
	private jsonDirectory = path.join(process.cwd(), 'json');
	private filePath: string = (this.jsonDirectory + '/arenas.json');

	/**
	 * Downlaod and load CSV data.
	 */
	public async load(): Promise<boolean> {
		console.log('Loading Arenas JSON data.');
		// Fetch latest CSV file.
		await this.download();
		// Read and store the CSV data into memory.
		await this.read();
		console.log('Arenas JSON data was successfully loaded.');

		return true;
	}

	/**
	 * Download JSON file.
	 */
	private async download(): Promise<boolean> {
		const arenasJsonUrl = 'https://royaleapi.github.io/cr-api-data/json/arenas.json';
		const writer: fs.WriteStream = fs.createWriteStream(this.filePath);
		const response: Axios.AxiosResponse = await Axios.default({
			method: 'get',
			url: arenasJsonUrl,
			responseType: 'stream'
		});
		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	}

	/**
	 * Read JSON file.
	 */
	private async read(): Promise<Map<number, ArenaCSV>> {
		try {
			const rawJsonData: string = fs.readFileSync(this.filePath, 'utf-8');
			const arenaJsonData: ArenaCSV[] = JSON.parse(rawJsonData) as ArenaCSV[];
			for (const arena of arenaJsonData) { this.arenasMap.set(arena.id, arena); }
		} catch (e) {
			console.error('Error when reading Arenas JSON file.', e);
		}

		return this.arenasMap;
	}
}

export interface ArenaCSV {
	name: string;
	arena: number;
	chest_arena: string;
	tv_arena: string;
	is_in_use: boolean;
	training_camp: boolean;
	trophy_limit: number;
	demote_trophy_limit: number;
	chest_reward_multiplier: number;
	shop_chest_reward_multiplier: number;
	request_size: number;
	max_donation_count_common: number;
	max_donation_count_rare: number;
	max_donation_count_epic: number;
	icon_swf: string;
	icon_export_name: string;
	matchmaking_min_trophy_delta: number;
	matchmaking_max_trophy_delta: number;
	matchmaking_max_seconds: number;
	pvp_location: string;
	team_vs_team_location: string;
	daily_donation_capacity_limit: number;
	battle_reward_gold: number;
	bg_glow: boolean;
	min_scale: number;
	league_badge_offset_y: number;
	id: number;
	key: string;
	title: string;
	subtitle: string;
	arena_id: number;
	league_id: number;
}
