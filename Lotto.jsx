import React, { useState, useRef, useEffect, useMemo } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  console.log(shuffle);
  console.log(shuffle.slice(0, 6));
  console.log(winNumbers);

  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    if (winBalls.length === 0) {
      for (let i = 0; i < winNumbers.length - 1; i++) {
        timeouts.current[i] = setTimeout(() => {
          setWinBalls((prevState) => {
            return [...prevState, winNumbers[i]];
          });
        }, (i + 1) * 1000);
      }
      timeouts.current[6] = setTimeout(() => {
        setBonus(winNumbers[6]);
        setRedo(true);
      }, 7000);
    }
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); //빈배열이면 componentDidMount //배열에 요소가 있으면  componentDidMount& componentWillUnmount 둘다 수행

  const onClick = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스 공</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClick}>한 번 더 !</button>}
    </>
  );
};
export default Lotto;
