import { useEffect, useState } from "react";
import styled from "styled-components";

interface historyFactT {
  id: number;
  date1: number;
  date2: number;
  facts: { year: number; descr: string }[];
}

interface CounterProps {
  dateKey: "date1" | "date2";
  activeIndex: number;
  historyFacts: historyFactT[];
}

function YearsCounter({ activeIndex, dateKey, historyFacts }: CounterProps) {
  const [count, setCount] = useState(
    () => historyFacts[activeIndex - 1]?.[dateKey] || historyFacts[0]?.[dateKey]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount: any) => {
        if (
          activeIndex < activeIndex + 1 &&
          prevCount > historyFacts[activeIndex]?.[dateKey]
        ) {
          return prevCount - 1;
        } else if (prevCount < historyFacts[activeIndex]?.[dateKey]) {
          return prevCount + 1;
        } else {
          clearInterval(intervalId);
          return historyFacts[activeIndex]?.[dateKey];
        }
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [activeIndex, dateKey]);

  return dateKey === "date1" ? (
    <DateBlue>{count}</DateBlue>
  ) : (
    <DatePink>{count}</DatePink>
  );
}

const DateBlue = styled.div`
  font-size: 10rem;
  font-weight: 700;
  color: rgba(56, 119, 238, 1);
`;

const DatePink = styled.div`
  font-size: 10rem;
  font-weight: 700;
  color: rgba(245, 99, 147, 1);
`;

export default YearsCounter;
