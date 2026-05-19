import { useReducer } from "react";

// Initial State
const initialState = {
  count: 0,
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "incrementByAmount":
      return {
        count: state.count + action.payload,
      };

    case "decrementByAmount":
      return {
        count: state.count - action.payload,
      };

    case "reset":
      return {
        count: 0,
      };

    default:
      return state;
  }
}

// Component
export default function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-10">
      {/* Count */}
      <h1 className="text-3xl font-bold mb-6">Count: {state.count}</h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => dispatch({ type: "incrementByAmount", payload: 5 })}
          className="bg-green-500 text-white px-5 py-2 rounded-lg"
        >
          +5
        </button>

        <button
          onClick={() => dispatch({ type: "decrementByAmount", payload: 5 })}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          -5
        </button>

        <button
          onClick={() => dispatch({ type: "reset" })}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
