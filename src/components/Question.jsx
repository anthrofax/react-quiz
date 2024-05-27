import { useQuiz } from '../contexts/QuizContext';
import Footer from './Footer';
import NextButton from './NextButton';
import Options from './Options';
import Progress from './Progress';
import Timer from './Timer';

function Question() {
  const { question} = useQuiz();

  return (
    <div>
      <Progress />
      <h4>{question.question}</h4>
      <Options />

      <Footer>
        <Timer />
        <NextButton />
      </Footer>
    </div>
  );
}

export default Question;
