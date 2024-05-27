import { useReducer } from "react";

const initialValue = {count: 0, step: 0};

const reducer = function(state, action) {
  // if(action.type === 'inc') return state + 1;
  switch(action.type) {
    case 'inc':
      return {...state, count: state.count+state.step};
    case 'dec':
      return {...state, count: state.count-state.step};
    case 'typeCount':
      return {...state, count: action.payload};
    case 'setStep':
      return {...state, step: action.payload};
    case 'reset':
      return initialValue;
    default:
      console.log("Type is not match with any case.")
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialValue);
  const {count, step} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    dispatch({type:'dec'});
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);

    dispatch({type:'inc'});
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));

    dispatch({type:'typeCount', payload: e.target.value});
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({type:'setStep', payload: Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type:'setStep'})
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
