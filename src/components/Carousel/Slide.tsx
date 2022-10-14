interface SlideProps {
  id: string;
  children: React.ReactNode;
}

const Slide = ({ id, children }: SlideProps) => {
  return (
    <div id={id} className="min-w-full snap-center">
      {children}
    </div>
  );
};

export default Slide;
