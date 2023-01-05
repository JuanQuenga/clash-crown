import { useState } from "react";
import cn from "classnames";

interface TabSelectorProps {
  activeTab: string;
  label: string;
  onClick: (label: string) => void;
}

const TabSelector = ({ activeTab, label, onClick }: TabSelectorProps) => {
  const onClickTabItem = () => {
    onClick(label);
  };

  return (
    <li className="mr-2" role="presentation">
      <button
        className="inline-block p-4 rounded-t-lg border-b-2 border-transparent"
        id="profile-tab"
        data-tabs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
        onClick={onClickTabItem}
      >
        {label}
      </button>
    </li>
  );
};

const Tab = ({ label, children }: { label: string; children: JSX.Element }) => {
  return <>{children}</>;
};

const Tabs = ({ children }: { children: JSX.Element[] }) => {
  const [activeTab, setActiveTab] = useState("Stats");
  const onClickTabItem = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {/* Tab List */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ol
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {children.map((child) => {
            const { label } = child.props;
            return (
              <TabSelector
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
      </div>

      {/* Tab Content */}
      <div id="" className="">
        {children.map((child) => {
          const { label } = child.props;
          // if (label !== activeTab) return undefined;
          return (
            <>
              <div className={cn({ hidden: label !== activeTab })} key={label}>
                {child.props.children}
                Test 1
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export { Tabs, Tab };
