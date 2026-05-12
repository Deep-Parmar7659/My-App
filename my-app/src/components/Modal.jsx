export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div
      className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
        "
    >
      {/* Modal Box */}
      <div
        className="
            bg-white dark:bg-gray-900
            w-full max-w-lg
            p-6 rounded-2xl
            shadow-2xl
        "
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>
        </div>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
