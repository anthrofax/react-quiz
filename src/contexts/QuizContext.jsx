import { useContext, createContext, useReducer } from 'react';

const QuizContext = createContext();

function QuizProvider({ children }) {
  const WAKTU_JWB_PER_SOAL = 30;

  const initialValue = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  };

  const reducer = function (state, action) {
    switch (action.type) {
      case 'dataRecieved':
        return { ...state, questions: action.payload, status: 'ready' };
      case 'dataFailed':
        return { ...state, status: 'error' };
      case 'start':
        return {
          ...state,
          status: 'active',
          secondsRemaining: state.questions.length * WAKTU_JWB_PER_SOAL,
        };
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
        return {
          ...state,
          status: 'finished',
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case 'reset':
        return { ...initialValue, questions: state.questions, status: 'ready' };
      case 'tick':
        return {
          ...state,
          secondsRemaining:
            state.secondsRemaining > 0
              ? state.secondsRemaining - 1
              : state.secondsRemaining,
        };
      default:
        throw new Error('Unknown action');
    }
  };

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialValue);

  const jumlahSoal = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  const question = questions[index];

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        jumlahSoal,
        maxPossiblePoints,
        question
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (!context)
    throw new Error(
      'Anda mengakses context di luar jangkauan provider, context hanya dapat diakses di dalam Provider component!'
    );

  return context;
}

export { QuizProvider, useQuiz };
