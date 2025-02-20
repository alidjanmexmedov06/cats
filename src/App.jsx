import { useState, useEffect } from "react";

const App = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();
      setFact(data.data[0]); // Вземаме първия факт от масива
    } catch (error) {
      console.error("Error fetching the fact:", error);
      setFact("Oops! Couldn't fetch a cat fact. Try again! 🐱");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFact(); // Зареждаме първия факт при mount
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Карта с фактите */}
      <div className="relative bg-black/50 border border-gray-600/50 text-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          🐱 Random Cat Fact
        </h1>

        <div className="mt-4 text-lg text-gray-300 min-h-[60px] transition-all duration-300">
          {loading ? (
            <p className="animate-pulse">⏳ Fetching new fact...</p>
          ) : (
            <p className="leading-relaxed">{fact}</p>
          )}
        </div>

        <button
          onClick={fetchFact}
          disabled={loading}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg tracking-wide border border-white/20"
        >
          {loading ? "Fetching..." : "Нов факт"}
        </button>

        <p className="text-gray-500 text-xs mt-4">
          Powered by MeowFacts API 🐈
        </p>
      </div>
    </div>
  );
};

export default App;

