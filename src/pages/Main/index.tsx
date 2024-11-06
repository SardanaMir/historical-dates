import { createContext, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import HistoryFacts from "../../data/historyFacts.json";
import { Carousel, YearsPicker, YearsCounter } from "../../components";

const ActiveIndexContext = createContext(0);

const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHistoryFact, setActiveHistoryFact] = useState(
    HistoryFacts[activeIndex]
  );

  const prevActiveIndex = useRef(activeIndex);

  useEffect(() => {
    prevActiveIndex.current = activeIndex;
    return setActiveHistoryFact(HistoryFacts[activeIndex]);
  }, [activeIndex]);

  return (
    <ActiveIndexContext.Provider value={activeIndex}>
      <Background>
        <Wrapper>
          <VerticalLine />
          <HorizontalLine />
          <GradientElement />
          <DateWrapper>
            <YearsCounter
              historyFacts={HistoryFacts}
              activeIndex={activeIndex}
              dateKey="date1"
            />
            <YearsCounter
              historyFacts={HistoryFacts}
              activeIndex={activeIndex}
              dateKey="date2"
            />
          </DateWrapper>
          <Container>
            <Title>Исторические даты</Title>
            <div>
              <YearsPicker
                historyFacts={HistoryFacts}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
              />
              <Carousel activeIndex={activeIndex} />
            </div>
          </Container>
        </Wrapper>
      </Background>
    </ActiveIndexContext.Provider>
  );
};

const Background = styled.section`
  height: 100vh;
  width: 100vw;
  background: rgba(244, 245, 249, 1);
`;

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  width: 80rem;
  height: 100%;
  padding: 2rem 0;
  border-left: 0.06rem solid rgba(66, 86, 122, 0.3);
  border-right: 0.06rem solid rgba(66, 86, 122, 0.3);
`;

const Title = styled.div`
  display: inline-block;
  width: 25rem;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(66, 86, 122, 1);
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 0.06rem solid rgba(66, 86, 122, 0.3);
  height: 100%;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
  border-top: 0.06rem solid rgba(66, 86, 122, 0.3);
  width: 100%;
`;

const GradientElement = styled.div`
  position: absolute;
  width: 0.3rem;
  height: 7.5rem;
  background: linear-gradient(
    to bottom,
    rgba(56, 119, 238, 1),
    rgba(239, 93, 168, 1)
  );
  left: -3px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 73rem;
  margin: 0 auto;
`;

export default Main;
