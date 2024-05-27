function Progress({index, jumlahSoal, points, maxPossiblePoints, answer}) {
    
    return (
        <header className="progress">
            <progress max={jumlahSoal} value={index + Number(answer !== null)}></progress>
            <p>Soal <strong>{index + 1}</strong> / {jumlahSoal}</p>
            
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

export default Progress
