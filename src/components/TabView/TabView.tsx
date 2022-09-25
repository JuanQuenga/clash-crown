import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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
      <div>
        <ul className="flex md:gap-8 gap-1 mb-4 items-baseline text-center md:text-left">
          {tabs.map((tab) => (
            <motion.li
              key={tab.title}
              className={cn(
                "text-white",
                {
                  "border-white border-b-2 pb-2 flex-grow":
                    selectedTab?.title === tab.title,
                },
                {
                  "bg-main rounded-md p-2": selectedTab?.title !== tab.title,
                }
              )}
              role="presentation"
            >
              <a
                href={`#${tab.title}`}
                onClick={() => setSelectedTab(tab)}
                className={cn(
                  "font-supercell",
                  {
                    "text-2xl": selectedTab?.title === tab.title,
                  },
                  { "text-sm": selectedTab?.title !== tab.title }
                )}
              >
                <span>{tab.title}</span>
              </a>
            </motion.li>
          ))}
        </ul>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            role="tabpanel"
            key={selectedTab ? selectedTab.title : "empty"}
            className=""
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default TabView;
