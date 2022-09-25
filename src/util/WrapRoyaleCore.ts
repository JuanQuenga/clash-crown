import axios, { AxiosInstance } from 'axios';

export class WrapRoyaleCore {
	private request: AxiosInstance;

	constructor(private token: string, private baseUrl: string = 'https://api.clashroyale.com/v1/') {
		this.request = axios.create({
			baseURL: this.baseUrl,
			headers: {
				'Authorization': `Bearer ${this.token}`,
				'Accept': 'application/json',
				"Content-Type": "application/json"
			},
		});
	}

	public async getPlayer(tag: string): Promise<any> {
		console.log('Getting profile for player w/ tag: ' + tag);

		return this.request.get('players/%23' + tag);
	}

	public async getBattlelog(playerTag: string): Promise<any> {
		console.log('Getting battlelog for player w/ tag: ' + playerTag);

		return this.request.get('players/%23' + playerTag + '/battlelog');
	}

	public async getUpcomingChests(playerTag: string): Promise<any> {
		console.log('Getting upcoming chests for player w/ tag: ' + playerTag);

		return this.request.get('players/%23' + playerTag + '/upcomingchests');
	}
}


// ClashRoyaleAPI.getPlayer('C9CRJ822Q')