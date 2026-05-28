import { getErrorMessage } from "../utils/errorHandler";

export default function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-center mt-4">
      {getErrorMessage(error)}
    </div>
  );
}
