import { useEffect } from "react"
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
    const {secondsRemaining, dispatch} = useQuiz();
    const min = Math.floor(secondsRemaining /60);
    const sec = secondsRemaining % 60;

    useEffect(function() {
        if (secondsRemaining === 0) dispatch({type: 'finish'});

        const id = setInterval(() => {
            dispatch({type: 'tick'});
        }, 1000)

        return function() {
            clearInterval(id);
        }
    }, [dispatch, secondsRemaining])
    return (
        <div className="timer">
            {min < 10 && 0}{min} : {sec < 10 && 0}{sec}
        </div>
    )
}

export default Timer
