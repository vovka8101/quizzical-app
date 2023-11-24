export type TSettings = {
  amount: number
  category?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  type?: string
}

export type TData = Omit<TSettings, "amount"> & {
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type TUserAnswers = {
  [key: string]: boolean
}
