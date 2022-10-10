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
        <ul className="flex md:gap-8 gap-1 mb-4 items-baseline text-left md:text-left">
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
                  "border-white border-b-2 pb-1 flex-grow cursor-default":
                    selectedTab?.title === tab.title,
                },
                {
                  "bg-main rounded-md p-2 hover:bg-pink-medium":
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
                <span>{tab.title}</span>
              </li>
            </motion.a>
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
