import { NextApiRequest, NextApiResponse } from "next";
import { ClashRoyaleAPI } from "../..";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const tag = req.query.tag;
	try {
		const playerRequest = await ClashRoyaleAPI.getPlayer(tag as string);
		const battlelogRequest = await ClashRoyaleAPI.getBattlelog(tag as string);
		const upcomingchestsRequest = await ClashRoyaleAPI.getUpcomingChests(tag as string);

		const fullPlayer = {
			player: playerRequest.data,
			battlelog: battlelogRequest.data,
			upcomingchests: upcomingchestsRequest.data.items,
		}

		return res.status(200).json(fullPlayer);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: error });
	}
}