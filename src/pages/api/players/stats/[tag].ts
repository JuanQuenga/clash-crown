import { NextApiRequest, NextApiResponse } from "next";
import { WrapRoyale } from "../..";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const tag = req.query.tag;
	try {
		const response = await WrapRoyale.getPlayer(tag as string);

		return res.status(200).json(response.data);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: error });
	}
}