// import DateCounter from "./DateCounter";
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';
import FinishScreen from './FinishScreen';

const WAKTU_JWB_PER_SOAL = 1;

const initialValue = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

const reducer = function (state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * WAKTU_JWB_PER_SOAL };
    case 'newAnswer':
      const currentQuestion = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore};
    case 'reset':
      return { ...initialValue, questions: state.questions, status: 'ready'};
    case 'tick':
      return {...state, secondsRemaining: state.secondsRemaining > 0 ? state.secondsRemaining - 1 : state.secondsRemaining };
    default:
      throw new Error('Unknown action');
  }
};

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(
    reducer,
    initialValue
  );
  const jumlahSoal = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

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
        {status === 'ready' && (
          <StartScreen jumlahSoal={jumlahSoal} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            index={index}
            jumlahSoal={jumlahSoal}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            secondsRemaining={secondsRemaining}

          />
        )}
        {status === 'finished' && <FinishScreen dispatch={dispatch} points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore}/>}
      </Main>
    </div>
  );
}

export default App;
