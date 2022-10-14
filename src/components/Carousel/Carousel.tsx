import { Children, useEffect, useState } from "react";
import Button from "./Button";
import Slide from "./Slide";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  id: string;
  children: React.ReactNode;
  delayInSeconds?: number;
}

const Carousel = ({ id, children, delayInSeconds }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const amountOfSlides = Children.count(children);

  useEffect(() => {
    if (currentSlide === amountOfSlides) return setCurrentSlide(0);
    if (currentSlide < 0) return setCurrentSlide(amountOfSlides - 1);
    document.querySelector(`#slide-${currentSlide}`)!.scrollIntoView();
  }, [currentSlide]);

  // useInterval(() => {
  //   if (!delayInSeconds) return;
  //   setCurrentSlide(currentSlide + 1);
  // }, delayInSeconds! * 1000);

  return (
    <div className="relative">
      <div className="flex w-full h-full overflow-scroll snap-x snap-mandatory scroll-smooth scroll scrollbar-hidden">
        {Children.map(children, (child, index) => {
          return <Slide id={`slide-${index}`}>{child}</Slide>;
        })}
      </div>
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => {
            setCurrentSlide((currentSlide) => currentSlide - 1);
          }}
          icon={<FaChevronLeft />}
        />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Button
          onClick={() => {
            setCurrentSlide((currentSlide) => currentSlide + 1);
          }}
          icon={<FaChevronRight />}
        />
      </div>
    </div>
  );
};

export default Carousel;
