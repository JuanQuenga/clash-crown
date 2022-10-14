interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const Button = ({ onClick, icon }: ButtonProps) => {
  return (
    <button onClick={onClick} className="bg-main p-3 rounded-md">
      {icon}
    </button>
  );
};

export default Button;
