import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import Router from "next/router";
import { isValidHashtag, normalizeHashtag } from "../../utils/ClashRoyale";
import axios from "axios";
import cn from "classnames";
import SuggestionBox, { Suggestion } from "./SuggestionBox";
import TargetSwitch from "./TargetSwitch";
import HelpModal from "./HelpModal";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import LoadingSection from "../LoadingSection";
import { ImCross } from "react-icons/im";

/**
 * TODO
 * - Add modal/carousel functionality to info popup
 * - Add functionality to target select dropdown
 */

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchPlayer, setSearchPlayer] = useState(true); // Default search players, otherwise search clans
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false); // clans or players
  const animationRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const router = Router;

  /** Everytime the query state is changed, fetch the player/clan data from the API */
  useEffect(() => {
    console.log("Validating query... (useEffect)");
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag) {
      setSuggestions([]);
    } else {
      queryCurrentTag();
    }
  }, [query, searchPlayer]);

  // Load last suggestion
  useEffect(() => {
    getLastSearchFromStorage();
  }, []);

  function toggleQueryTarget() {
    setSearchPlayer(!searchPlayer);
  }

  function toggleHelpModal() {
    setShowHelp((isShown) => !isShown);
  }

  function queryCurrentTag() {
    getSuggestions();
  }

  function getQueryUrl() {
    return searchPlayer ? "/api/players/stats/" : "/api/clans/";
  }

  /** Save & Recover functions for query history (only saved to history when pushQueryToTargt() is called) */
  function saveSearchToStorage() {
    console.log("Saving to localStorage");
    const suggestion = suggestions[0];
    if (!suggestion) return;

    // Don't need to store the entire player object, just what we need
    localStorage.setItem(
      "last-searched",
      JSON.stringify({
        tag: suggestion.tag,
        name: suggestion.name,
        expLevel: suggestion.expLevel,
        badgeId: suggestion.badgeId,
      })
    );
  }
  function getLastSearchFromStorage() {
    console.log("Getting from localStorage");
    const data: any = JSON.parse(
      localStorage.getItem("last-searched") as string
    );
    if (!data) return;
    if (!data.expLevel) {
      toggleQueryTarget();
      setQuery(data.tag);
    }

    console.log("Recovered data: ", data);
    setSuggestions([data]);
  }

  /** Temporary wrapper function to call.  */
  function normalizedQuery(tagToNormalize?: string): string {
    return normalizeHashtag(tagToNormalize || query);
  }

  /** Navigate to player/clan page for current query */
  function pushQueryTarget() {
    if (suggestions.length <= 0) return;

    saveSearchToStorage();
    router.push(
      `/${searchPlayer ? "players" : "clans"}/` +
        normalizeHashtag(suggestions[0]?.tag)
    );
  }

  function getSuggestions() {
    searchPlayers();
    searchClans();
  }

  /** Fetch player data from current query in state*/
  function searchPlayers(tagFromHistory?: string) {
    console.log("getPlayerSuggestion");
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag && !tagFromHistory) return;
    const tagToFetch = tagFromHistory || normalizedQuery();
    console.log(getQueryUrl() + tagToFetch);

    setLoading(true);
    axios
      .get("/api/players/stats/" + tagToFetch)
      .then((player: any) => {
        setSuggestions((suggestions) => suggestions.concat(player.data));
      })
      .catch((err) => {
        setSuggestions([]);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  function searchClans(tagFromHistory?: string) {
    console.log("getClanSuggestion");
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag && !tagFromHistory) return;
    const tagToFetch = tagFromHistory || normalizedQuery();
    console.log(getQueryUrl() + tagToFetch);

    setLoading(true);
    axios
      .get("/api/clans/" + tagToFetch)
      .then((clan: any) => {
        console.log(clan);
        console.log("/clans/");
        setSuggestions((suggestions) => suggestions.concat(clan.data));
      })
      .catch((err) => {
        setSuggestions([]);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  /** Hide & Show the animated typing */
  function hideAnimatedTyping() {
    setIsSearching(true);
    animationRef.current?.classList.add("hidden");
    inputRef?.current?.classList.remove("hidden");
    inputRef?.current?.focus();
  }

  function showAnimatedTyping() {
    if (query !== "") return;
    animationRef.current?.classList.remove("hidden");
    inputRef.current?.classList.add("hidden");
  }

  return (
    <div className="">
      <div className="relative group w-full md:hover:scale-105 transition-all">
        <div className="absolute md:-inset-0.5 blur bg-magic-medium rounded-lg md:blur group-hover:opacity-100 opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt" />
        <div className="absolute inset-0 bg-magic-dark rounded-lg" />
        <div className="relative flex flex-row mx-auto font-semibold text-white">
          {/* <motion.div
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="flex items-center justify-center h-[48px] p-1 min-w-[44px] hover:bg-[rgba(255,255,255,0.1)] cursor-pointer rounded-md transition"
            >
              <div
                className={cn("text-[3px] loader", {
                  hidden: !isLoading,
                })}
              ></div>
              <div
                className={cn("", { hidden: isLoading })}
                onClick={() => toggleHelpModal()}
              >
                <FiInfo className="text-[2rem] stroke-white" />
              </div>
            </motion.div> */}
          {/* min-w-[13.5rem] md:min-w-[27rem] */}
          <motion.div
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className="flex flex-grow h-[48px] pl-2"
          >
            <input
              ref={inputRef}
              className="hidden bg-transparent appearance-none w-full h-[48px] uppercase border-none focus:outline-none py-3 md:text-base"
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
              onFocus={hideAnimatedTyping}
              onBlur={showAnimatedTyping}
              onKeyPress={(e) => {
                e.key === "Enter" ? pushQueryTarget() : null;
              }}
              type="text"
              value={query}
            />
            <div
              ref={animationRef}
              className="flex-1 text-left self-center h-auto py-3 cursor-text"
              onClick={hideAnimatedTyping}
            >
              <TypeAnimation
                sequence={[
                  `Enter Your In-Game Tag`,
                  3000,
                  "2YGG",
                  3000,
                  "#LLP2",
                  3000,
                  "PPYU89P8",
                  3000,
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <div className="text-xl md:text-2xl absolute right-0 top-1/4 pr-2">
            {isLoading ? (
              <div className="text-[3px] loader"></div>
            ) : suggestions.length <= 0 ? (
              <FaSearch />
            ) : (
              <button onClick={() => setIsSearching(false)}>
                <ImCross />
              </button>
            )}
          </div>

          {/* <TargetSwitch
              onClick={() => toggleQueryTarget()}
              searchPlayer={searchPlayer}
            /> */}
        </div>
      </div>
      {isSearching && !isLoading && suggestions.length >= 0 && (
        <div className="absolute w-full left-0 z-20 mt-2 md:mt-6 px-2">
          <div className="bg-dark p-2 pt-1 rounded-md flex-col gap-2">
            {suggestions.map((result) => (
              <div key={`${result.tag}-${result.name}`} className="mt-2">
                <SuggestionBox suggestion={result} onClick={pushQueryTarget} />
              </div>
            ))}
          </div>
        </div>
      )}

      <HelpModal visible={showHelp} onClick={() => toggleHelpModal()} />
    </div>
  );
};

SearchBox.displayName = "SearchBox";

export default SearchBox;

// Test Tags
// L8PR0PJ2
// R90PRV0PY
