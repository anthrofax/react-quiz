function NextButton({ answer, dispatch, index, jumlahSoal }) {
  if (answer === null) return;

  if (index === jumlahSoal - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );
}

export default NextButton;
