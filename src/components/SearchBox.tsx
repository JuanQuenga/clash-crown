import { RefObject, useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FiInfo } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import Router from "next/router";
import { isValidHashtag, normalizeHashtag } from "../utils/ClashRoyale";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";
import ExperienceStar from "./ExperienceStar";

/**
 * TODO
 * - Add modal/carousel functionality to info popup
 * - Add functionality to target select dropdown
 */

interface Suggestion {
  tag: string;
  name: string;
  expLevel: number;
}

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  // const [searchType, setSearchType] = useState("tag"); // tag or username (todo)
  const [searchTarget, setSearchTarget] = useState("players"); // clans or players
  const animationRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const router = Router;

  /** Everytime the query state is changed, fetch the player/clan data from the API */
  useEffect(() => {
    console.log("useEffect");
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag) {
      setSuggestion(null);
    } else {
      getSuggestion();
    }
  }, [query]);

  useEffect(() => {
    console.log("Getting search history from localStorage");
    getLastSearchFromStorage();
  }, []);

  /** Save & Recover functions for query history (only saved to history when pushQueryToTargt() is called) */
  function saveSearchToStorage() {
    console.log("Saving to localStorage");
    if (!suggestion) return;

    // Don't need to store the entire player object, just what we need
    localStorage.setItem(
      "last-search",
      JSON.stringify({
        tag: suggestion.tag,
        name: suggestion.name,
        expLevel: suggestion.expLevel,
      })
    );
  }
  function getLastSearchFromStorage() {
    const data: any = JSON.parse(localStorage.getItem("last-search") as string);
    if (!data) return;

    console.log("Recovered data: ", data);
    setSuggestion(data);
  }

  /** Temporary wrapper function to call.  */
  function normalizedQuery(tagToNormalize?: string): string {
    return normalizeHashtag(tagToNormalize || query);
  }

  /** Navigate to player/clan page for current query */
  function pushQueryTarget() {
    if (!suggestion) return;

    saveSearchToStorage();
    router.push(`/${searchTarget}/${normalizeHashtag(suggestion.tag)}`);
  }

  /** Fetch player data from current query in state*/
  function getSuggestion(tagFromHistory?: string) {
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag && !tagFromHistory) return;
    const tagToFetch = tagFromHistory || normalizedQuery();
    console.log("fetching data for: ", tagToFetch);

    setLoading(true);
    axios
      .get("/api/players/stats/" + tagToFetch)
      .then((player: any) => {
        setSuggestion(player.data);
      })
      .catch((err) => {
        setSuggestion(null);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  /** Hide & Show the animated typing */
  function hideAnimatedTyping() {
    animationRef.current?.classList.add("hidden");
    inputRef.current?.classList.remove("hidden");
    inputRef.current?.focus();
  }

  function showAnimatedTyping() {
    if (query !== "") return;
    animationRef.current?.classList.remove("hidden");
    inputRef.current?.classList.add("hidden");
  }

  return (
    <div>
      <div className="flex flex-row relative bg-white text-black rounded-md max-w-sm md:max-w-xl mx-auto font-semibold z-50">
        <div className="flex items-center mr-2 text-black h-auto border-r-2 border-pink-dark pl-2 cursor-pointer">
          <span className="text-left">Players</span>
          <div className="caret text-pink-medium text-2xl h-auto">
            <HiChevronDown />
          </div>
          <ul className="hidden list-none text-left whitespace-nowrap">
            <li>Players</li>
          </ul>
        </div>
        <input
          autoFocus
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={hideAnimatedTyping}
          onBlur={showAnimatedTyping}
          onKeyPress={(e) => {
            e.key === "Enter" ? pushQueryTarget() : null;
          }}
          type="text"
          value={query}
          className="hidden uppercase w-2 flex-grow bg-transparent h-auto border-none focus:outline-none py-3 md:text-base"
        />
        <div
          ref={animationRef}
          className="flex-1 text-left self-center h-auto py-3 cursor-text"
          onClick={hideAnimatedTyping}
        >
          <TypeAnimation
            sequence={[
              "Enter Your Player Tag",
              3000,
              "2YGG",
              3000,
              "#LLCP8YG8",
              3000,
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
          />
        </div>
        <div className="flex self-center gap-2">
          <div className="text-white bg-pink-medium p-3 text-center rounded-r-md text-2xl  self-center">
            <button
              onClick={() => setShowHelp(showHelp ? false : true)}
              className="flex"
            >
              <div
                className={`text-[2px] loader ${isLoading ? "" : "hidden"}`}
              ></div>
              <div className={isLoading ? "hidden" : ""}>
                <FiInfo />
              </div>
            </button>
          </div>
        </div>
      </div>
      <motion.div
        // animate={suggestion && query.trim().length > 0 ? "visible" : "hidden"}
        animate={suggestion ? "visible" : "hidden"}
        initial="hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={{
          hidden: { y: "-118%" },
          visible: { y: 0 },
        }}
        onClick={pushQueryTarget}
        className="max-w-sm md:max-w-xl mx-auto suggestion -z-10 cursor-pointer"
      >
        <div className=" text-white text-md text-left p-2 rounded-md bg-main mt-2 mx-4 md:mx-24">
          <div className="flex justify-between items-center ">
            <div className="flex flex-grow font-supercell items-center">
              <ExperienceStar level={suggestion?.expLevel as number} />
              <span className="mr-3 text-lg">
                {suggestion?.name || suggestion?.tag}
              </span>
            </div>
            <span>Go</span>
            <MdNavigateNext className="text-2xl" />
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={showHelp ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          hidden: { y: "-100vh", display: "none" },
          visible: { y: 0, display: "flex" },
        }}
        className="flex flex-row justify-center gap-2 overflow-hidden mt-2"
      >
        <motion.img variants={{}} src="/images/steps/step-1-light.jpg" />
        <motion.img variants={{}} src="/images/steps/step-2-light.jpg" />
        <motion.img variants={{}} src="/images/steps/step-3-light.jpg" />
      </motion.div>
    </div>
  );
};

export default SearchBox;

// Test Tags
// L8PR0PJ2
// R90PRV0PY
