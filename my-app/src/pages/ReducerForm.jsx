import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function ReducerForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);
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
              type: "UPDATE_FIELD",
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
              type: "UPDATE_FIELD",
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
            onClick={() => dispatch({ type: "RESET" })}
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
