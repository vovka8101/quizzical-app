import { useState } from "react"
import { TData } from "../assets/types/quizzical.types"
import { Question } from "./Question"

type QuizProps = {
  loading: boolean
  error: string
  data: TData[]
}

export const Quiz = ({ loading, error, data }: QuizProps) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);


  function handleCheckAnswers(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowResults(true);
    console.log(correctCount);
  }

  return (
    <>
      {loading
        ?
        <div>Loading...</div>
        :
        <form onSubmit={e => { handleCheckAnswers(e) }} className='quiz'>
          {data.map(quiz => {
            const allAnswers = [...quiz.incorrect_answers, quiz.correct_answer];
            return (
              <Question
                key={quiz.question}
                question={quiz.question}
                correctAnswer={quiz.correct_answer}
                allAnswers={allAnswers}
                setCorrectCount={setCorrectCount}
              />
            )
          })}
          {showResults
            ?
            <div className="score-containe">
              <p className="score-text">
                You scored {correctCount}/{data.length} correct answers
              </p>
              <button className="play-again-btn submit">Play again</button>
            </div>
            :
            <button className='check-btn submit'>Check answers</button>
          }
        </form>
      }
    </>
  )
}
