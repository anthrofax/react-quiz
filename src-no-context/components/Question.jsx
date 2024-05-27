import Footer from './Footer';
import NextButton from './NextButton';
import Options from './Options';
import Progress from './Progress';
import Timer from './Timer';

function Question({
  question,
  dispatch,
  answer,
  index,
  jumlahSoal,
  points,
  maxPossiblePoints,
  secondsRemaining
}) {
  return (
    <div>
      <Progress
        index={index}
        jumlahSoal={jumlahSoal}
        points={points}
        maxPossiblePoints={maxPossiblePoints}
        answer={answer}
      />
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />

      <Footer>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        <NextButton
          answer={answer}
          dispatch={dispatch}
          index={index}
          jumlahSoal={jumlahSoal}
        />
      </Footer>
    </div>
  );
}

export default Question;
