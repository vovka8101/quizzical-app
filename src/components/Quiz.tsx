import { useState } from "react"
import { TData, TUserAnswers } from "../assets/types/quizzical.types"
import { Question } from "./Question"

type QuizProps = {
  loading: boolean
  error: string
  data: TData[]
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string>>
}

// TODO: add error handling

export const Quiz = ({ loading, error, data, setStart, setError }: QuizProps) => {
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

  function handlePlayAgain() {
    // TODO: clear data from state
    if (error) setError('');
    setStart(false);
  }

  return (
    <>
      {loading
        ?
        <div>Loading...</div>
        :
        error
          ?
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="play-again-btn submit" onClick={handlePlayAgain}>Try again</button>
          </div>
          :
          <form onSubmit={e => { handleCheckAnswers(e) }} className="quiz">
            {data.map(quiz => {
              const allAnswers = quiz.incorrect_answers.length === 1
                ? ['True', 'False']
                : [...quiz.incorrect_answers, quiz.correct_answer];
              return (
                <Question
                  key={quiz.question}
                  question={quiz.question}
                  correctAnswer={quiz.correct_answer}
                  allAnswers={allAnswers}
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
