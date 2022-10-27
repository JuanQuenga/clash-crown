import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import Router from "next/router";
import { isValidHashtag, normalizeHashtag } from "../utils/ClashRoyale";
import axios from "axios";
import cn from "classnames";
import SuggestionBox, { Suggestion } from "./SearchBox/SuggestionBox";
import TargetSwitch from "./SearchBox/TargetSwitch";

const NavSearchBox = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [searchPlayer, setSearchPlayer] = useState(true); // Default search players, otherwise search clans
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false); // clans or players
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
  function queryCurrentTag() {
    searchPlayer ? getPlayerSuggestion() : getClanSuggestion();
  }

  function getQueryUrl() {
    return searchPlayer ? "/api/players/stats/" : "/api/clans/";
  }

  /** Save & Recover functions for query history (only saved to history when pushQueryToTargt() is called) */
  function saveSearchToStorage() {
    console.log("Saving to localStorage");
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
    router.push(
      `/${searchPlayer ? "players" : "clans"}/` +
        normalizeHashtag(suggestion.tag)
    );
  }

  /** Fetch player data from current query in state*/
  function getPlayerSuggestion(tagFromHistory?: string) {
    console.log("getPlayerSuggestion");
    const isQueryValidTag = isValidHashtag(normalizedQuery());
    if (!isQueryValidTag && !tagFromHistory) return;
    const tagToFetch = tagFromHistory || normalizedQuery();
    console.log(getQueryUrl() + tagToFetch);

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

  function getClanSuggestion(tagFromHistory?: string) {
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
        setSuggestion(clan.data);
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
    inputRef?.current?.classList.remove("hidden");
    inputRef?.current?.focus();
  }

  function showAnimatedTyping() {
    if (query !== "") return;
    animationRef.current?.classList.remove("hidden");
    inputRef.current?.classList.add("hidden");
  }

  return (
    <div className="relative font-sans">
      <div className="px-2">
        <div className="flex flex-row w-full mx-auto font-semibold text-white border-none bg-footer border-2 rounded-md">
          <div className="flex min-w-[13.5rem] md:min-w-[27rem] h-[48px] pl-2">
            <input
              ref={inputRef}
              className="bg-transparent appearance-none w-full h-[48px] uppercase border-none focus:outline-none py-3 md:text-base"
              autoFocus
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={hideAnimatedTyping}
              onBlur={showAnimatedTyping}
              onKeyPress={(e) => {
                e.key === "Enter" ? pushQueryTarget() : null;
              }}
              type="text"
              value={query}
            />
          </div>

          {isLoading ? (
            <div className="text-[3px] loader"></div>
          ) : (
            <TargetSwitch
              onClick={() => toggleQueryTarget()}
              searchPlayer={searchPlayer}
            />
          )}
        </div>
      </div>

      <SuggestionBox suggestion={suggestion} onClick={pushQueryTarget} />
    </div>
  );
};

NavSearchBox.displayName = "NavSearchBox";

export default NavSearchBox;

// Test Tags
// L8PR0PJ2
// R90PRV0PY
