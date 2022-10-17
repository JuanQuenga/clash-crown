interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText = ({ children }: GradientTextProps) => {
  return (
    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-magic-light to-yellow-300 animate-gradient bg-gradient transition-colors drop-shadow-xl">
      {children}
    </span>
  );
};

export default GradientText;
