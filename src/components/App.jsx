// import DateCounter from "./DateCounter";
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import { useEffect } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';
import FinishScreen from './FinishScreen';
import { useQuiz } from '../contexts/QuizContext';

function App() {
  const { status, dispatch } = useQuiz();

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((questions) =>
        dispatch({ type: 'dataRecieved', payload: questions })
      )
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && <Question />}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
