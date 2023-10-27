type InitializeAppProps = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

export const InitializeApp = ({ setStart }: InitializeAppProps) => {
  return (
    <div className='initialize'>
      <h1 className='main-title'>Quizzical</h1>
      <p className='game-description'>Some description</p>
      {/* TODO: quiz settings */}
      <button className='start-btn' onClick={() => { setStart(true) }}>Start quiz</button>
    </div>
  )
}