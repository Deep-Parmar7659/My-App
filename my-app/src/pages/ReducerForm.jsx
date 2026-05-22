import { useReducer, useState } from "react";

const initialState = {
  name: "",
  email: "",
};

const ACTIONS = {
  UPDATE_FIELD: "UPDATE_FIELD",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.payload,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

export default function ReducerForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.name.trim() || !state.email.trim()) {
      setSubmitted({
        success: false,
        message: "⚠️ Please fill in all fields.",
      });
      return;
    }

    console.log(state);
    setSubmitted({
      success: true,
      message: `✅ Submitted! Name: ${state.name}, Email: ${state.email}`,
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Reducer Form</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: ACTIONS.UPDATE_FIELD,
              field: "name",
              payload: e.target.value,
            })
          }
          className="
            border
            px-4 py-3
            rounded-xl
          "
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: ACTIONS.UPDATE_FIELD,
              field: "email",
              payload: e.target.value,
            })
          }
          className="
            border
            px-4 py-3
            rounded-xl
          "
        />

        {/* Submit Feedback */}
        {submitted && (
          <div
            className={`px-4 py-3 rounded-xl text-sm font-medium ${
              submitted.success
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {submitted.message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-5 py-3
              rounded-xl
            "
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => {
              dispatch({ type: ACTIONS.RESET });
              setSubmitted(null);
            }}
            className="
              bg-gray-500
              text-white
              px-5 py-3
              rounded-xl
            "
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
