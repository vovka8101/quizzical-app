export type TSettings = {
  amount: number
  category?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  type?: string
}

export type TData = Omit<TSettings, "amount"> & {
  correct_answer: string
  incorrect_answers: string[]
  question: string
}

export type TAnswers = {
  userAnswer: string
  correctAnswer: string
  wrongAnswers: string[]
}
