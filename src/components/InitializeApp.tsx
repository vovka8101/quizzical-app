import { useState } from 'react';
import Select from 'react-select';
import { setting_parameters } from '../assets/data/quizSettings';
import { TSettings } from '../assets/types/quizzical.types';


type InitializeAppProps = {
  setSettings: React.Dispatch<React.SetStateAction<TSettings>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

// TODO: add form validation for number input; use previous settings when play again used 

export const InitializeApp = ({ setSettings, setStart }: InitializeAppProps) => {
  const [questionNumber, setQuestionNumber] = useState(setting_parameters.amount);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<TSettings['difficulty']>();
  const [selectedType, setSelectedType] = useState<TSettings['type']>();

  function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSettings({
      amount: questionNumber,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      type: selectedType
    })
    setStart(true)
  }

  return (
    <div className="initialize">
      <h1 className="main-title">Quizzical</h1>
      <p className="game-description">
        This is a simple quizzical application based on "Open trivia database" API.
      </p>
      <form onSubmit={e => { handleStart(e) }} className="settings-form">
        <fieldset className="form-container">
          <legend className="settings-title">Settings</legend>
          <div className="input-container">
            <label className="label" htmlFor="number">Number of Questions:</label>
            <input
              type="number"
              className="number-input input"
              id="number"
              onChange={(e) => setQuestionNumber(Number(e.target.value))}
              defaultValue={questionNumber}
            />
          </div>
          <div className="input-container">
            <p className="label">Select Category:</p>
            <Select
              options={setting_parameters.category.options}
              placeholder="Any Category"
              onChange={(option: { value: number, label: string } | null) => {
                setSelectedCategory(option?.value);
              }}
            />
          </div>
          <div className="input-container">
            <p className="label">Select Difficulty:</p>
            <Select
              options={setting_parameters.difficulty.options}
              placeholder="Any Difficulty"
              onChange={(option: { value: TSettings['difficulty'], label: string } | null) => {
                setSelectedDifficulty(option?.value);
              }}
            />
          </div>
          <div className="input-container">
            <p className="label">Select Type:</p>
            <Select
              options={setting_parameters.type.options}
              placeholder="Any Type"
              onChange={(option: { value: TSettings['type'], label: string } | null) => {
                setSelectedType(option?.value);
              }}
            />
          </div>
        </fieldset>
        <button className="start-btn submit">Start quiz</button>
      </form>
    </div>
  )
}