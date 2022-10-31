import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import treeIcon from "../images/treeIcon.png";
import { Icon } from "react-icons-kit";
import {ecommerce_dollar} from 'react-icons-kit/linea/ecommerce_dollar';
import snowflakeBack from "../images/snowflakeBackground.png";


const Navbar = ({ date }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const zeroBeforeNum = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const christmasCountdown = (date) => {
    const time = Date.parse(date) - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    setInterval(() => christmasCountdown(date), 1000);

    return () => christmasCountdown(date);
  }, [date]);

  return (
    <Wrapper>
      <TopWrapper>
        <SubWrapper>
          <NumWrapper>
            <Number>{days}</Number>
            <Unit>Days</Unit>
          </NumWrapper>
          <NumWrapper>
            <Number>{hours}</Number>
            <Unit> Hours</Unit>
          </NumWrapper>
          <NumWrapper>
            <Number>{zeroBeforeNum(minutes)}</Number>
            <Unit> Minutes</Unit>
          </NumWrapper>
          <NumWrapper>
            <Number>{zeroBeforeNum(seconds)}</Number>
            <Unit> Seconds</Unit>
          </NumWrapper>
        </SubWrapper>
        <UntilDiv>Until Christmas!!!</UntilDiv>
      </TopWrapper>

      <BottomWrapper>
        <LinkWrapper>
          <PageLink to="/">
            <Img src = {treeIcon} alt = "christmas tree home link"/>
          </PageLink>
        </LinkWrapper>
        <LinkWrapper>
          <PageLink to="/budget" style={{ color: '#506a20' }}><Icon size={30} icon={ecommerce_dollar} /></PageLink>
        </LinkWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

const Img = styled.img`
height: 30px;
`
const LinkWrapper = styled.div`

`;
const PageLink = styled(Link)`
  text-decoration: none;
`;
const UntilDiv = styled.div`
  color: #a80b13;
  font-weight: bold;
  margin-top: 5px;
  font-size: 25px;
`;
const Number = styled.div`
  background: rgba(255, 255, 255, 0.2);
  width: 45px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 3px 10px;
  color: #a80b13;
  font-weight: bold;
  font-size: 30px;
`;
const Unit = styled.div`
  color: white;
  color: #a80b13;
  font-weight: bold;
`;
const NumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SubWrapper = styled.div`
  display: flex;
`;
const TopWrapper = styled.div`
  height: 70%;
  background-image: url(${snowflakeBack});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BottomWrapper = styled.div`
  height: 30%;
  width: 100%;
  background: #a80b13;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20vw;
`;
const Wrapper = styled.div`
  height: 15vh;
  display: flex;
  flex-direction: column;
  font-family: var(--main-font-family);
`;

export default Navbar;
