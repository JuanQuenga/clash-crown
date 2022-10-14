interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText = ({ children }: GradientTextProps) => {
  return (
    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-yellow-400 to-purple-600">
      {children}
    </span>
  );
};

export default GradientText;
