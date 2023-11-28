import { TUserAnswers } from "../assets/types/quizzical.types"

type QuestionProp = {
  question: string
  qNumber: number
  correctAnswer: string
  allAnswers: string[] | undefined
  setUserAnswers: React.Dispatch<React.SetStateAction<TUserAnswers>>
  showResults: boolean
}

export const Question = ({
  question,
  qNumber,
  allAnswers,
  correctAnswer,
  setUserAnswers,
  showResults }: QuestionProp) => {

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserAnswers((oldAnswers) => {
      return {
        ...oldAnswers,
        [question]: e.target.value === correctAnswer ? true : false
      }
    })
  }

  function getAnswers() {
    const answerElements = allAnswers?.map(answer => {
      let backlight = showResults ? ' incorrect-backlight' : '';
      if (showResults && (answer === correctAnswer)) {
        backlight = ' correct-backlight';
      }
      return (
        <label
          key={answer}
          className={"answer" + backlight}
          onSelect={e => { e.preventDefault() }}
        >
          <input
            className="answer-input"
            type="radio"
            name={question}
            value={answer}
            disabled={showResults}
            onChange={e => { handleChange(e) }}
            onSelect={e => { e.preventDefault() }}
          />
          <span dangerouslySetInnerHTML={{ __html: answer }}></span>
        </label>
      )
    })

    return answerElements;
  }

  return (
    <div className="question">
      <h2 dangerouslySetInnerHTML={question ? { __html: qNumber + '. ' + question } : undefined} className="question__title"></h2>
      <div className="answers">
        {getAnswers()}
      </div>
    </div>
  )
}