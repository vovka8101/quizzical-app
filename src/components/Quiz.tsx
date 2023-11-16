import { useState } from "react"
import { TAnswers, TData } from "../assets/types/quizzical.types"
import { Question } from "./Question"

type QuizProps = {
  loading: boolean
  error: string
  data: TData[]
}

export const Quiz = ({ loading, error, data }: QuizProps) => {
  const [userAnswers, setUserAnswers] = useState<TAnswers[]>();

  return (
    <>
      {loading
        ?
        <div>Loading...</div>
        :
        <form className='quiz'>
          {data.map(quiz => {
            return (
              <Question key={quiz.question} quiz={quiz} setUserAnswers={setUserAnswers} />
            )
          })}
          <button>Check answers</button>
        </form>
      }
    </>
  )
}
