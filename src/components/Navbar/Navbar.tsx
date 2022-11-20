import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import NavSearchBox from "./NavSearchBox";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import SearchBox from "../SearchBox/SearchBox";
import { useRouter } from "next/router";

interface INavLink {
  href: string;
  name: string;
}

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [positionClass, setPositionClass] = useState("relative px-[5rem]");
  const router = useRouter();

  console.log(router.pathname);

  const links: INavLink[] = [
    { href: "/players", name: "Players" },
    { href: "/clans", name: "Clans" },
    { href: "/decks", name: "Decks" },
  ];

  useEffect(() => {
    console.log("use effect: ", router.asPath);
    if (router.pathname === "/") {
      setPositionClass(
        "absolute top-[17rem] 2xl:px-[30%] lg:px-[25%] -sm:px-3 "
      );
    } else {
      setPositionClass("relative px-[5rem]");
    }
  }, [router.asPath]);

  return (
    <nav
      className={`${
        showMenu ? "bg-dark md:bg-transparent" : ""
      } mb-6 text-white transition-all ease-in-out`}
    >
      <div className="cc-container">
        <div className="flex flex-wrap items-center p-2 md:p-2">
          <div className="cursor-pointer relative w-12 h-12 md:h-20 md:w-20 hover:scale-105 transition-transform">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/images/logo/clashcrown-large.png"
                  alt="Clash Crown"
                  layout="responsive"
                  height={110}
                  width={110}
                />
              </a>
            </Link>
          </div>

          <div className="flex-grow">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className={`${positionClass} left-0 w-full px-[10rem]`}
            >
              <SearchBox />
            </motion.div>
          </div>

          {/* open/close button for mobile nav */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="bg-magic-medium bg-opacity-90 p-2 md:order-3 inline-flex items-center text-white rounded-lg md:hidden focus:border-transparent focus:ring-0"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </motion.button>

          {/* nav links */}
          <div
            className={`${
              showMenu ? "" : "hidden"
            } w-full md:block md:w-auto font-supercell`}
          >
            <ul className="flex h-full flex-col justify-items-center text-center gap-2 p-2 pb-2 md:flex-row md:border-0 lg:text-xl md:space-x-8 md:mt-0 border-purple-200">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} passHref>
                    <NavLink name={link.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = forwardRef(({ name }: { name: string }, ref) => {
  return (
    <a>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hover:text-magic-light cursor-pointer drop-shadow-md text-xl bg-magic-dark rounded-md p-2 md:rounded-none md:p-0 md:bg-transparent"
      >
        {name}
      </motion.div>
    </a>
  );
});
NavLink.displayName = "NavLink";

export default Navbar;
