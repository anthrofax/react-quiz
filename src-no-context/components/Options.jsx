function Options({ question, dispatch, answer }) {
  const sudahMenjawab = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${
            sudahMenjawab
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          } ${i === answer ? 'answer' : ''}`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
          disabled={sudahMenjawab}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
