interface ErrorMessageProps {
  message: string;
  onReset: () => void;
}

export default function ErrorMessage({ message, onReset }: ErrorMessageProps) {
  return (
    <div className="backdrop-blur-md bg-red-500/10 rounded-2xl p-6 md:p-8 text-center border-2 border-red-400/30 shadow-lg shadow-red-900/20">
      <p className="text-lg md:text-xl text-red-100 font-medium mb-6">{message}</p>
      <button
        onClick={onReset}
        className="px-8 py-4 text-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out border-2 border-emerald-400/50 hover:border-emerald-300/50 shadow-lg shadow-emerald-900/20"
      >
        Try Again
      </button>
    </div>
  );
} 