import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white p-4">
      <div className="flex flex-row items-center">
        <div className="flex flex-row flex-grow">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Image
                src="/images/logo/clashcrown-large.png"
                alt="Clash Crown"
                width="75"
                height="75"
                className="cursor-pointer"
              />
            </Link>
          </motion.div>
        </div>

        <div className="md:hidden text-accent1 text-4xl hover:text-pink-light focus:text-pink-medium">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(isOpen ? false : true)}
          >
            <GiHamburgerMenu />
          </motion.button>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className={isOpen ? "" : "hidden md:block"}
          >
            <div className="left-0 w-full bg-black -z-10 pt-[120px] pb-5 absolute md:relative md:flex flex-row nav-links font-supercell font-extralight uppercase gap-4 text-lg text-center">
              <Link href="/players">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-pink-light cursor-pointer drop-shadow-md"
                >
                  Players
                </motion.div>
              </Link>
              <Link href="/clans">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-pink-light cursor-pointer drop-shadow-md"
                >
                  Clans
                </motion.div>
              </Link>
              <Link href="/decks">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-pink-light cursor-pointer drop-shadow-md"
                >
                  Decks
                </motion.div>
              </Link>
              <Link href="/leaderboards">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-pink-light cursor-pointer drop-shadow-md"
                >
                  Leaderboards
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
