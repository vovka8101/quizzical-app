import { useState } from 'react';
import Select from 'react-select';
import { setting_parameters } from '../assets/data/quizSettings';
import { TSettings } from '../assets/types/quizzical.types';


type InitializeAppProps = {
  setSettings: React.Dispatch<React.SetStateAction<TSettings>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

type TOption = {
  value: string
  label: string
}

export const InitializeApp = ({ setSettings, setStart }: InitializeAppProps) => {
  const [questionNumber, setQuestionNumber] = useState(setting_parameters.amount);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(setting_parameters.category.selected);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(setting_parameters.difficulty.selected);
  const [selectedType, setSelectedType] = useState<string | undefined>(setting_parameters.type.selected);
  

  return (
    <div className='initialize'>
      <h1 className='main-title'>Quizzical</h1>
      <p className='game-description'>Some description</p>

      <form className='settings-form'>
        <fieldset className='form-container'>
          <legend className='settings-title'>Settings</legend>
          <div className='input-container'>
            <label className='label' htmlFor='number'>Number of Questions:</label>
            <input
              type='number'
              className='number-input input'
              id='number'
              defaultValue={questionNumber}
            />
          </div>
          <div className='input-container'>
            <p className='label'>Select Category:</p>
            <Select
              options={setting_parameters.category.options}
              placeholder='Any Category'
              onChange={(option: { value: number, label: string } | null) => {
                setSelectedCategory(option?.value);
              }}
            />
          </div>
          <div className='input-container'>
            <p className='label'>Select Difficulty:</p>
            <Select
              options={setting_parameters.difficulty.options}
              placeholder='Any Difficulty'
              onChange={(option: TOption | null) => {
                setSelectedDifficulty(option?.value);
              }}
            />
          </div>
          <div className='input-container'>
            <p className='label'>Select Type:</p>
            <Select
              options={setting_parameters.type.options}
              placeholder='Any Type'
              onChange={(option: TOption | null) => {
                setSelectedType(option?.value);
              }}
            />
          </div>
        </fieldset>
      </form>
      <button
        className='start-btn'
        onClick={() => {
          setSettings((oldSettings: TSettings): TSettings => {
            return {
              amount: questionNumber,
              category: selectedCategory,
              difficulty: selectedDifficulty,
              type: selectedType
            }
          })
          setStart(true) 
        }}
      >Start quiz</button>
    </div>
  )
}