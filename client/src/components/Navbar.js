import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

const Navbar = ({date}) => {
const [days, setDays] = useState(0)
const [hours, setHours] = useState(0)
const [minutes, setMinutes] = useState(0)
const [seconds, setSeconds] = useState(0)

const zeroBeforeNum = (num) => {
  return num < 10? "0" + num : num;
}

const christmasCountdown = (date) => {
  const time = Date.parse(date) - Date.parse(new Date());
  if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
  }
  else {
    setDays(Math.floor(time/(1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60) % 24)));
    setMinutes(Math.floor((time / 1000/60) % 60));
    setSeconds(Math.floor((time/1000) % 60));
  }

}


  useEffect(() => {
    setInterval(() => christmasCountdown(date), 1000);

    return () => christmasCountdown(date);
  }, [date]);


  return (
    <Wrapper>
      <TopWrapper>
      <NumWrapper>
      <Number>{days} </Number><Unit>days</Unit>
      </NumWrapper>
      <NumWrapper>
      <Number>{hours}</Number><Unit> hours</Unit>
      </NumWrapper>
      <NumWrapper>
      <Number>{zeroBeforeNum(minutes)}</Number><Unit> minutes</Unit>
      </NumWrapper>
      <NumWrapper>
      <Number>{zeroBeforeNum(seconds)}</Number><Unit> seconds</Unit>
      </NumWrapper>
      </TopWrapper>
      <BottomWrapper>

      </BottomWrapper>
    </Wrapper>
  )
}


const Number = styled.div`
`
const Unit = styled.div`
`
const NumWrapper = styled.div`
`
const TopWrapper = styled.div`
height: 70%;
background: #c91c24;
display: flex;
justify-content: center;
align-items: center;
`
const BottomWrapper = styled.div`
height: 30%;
background: #a80b13;
`
const Wrapper = styled.div`
height: 15vh;
display: flex;
flex-direction: column;
`

export default Navbar




// import React, { useEffect, useState } from "react";

// const Clock = ({ deadline }) => {
//   const [days, setDays] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   const leading0 = (num) => {
//     return num < 10 ? "0" + num : num;
//   };

//   const getTimeUntil = (deadline) => {
//     const time = Date.parse(deadline) - Date.parse(new Date());

//     if (time < 0) {
//       setDays(0);
//       setHours(0);
//       setMinutes(0);
//       setSeconds(0);
//     } else {
//       setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
//       setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
//       setMinutes(Math.floor((time / 1000 / 60) % 60));
//       setSeconds(Math.floor((time / 1000) % 60));
//     }
//   };



//   return (
//     <div>
//       <div className="Clock-days">{leading0(days)} Days</div>
//       <div className="Clock-hours">{leading0(hours)} Hours</div>
//       <div className="Clock-minutes">{leading0(minutes)} Minutes</div>
//       <div className="Clock-seconds">{leading0(seconds)} Seconds</div>
//     </div>
//   );
// };

// export default Clock;
