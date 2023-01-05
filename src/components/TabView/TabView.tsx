import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface TabEntry {
  title: string;
  content: React.ReactNode;
}
interface TabViewProps {
  tabs: TabEntry[];
  defaultTab?: number;
}

const TabView = ({ tabs, defaultTab = 0 }: TabViewProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Profile</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </select>
      </div>
      <ul className="hidden text-md font-medium text-center text-white rounded-lg divide-x divide-body shadow sm:flex ">
        {tabs.map((tab) => (
          <li className="w-full" key={tab.title}>
            <a
              href="#"
              className={cn(
                { "border-magic-medium": selectedTab?.title === tab.title },
                "inline-block p-2 w-full border-b-2 border-white hover:border-yellow-600 hover:text-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              )}
            >
              <div className="relative inline-block w-6 h-6">
                <Image
                  src="/images/icons/stats.png"
                  alt={selectedTab?.title}
                  layout="fill"
                />
              </div>
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      {/* <div>
        <motion.ul
          layout
          className="flex flex-row md:gap-1 gap-1 items-baseline"
        >
          {tabs.map((tab) => (
            <motion.a
              href={`#${tab.title}`}
              onClick={() => setSelectedTab(tab)}
              whileHover={{
                scale: selectedTab?.title !== tab.title ? 1.05 : 1,
              }}
              whileTap={{
                scale: selectedTab?.title !== tab.title ? 0.95 : 1,
              }}
              key={tab.title}
              className={cn(
                "text-white",
                {
                  "pb-1 border-b-2 border-yellow-600":
                    selectedTab?.title === tab.title,
                },
                {
                  "p-2 hover:border-yellow-600 hover:border-b-2":
                    selectedTab?.title !== tab.title,
                }
              )}
              role="presentation"
            >
              <li
                className={cn(
                  "font-supercell",
                  {
                    "text-lg md:text-2xl": selectedTab?.title === tab.title,
                  },
                  { "text-xs md:text-md": selectedTab?.title !== tab.title }
                )}
              >
                <div className="relative inline-block w-6 h-6">
                  <Image
                    src="/images/icons/stats.png"
                    alt={selectedTab?.title}
                    layout="fill"
                  />
                </div>
                <span>{tab.title}</span>
              </li>
            </motion.a>
          ))}
        </motion.ul>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            role="tabpanel"
            key={selectedTab ? selectedTab.title : "empty"}
            className=""
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "50vw", opacity: 0 }}
            transition={{ duration: 0.2, ease: "anticipate" }}
          >
            {selectedTab?.content}
          </motion.div>
        </AnimatePresence>
      </div> */}
    </>
  );
};

export default TabView;
