import { useEffect, useState } from 'react';
import './App.css'
import { InitializeApp } from './components/InitializeApp';
import { Quiz } from './components/Quiz';
import axios from 'axios';
import { TSettings, TData } from './assets/types/quizzical.types';


type TResponse = {
  response_code: number
  results: TData[]
}

const initial_settings: TSettings = {
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
  const [data, setData] = useState<TData[]>([]);
  const [settings, setSettings] = useState<TSettings>(initial_settings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function getUrlParameters<TSettings>(parameters: TSettings): string {
    const result_url = [];

    for (const key in parameters) {
      if (parameters[key]) {
        result_url.push(key + '=' + parameters[key]);
      }
    }

    return result_url.join('&');
  }

  useEffect(() => {
    if (start) {
      const url_parameters = getUrlParameters(settings);
      axios
        .get<TResponse>(BASE_URL + url_parameters, request_instance)
        .then(({ data }) => {
          if (data.response_code === 0) {
            setData(data.results);
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
        <Quiz loading={loading} error={error} data={data} setStart={setStart} />
        :
        <InitializeApp setSettings={setSettings} setStart={setStart} />}
    </div>
  )
}

export default App;
