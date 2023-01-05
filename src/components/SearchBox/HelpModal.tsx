import { motion } from "framer-motion";
import Carousel from "../carousel/Carousel";

interface HelpModalProps {
  visible: boolean;
  onClick: () => void;
}

const HelpModal = ({ visible, onClick }: HelpModalProps) => {
  return (
    <motion.div
      onClick={onClick}
      animate={visible ? "visible" : "hidden"}
      initial="hidden"
      variants={{
        hidden: { y: "-80%", scale: 0, display: "none" },
        visible: { y: 0, scale: 1, display: "block" },
      }}
      className="fixed top-0 left-0 z-[2000]"
    >
      <div className="flex flex-col justify-center items-center min-w-screen h-screen w-screen bg-[rgba(0,0,0,0.8)]">
        <div className="max-w-2xl">
          <Carousel id={"help"}>
            <div className="flex justify-center">
              <motion.img variants={{}} src="/images/steps/step-1-light.jpg" />
            </div>
            <div className="flex justify-center">
              <motion.img variants={{}} src="/images/steps/step-2-light.jpg" />
            </div>
            <div className="flex justify-center">
              <motion.img variants={{}} src="/images/steps/step-3-light.jpg" />
            </div>
          </Carousel>
        </div>
        <button
          className=" bg-magic-light w-full max-w-lg py-4 mt-2"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default HelpModal;
