interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText = ({ children }: GradientTextProps) => {
  return (
    <span className="bg-gradient-to-l from-magic-light to-yellow-300 text-transparent bg-clip-text">
      {children}
    </span>
  );
};

export default GradientText;
