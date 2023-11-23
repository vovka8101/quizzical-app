import { useEffect } from "react"

type QuestionProp = {
  question: string
  correctAnswer: string
  allAnswers: string[]
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Question = ({ question, allAnswers, correctAnswer, setCorrectCount }: QuestionProp) => {
  useEffect(() => {
    if (allAnswers) {
      allAnswers = shuffle(allAnswers);
    }
  }, [])
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO: check if correct, increment counter
    if (e.target.value === correctAnswer) {
      setCorrectCount(prevCount => prevCount + 1);
    }
  }

  function getRandomAnswers() {
    const answerElements = allAnswers.map(answer => {
      return (
        <label
          key={answer}
          className='answer'
        >
          <input
            className='answer-input'
            type='radio'
            name={question}
            value={answer}
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