type QuizProps = {
  loading: boolean
  error: string
}

export const Quiz = ({ loading, error }: QuizProps) => {
  return (
    <>
      {loading
        ?
        <div>Loading...</div>
        :
        <div className='quiz'>Quiz Container</div>
      }
    </>
  )
}