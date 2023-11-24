import { useEffect } from "react"
import { TUserAnswers } from "../assets/types/quizzical.types"

type QuestionProp = {
  question: string
  correctAnswer: string
  allAnswers: string[]
  setUserAnswers: React.Dispatch<React.SetStateAction<TUserAnswers>>
  showResults: boolean
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Question = ({ question, allAnswers, correctAnswer, setUserAnswers, showResults }: QuestionProp) => {
  useEffect(() => {
    if (allAnswers && (allAnswers.length > 2)) {
      allAnswers = shuffle(allAnswers);
    }
  }, [])
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO: check if correct, increment counter
    setUserAnswers((oldAnswers) => {
      return {
        ...oldAnswers,
        [question]: e.target.value === correctAnswer ? true : false
      }
    })
  }

  function getRandomAnswers() {
    const answerElements = allAnswers.map(answer => {
      let backlight = showResults ? ' incorrect-backlight' : '';
      if (showResults && (answer === correctAnswer)) {
        backlight = ' correct-backlight';
      }
      return (
        <label
          key={answer}
          className={'answer' + backlight}
        >
          <input
            className='answer-input'
            type='radio'
            name={question}
            value={answer}
            disabled={showResults}
            onChange={e => { handleChange(e) }}
          />
          <span dangerouslySetInnerHTML={{ __html: answer }}></span>
        </label>
      )
    })

    return answerElements;
  }

  return (
    <div className='question'>
      <h2 dangerouslySetInnerHTML={question ? { __html: question } : undefined} className='question__title'></h2>
      <div className="answers">
        {getRandomAnswers()}
      </div>
    </div>
  )
}