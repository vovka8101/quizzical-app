import { TAnswers, TData } from "../assets/types/quizzical.types"

type QuestionProp = {
  quiz: TData
  setUserAnswers: React.Dispatch<React.SetStateAction<TAnswers[] | undefined>>
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Question = ({ quiz, setUserAnswers }: QuestionProp) => {
  function getRandomAnswers(answers: string[], question: string) {
    const randomAnswers = shuffle(answers);
    const answerElements = randomAnswers.map(answer => {
      return (
        <label key={answer} className='answer'>
          <input
            className='answer-input'
            type='radio'
            name={question}
            value={answer}
          />
           <span dangerouslySetInnerHTML={{ __html: answer }}></span>
        </label>
      )
    })

    return answerElements;
  }

  return (
    <div className='question'>
      <h2 dangerouslySetInnerHTML={{ __html: quiz.question }} className='question__title'></h2>
      <div className="answers">
        {getRandomAnswers([...quiz.incorrect_answers, quiz.correct_answer], quiz.question)}
      </div>
    </div>
  )
}