import TabView from "../../components/TabView/TabView";

const Players = () => {
  const tabs = [
    {
      title: "Stats",
      content: <div>Your Player stats</div>,
    },
    {
      title: "Battles",
      content: <div>Battle History</div>,
    },
    {
      title: "Decks",
      content: <div>Player Decks</div>,
    },
    {
      title: "Cards",
      content: <div>Player Cards</div>,
    },
  ];

  return (
    <section className="h-screen">
      <TabView tabs={tabs} />
    </section>
  );
};

export default Players;
