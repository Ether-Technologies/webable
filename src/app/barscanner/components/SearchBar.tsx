interface SearchBarProps {
  onSearch: (barcode: string) => Promise<void>;
  isLoading: boolean;
  manualBarcode: string;
  setManualBarcode: (value: string) => void;
}

export default function SearchBar({
  onSearch,
  isLoading,
  manualBarcode,
  setManualBarcode,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(manualBarcode);
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 shadow-2xl mb-6 md:mb-8 border-2 border-emerald-400/30">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center tracking-tight">
        Enter Product Barcode
      </h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-2xl mx-auto">
        <input
          type="text"
          value={manualBarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter barcode number"
          className="w-full md:flex-1 px-6 py-4 text-lg rounded-xl bg-emerald-800/40 border-2 border-emerald-400/30 text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20 backdrop-blur-md transition-all duration-200"
          disabled={isLoading}
        />
        <button
          onClick={() => onSearch(manualBarcode)}
          disabled={isLoading || !manualBarcode}
          className="w-full md:w-auto px-8 py-4 text-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800/40 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out min-w-[140px] border-2 border-emerald-400/50 hover:border-emerald-300/50 disabled:border-emerald-600/30 shadow-lg shadow-emerald-900/20"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
} 