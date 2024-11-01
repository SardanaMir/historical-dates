import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <Background>
      <Wrapper>
        <VerticalLine />
        <HorizontalLine />
        <GradientElement />
        <Title>Исторические даты</Title>
        <DateWrapper>
          <DateBlue>2015</DateBlue>
          <DatePink>2022</DatePink>
        </DateWrapper>
      </Wrapper>
    </Background>
  );
};

export default Main;

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
  border-left: 1px solid rgba(66, 86, 122, 0.3);
  border-right: 1px solid rgba(66, 86, 122, 0.3);
`;

const Title = styled.div`
  display: inline-block;
  width: 400px;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(66, 86, 122, 1);
  margin-left: 50px;
`;

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

const DateWrapper = styled.div`
  display: flex;
  gap: 150px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 1px solid rgba(66, 86, 122, 0.3);
  height: 100%;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  border-top: 1px solid rgba(66, 86, 122, 0.3);
  width: 100%;
`;

const GradientElement = styled.div`
  position: absolute;
  width: 5px;
  height: 120px;
  background: linear-gradient(
    to bottom,
    rgba(56, 119, 238, 1),
    rgba(239, 93, 168, 1)
  );
  left: -3px;
`;
