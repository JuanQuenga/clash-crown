import * as Axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Card Storage
 */

export class CardStorage {
	public cardsMap: Map<number, CardCSV> = new Map();
	private filePath: string = path.join(__dirname, '../../json/arenas.json');

	/**
	 * Downlaod and load CSV data.
	 */
	public async load(): Promise<boolean> {
		console.log('Loading Cards JSON data.');
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
		const arenasJsonUrl = 'https://royaleapi.github.io/cr-api-data/json/cards.json';
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
	private async read(): Promise<Map<number, CardCSV>> {
		try {
			const rawJsonData: string = fs.readFileSync(this.filePath, 'utf-8');
			const cardJsonData: CardCSV[] = JSON.parse(rawJsonData) as CardCSV[];
			for (const card of cardJsonData) { this.cardsMap.set(card.id, card); }
		} catch (e) {
			console.error('Error when reading Cards JSON file.', e);
		}

		return this.cardsMap;
	}
}

export interface CardCSV {
	id: number;
	name: string;
	icon: string;
	cost: number;
	rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
	type: string; //tslint:disable-line:no-reserved-keywords
	arena: number;
	localized?: string;
}
