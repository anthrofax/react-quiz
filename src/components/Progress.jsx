import { useQuiz } from "../contexts/QuizContext"

function Progress() {
    const {jumlahSoal, answer, index, points, maxPossiblePoints} = useQuiz();
    
    return (
        <header className="progress">
            <progress max={jumlahSoal} value={index + Number(answer !== null)}></progress>
            <p>Soal <strong>{index + 1}</strong> / {jumlahSoal}</p>
            
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

export default Progress
