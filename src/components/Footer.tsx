import Link from "next/link";
import { FaGithubSquare, FaTwitterSquare, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const externalLinks = [
    {
      icon: <FaGithubSquare className="text-2xl mr-2" />,
      label: "View code on Github",
      url: "/",
    },
    // {
    //   icon: <FaTwitterSquare className="text-2xl mr-2" />,
    //   label: "Twitter",
    //   url: "https://twitter.com/QuengaJuan",
    // },
    // {
    //   icon: <FaDiscord className="text-2xl mr-2" />,
    //   label: "Discord",
    //   url: "https://discord.gg/clashroyale",
    // },
  ];
  const interenalLinks = [
    {
      label: "Top Decks",
      url: "/",
    },
    {
      label: "Top Cards",
      url: "/",
    },
    {
      label: "Top Players",
      url: "/",
    },
    {
      label: "Top Clans",
      url: "/",
    },
  ];

  return (
    <footer className="cc-container text-footer pb-4 p-4 mt-72">
      <div className="flex flex-row gap-4 font-supercell">
        {interenalLinks.map((link, index) => (
          <div key={index}>
            <Link href={link.url} className=" hover:text-pink-dark">
              {link.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-row font-supercell gap-4 md:gap-8 mx-auto mt-8">
        {externalLinks.map((link, index) => (
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex hover:text-pink-dark items-center"
            key={index}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-12 mb-2 md:max-w-[60%] max-w-[50%]">
        <p>
          This content is not affiliated with, endorsed, or specifically
          approved by Supercell and Supercell is not responsible for it. For
          more information see{" "}
          <a
            href="#"
            className="font-bold text-pink-dark hover:text-pink-medium"
            target="_blank"
            rel="noreferrer"
          >
            Supercell&apos;s Fan Content Policy
          </a>
          . See our{" "}
          <a
            href="#"
            className="font-bold text-pink-dark hover:text-pink-medium"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          for additional detail.
          <strong> v1.2</strong>
        </p>
      </div>
      <span className="text-pink-dark">
        © 2022 ClashCrown. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
