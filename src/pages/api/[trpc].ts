import { initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { WrapRoyale } from 'clashcrown-wraproyale'

const wrapRoyale = new WrapRoyale(process.env.REACT_APP_CLASH_ROYALE_API_TOKEN as string);
export const tagRegExp = new RegExp('^[0289PYLQGRJCUV]{3,14}$');
export const t = initTRPC.create();
export const appRouter = t.router(
	{
		player: t.procedure
			.input(z
				.string()
				.regex(tagRegExp))
			.query(async ({ input }) => {
				try {
					const playerRequest = await wrapRoyale.getPlayer(input as string);
					const battlelogRequest = await wrapRoyale.getPlayerBattlelog(input as string);
					const upcomingchestsRequest = await wrapRoyale.getPlayerUpcomingChests(input as string);

					const fullPlayer = {
						player: playerRequest,
						battlelog: battlelogRequest,
						upcomingchests: upcomingchestsRequest.items,
					}

					return JSON.stringify(fullPlayer);
				} catch (error) {
					console.log(error);

					throw new Error('Internal Server Error');
				}
			}),

		clan: t.procedure
			.input(z
				.string()
				.regex(tagRegExp))
			.query(async ({ input }) => {
				try {
					const response = await wrapRoyale.getClan(input as string);

					return JSON.stringify(response.data);
				} catch (error) {
					console.log(error);

					throw new Error('Internal Server Error');
				}
			})

	});
// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({}),
});
