import { RefObject, useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import Router from "next/router";
import { isValidHashtag, normalizeHashtag } from "../utils/ClashRoyale";
import axios from "axios";
import { MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";
import ExperienceStar from "./ExperienceStar";
import cn from "classnames";
import ClanBadge from "./ClanBadge";

/**
 * TODO
 * - Add modal/carousel functionality to info popup
 * - Add functionality to target select dropdown
 */

type Suggestion = {
  tag: string;
  name: string;
  expLevel?: number;
  badgeId?: number;
};

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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
      <div className="flex flex-row max-w-sm md:max-w-xl mx-auto font-semibold z-50  text-black">
        <div className="flex items-center justify-center h-[48px] p-1 min-w-[44px] bg-main rounded-l-md hover:bg-pink-medium cursor-pointer">
          <div
            className={cn("text-[3px] loader", {
              hidden: !isLoading,
            })}
          ></div>
          <div className={cn("", { hidden: isLoading })}>
            <FiInfo className="text-[2rem] stroke-white" />
          </div>
        </div>

        <div className="flex-grow flex self-start h-[48px] pl-2 bg-white">
          <input
            className="hidden h-[48px] uppercase flex-grow bg-transparent border-none focus:outline-none py-3 md:text-base"
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
        </div>

        <div
          onClick={() => toggleQueryTarget()}
          className="grid stacked items-center cursor-pointer px-1 bg-white rounded-r-md"
        >
          <div
            className={cn(
              "flex justify-start p-0 items-center bg-opaque rounded-md shadow-[#717171] shadow-inner",
              {
                "justify-end": !searchPlayer,
              }
            )}
            // data-isOn={searchPlayer}
          >
            <motion.div
              className="rounded-md bg-footer w-[30px] h-[40px] flex items-center p-[4px] group-hover:bg-pink-medium"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            >
              <img
                src={`/images/icons/${
                  searchPlayer ? "members" : "no-clan"
                }.png`}
                alt="icon"
                className="w-auto"
              />
            </motion.div>
          </div>
          <div
            className={cn(
              "flex h-[34px] select-none z-10 items-center justify-start px-2",
              {
                "justify-end w-[100px]": searchPlayer,
                "w-[90px]": !searchPlayer,
              }
            )}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="text-white text-md"
            >
              {searchPlayer ? "Players" : "Clans"}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Suggestion dropdown */}
      <motion.div
        className="max-w-sm md:max-w-xl mx-auto suggestion cursor-pointer"
        animate={suggestion ? "visible" : "hidden"}
        initial="hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={{
          hidden: {
            y: "-50%",
            scale: 0.4,
            display: "none",
            transition: { display: { delay: 0.2 } },
          },
          visible: {
            y: "0%",
            scale: 1,
            opacity: 1,
            display: "block",
            transition: { display: { delay: 0 } },
          },
        }}
        onClick={pushQueryTarget}
      >
        <div className=" text-white text-md text-left p-2 rounded-md bg-main mt-2 mx-4 md:mx-24">
          <div className="flex justify-between items-center ">
            <div className="flex flex-grow font-supercell items-center">
              {suggestion?.badgeId && (
                <div className="relative w-7 h-8 mr-2">
                  <ClanBadge
                    badgeId={suggestion?.badgeId}
                    name={suggestion?.name}
                  />
                </div>
              )}
              {suggestion?.expLevel && (
                <ExperienceStar level={suggestion?.expLevel as number} />
              )}
              <span className="mr-3 text-lg">
                {suggestion?.name || suggestion?.tag}
              </span>
            </div>
            <span>Go</span>
            <MdNavigateNext className="text-2xl" />
          </div>
        </div>
      </motion.div>

      {/* Help/Info modal dropdown */}
      <motion.div
        animate={showHelp ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          hidden: { y: "-80%", scale: 0, display: "none" },
          visible: { y: 0, scale: 1, display: "block" },
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
