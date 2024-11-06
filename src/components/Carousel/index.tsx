import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import HistoryFacts from "../../data/historyFacts.json";
import "swiper/css";
import "swiper/css/navigation";

interface FactT {
  year: number;
  descr: string;
}

interface CarouselProps {
  activeIndex: number;
}

const Carousel = ({ activeIndex }: CarouselProps) => {
  return (
    <Swiper spaceBetween={1} slidesPerView={3}>
      {HistoryFacts[activeIndex].facts.map((fact: FactT, index: number) => (
        <SwiperSlide key={index}>
          <Block>
            <Subtitle>{fact.year}</Subtitle>
            <Description>{fact.descr}</Description>
          </Block>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Block = styled.div`
  width: 20rem;
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`;

const Subtitle = styled.div`
  font-family: Bebas Neue;
  font-size: 1.56rem;
  font-weight: 400;
  color: rgba(56, 119, 238, 1);
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: rgba(66, 86, 122, 1);
`;

export default Carousel;
