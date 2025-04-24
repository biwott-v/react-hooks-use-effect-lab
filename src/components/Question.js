import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timeoutId;

    function tick() {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          onAnswered(false);
          return 0;
        } else {
          timeoutId = setTimeout(tick, 1000);
          return prevTime - 1;
        }
      });
    }

    timeoutId = setTimeout(tick, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
