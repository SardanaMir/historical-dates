import { useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";

interface factT {
  year: number;
  descr: string;
}

interface historyFactT {
  id: number;
  date1: number;
  date2: number;
  facts: factT[];
}

interface YearsPickerProps {
  setActiveIndex: any;
  historyFacts: historyFactT[];
  activeIndex: number;
}

const YearsPicker = ({
  historyFacts,
  setActiveIndex,
  activeIndex,
}: YearsPickerProps) => {
  const radius = 200;
  const startAngle = 0;
  const circleRef = useRef(null);

  const renderDots = () => {
    const numDots = historyFacts.length;
    const angleStep = 360 / numDots;

    return historyFacts.map((item: any, index: any) => {
      const angle = (angleStep * index + startAngle - 60) * (Math.PI / 180);
      const x = radius * Math.cos(angle) + radius;
      const y = radius * Math.sin(angle) + radius;
      const isActive = index === activeIndex;

      return isActive ? (
        <ActiveDot
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          <span
            style={{
              transform: `rotate(${activeIndex * 60}deg)`,
            }}
          >
            {item.id}
          </span>
        </ActiveDot>
      ) : (
        <Dot
          key={index}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          onClick={() => handleDotClick(index)}
          onMouseEnter={(e) => scaleDot(e.currentTarget)}
          onMouseLeave={(e) => resetDot(e.currentTarget)}
        >
          <span
            style={{
              transform: `rotate(${activeIndex * 60}deg)`,
            }}
          >
            {item.id}
          </span>
        </Dot>
      );
    });
  };

  const rotateCircle = (index: number) => {
    const angle = -(startAngle + index * (360 / historyFacts.length));
    gsap.to(circleRef.current, {
      rotation: angle,
      duration: 2,
      ease: "power1.out",
    });
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    rotateCircle(index);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % historyFacts.length;
    handleDotClick(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (activeIndex - 1 + historyFacts.length) % historyFacts.length;
    handleDotClick(prevIndex);
  };

  useEffect(() => {
    rotateCircle(activeIndex);
  }, []);

  const scaleDot = (dot: any) => {
    gsap.to(dot, {
      width: "50px",
      height: "50px",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const resetDot = (dot: any) => {
    gsap.to(dot, {
      width: "5px",
      height: "5px",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <CircleWrapper>
      <Circle ref={circleRef}>{renderDots()}</Circle>
      <Button onClick={handlePrev}>
        <ArrowLeft1 />
        <ArrowLeft2 />
      </Button>
      <Button onClick={handleNext}>
        <ArrowRight1 />
        <ArrowRight2 />
      </Button>
    </CircleWrapper>
  );
};

const Dot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(66, 86, 122, 0.8);
  background-color: rgba(244, 245, 249, 1);
  border-radius: 50%;
  cursor: pointer;

  span {
    font-size: 0;
    color: black;
    transition: font-size 0.3s ease;
    transform: rotate(0deg);
  }

  &:hover {
    span {
      font-size: 1rem;
      transform: rotate(60deg);
    }
  }
`;

const ActiveDot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(244, 245, 249, 1);
  border: 1px solid rgba(66, 86, 122, 0.8);
  span {
    font-size: 16px;
  }
`;

const Circle = styled.div`
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  border: 0.06rem solid rgba(66, 86, 122, 0.3);
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CircleWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.88rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
  @media (max-width: 425px) {
    gap: 0.25rem;
  }
`;

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 0.06rem solid rgba(66, 86, 122, 0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    border: 0.06rem solid rgba(66, 86, 122, 1);
    div {
      background: rgba(66, 86, 122, 1);
    }
  }
  @media (max-width: 425px) {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ArrowRight1 = styled.div`
  position: absolute;
  width: 0.63rem;
  height: 0.13rem;
  transform: rotate(45deg);
  background: rgb(161, 171, 189);
  left: 0.88rem;
  top: 0.94rem;
  @media (max-width: 425px) {
    width: 0.38rem;
    height: 0.06rem;
    left: 0.44rem;
    top: 0.44rem;
  }
`;

const ArrowRight2 = styled.div`
  position: absolute;
  width: 0.63rem;
  height: 0.13rem;
  transform: rotate(-45deg);
  background: rgb(161, 171, 189);
  right: 0.88rem;
  bottom: 0.94rem;
  @media (max-width: 425px) {
    width: 0.38rem;
    height: 0.06rem;
    right: 0.3rem;
    bottom: 0.4rem;
  }
`;

const ArrowLeft1 = styled.div`
  position: absolute;
  width: 0.63rem;
  height: 0.13rem;
  transform: rotate(-45deg);
  background: rgb(161, 171, 189);
  left: 0.88rem;
  top: 0.94rem;
  @media (max-width: 425px) {
    width: 0.38rem;
    height: 0.06rem;
    left: 0.38rem;
    top: 0.45rem;
  }
`;

const ArrowLeft2 = styled.div`
  position: absolute;
  width: 0.63rem;
  height: 0.13rem;
  transform: rotate(45deg);
  background: rgb(161, 171, 189);
  right: 0.88rem;
  bottom: 0.94rem;
  @media (max-width: 425px) {
    width: 0.38rem;
    height: 0.06rem;
    right: 0.35rem;
    bottom: 0.4rem;
  }
`;

export default YearsPicker;
