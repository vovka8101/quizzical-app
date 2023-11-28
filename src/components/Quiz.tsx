import { useState } from "react"
import { TData, TUserAnswers } from "../assets/types/quizzical.types"
import { Question } from "./Question"

type QuizProps = {
  loading: boolean
  error: string
  data: TData[]
  handlePlayAgain: () => void
}

// TODO: add error handling

export const Quiz = ({ loading, error, data, handlePlayAgain }: QuizProps) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<TUserAnswers>({})
  const [showResults, setShowResults] = useState(false);

  function handleCheckAnswers(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const correctAnswers = Object.values(userAnswers);
    let count = 0;

    correctAnswers.forEach(isCorrectAnswer => {
      if (isCorrectAnswer) {
        count += 1;
      }
    })

    setCorrectCount(count);
    setShowResults(true);
  }

  return (
    <>
      {loading
        ?
        <div className="preloader"></div>
        :
        error
          ?
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="play-again-btn submit" onClick={handlePlayAgain}>Try again</button>
          </div>
          :
          <form onSubmit={e => { handleCheckAnswers(e) }} className="quiz">
            {data.map((quiz, idx) => {
              return (
                <Question
                  key={quiz.question}
                  qNumber={idx + 1}
                  question={quiz.question}
                  correctAnswer={quiz.correct_answer}
                  allAnswers={quiz.allAnswers}
                  setUserAnswers={setUserAnswers}
                  showResults={showResults}
                />
              )
            })}
            {showResults
              ?
              <div className="score-container">
                <p className="score-text">
                  You scored {correctCount}/{data.length} correct answers
                </p>
                <button className="play-again-btn submit" onClick={handlePlayAgain}>Play again</button>
              </div>
              :
              <button
                className="check-btn submit"
                disabled={data.length !== Object.values(userAnswers).length}>Check answers</button>
            }
          </form>
      }
    </>
  )
}
