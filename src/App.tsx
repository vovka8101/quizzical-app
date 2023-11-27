import { useEffect, useState } from 'react';
import './App.css'
import { InitializeApp } from './components/InitializeApp';
import { Quiz } from './components/Quiz';
import { TSettings, TData } from './assets/types/quizzical.types';
import { getQuiz } from "./api/QuizAPI";


function App() {
  const [start, setStart] = useState(false);
  const [data, setData] = useState<TData[]>([]);
  const [settings, setSettings] = useState<TSettings | object>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (start) {
      const fetchGet = async () => {
        try {
          const result = await getQuiz(settings);
          setData(result);
        } catch (err) {
          if (err instanceof Error) setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchGet();
    }
  }, [start, settings])

  function handlePlayAgain() {
    if (error) setError("");
    setData([]);
    // setSettings({});
    setStart(false);
    setLoading(true);
  }

  return (
    <div className="app">
      <div className="background-img-container"></div>
      {start
        ?
        <Quiz
          loading={loading}
          error={error} data={data}
          handlePlayAgain={handlePlayAgain}
        />
        :
        <InitializeApp setSettings={setSettings} setStart={setStart} />}
    </div>
  )
}

export default App;
