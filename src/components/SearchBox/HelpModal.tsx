import { motion } from "framer-motion";
import { useState } from "react";

const HelpModal = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
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
  );
};

export default HelpModal;
