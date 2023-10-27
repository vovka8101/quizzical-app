import { useEffect, useState } from 'react';
import './App.css'
import { InitializeApp } from './components/InitializeApp';
import { Quiz } from './components/Quiz';
import axios from 'axios';

// TODO: Quiz settings; API request with Axios

type TSettings = {
  amount: number
  category?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  type?: 'boolean' | 'multiple'
}

type TData = Omit<TSettings, "amount"> & {
  correct_answer: string
  incorrect_answers: string[]
  question: string
}

type TResponse = {
  response_code: number
  results: TData[]
}

const quiz_settings: TSettings = {
  amount: 5,
}

const request_instance = {
  headers: {
    "Content-Type": "application/json"
  },
}

const BASE_URL = 'https://opentdb.com/api.php?';

function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState<TData[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function getUrlParameters<TSettings>(parameters: TSettings): string {
    let result_url = '';

    for (const key in parameters) {
      if (result_url) {
        result_url += '&';
      }
      result_url += key + '=' + parameters[key];
    }

    return result_url;
  }

  useEffect(() => {
    if (start) {
      const url_parameters = getUrlParameters(quiz_settings);
      axios
        .get<TResponse>(BASE_URL + url_parameters, request_instance)
        .then((response) => {
          if (response.data.response_code === 0) {
            setQuestions(response.data.results);
          } else {
            setError("Wrong parameters were passed");
          }
        })
        .catch(ex => {
          const error = ex.code === 'ERR_NETWORK'
            ? "Resource Not found"
            : "An unexpected error has occurred";
          setError(error);
        })
        .finally(() => { setLoading(false) })
    }
  }, [start])

  return (
    <div className='app'>
      {start
        ?
        <Quiz loading={loading} error={error} />
        :
        <InitializeApp setStart={setStart} />}
    </div>
  )
}

export default App;
