import { WrapRoyaleCore } from "../../util/WrapRoyaleCore";

export const WrapRoyale = new WrapRoyaleCore(
	process.env.REACT_APP_CLASH_ROYALE_API_TOKEN as string
);