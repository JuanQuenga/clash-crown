import { WrapRoyaleCore } from "../../utils/WrapRoyaleCore";

export const ClashRoyaleAPI = new WrapRoyaleCore(
	process.env.REACT_APP_CLASH_ROYALE_API_TOKEN as string, process.env.REACT_APP_CLASH_ROYALE_API_BASE_URL as string
);
