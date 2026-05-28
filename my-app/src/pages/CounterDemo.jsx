import useCounter from "../hooks/ui/useCounter";

export default function CounterDemo() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Counter Demo</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          -
        </button>

        <p className="text-2xl dark:text-white">{count}</p>

        <button
          onClick={increment}
          className="bg-green-500 text-white px-5 py-2 rounded-lg"
        >
          +
        </button>

        <button
          onClick={reset}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
