import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

function AIRecommend() {
  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleRecommend = async () => {
    setLoading(true);
    setRecommendation("");
    setMovies([]);

    try {
      const res = await fetch("https://web-production-94cb.up.railway.app/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.recommendation || "No recommendation found.";
      setRecommendation(text);

      // Smart: Try extracting movie names from AI response
      const extracted = Array.from(
        new Set(
          [...text.matchAll(/"([^"]+)"/g)].map((m) => m[1]) // extract quoted movie names
        )
      );

      // Fake posters using placeholder & titles for now
      const movieCards = extracted.map((title, index) => ({
        id: index + 1,
        title,
        poster_path: `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`
      }));

      setMovies(movieCards);
    } catch (err) {
      setRecommendation("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>
        🎬 <span style={{ color: "#00FFD1" }}>AI-Powered</span> Movie Recommender
      </h1>

      <div
        style={{
          background: "#1c1c1e",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 0 15px rgba(0, 255, 209, 0.2)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Type something like: Recommend a thriller movie like Inception"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #00FFD1",
            marginBottom: "20px",
            fontSize: "1rem",
            backgroundColor: "#121212",
            color: "#fff",
          }}
        />

        <button
          onClick={handleRecommend}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "#00FFD1",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#000",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
          }}
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>

        <div style={{ marginTop: "30px", minHeight: "100px" }}>
          {loading && (
            <div className="spinner" style={{ textAlign: "center" }}>
              <div className="dot-pulse"></div>
              <style>
                {`
                .dot-pulse {
                  position: relative;
                  left: 50%;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background-color: #00FFD1;
                  color: #00FFD1;
                  animation: pulse 1.2s infinite ease-in-out;
                }

                @keyframes pulse {
                  0%, 100% {
                    transform: scale(1);
                    opacity: 0.6;
                  }
                  50% {
                    transform: scale(1.5);
                    opacity: 1;
                  }
                }
              `}
              </style>
            </div>
          )}

          {!loading && recommendation && (
            <div
              style={{
                marginTop: "10px",
                padding: "20px",
                background: "#101010",
                borderLeft: "5px solid #00FFD1",
                borderRadius: "8px",
                fontStyle: "italic",
                lineHeight: "1.6",
              }}
            >
              {recommendation}
            </div>
          )}
        </div>
      </div>

      {movies.length > 0 && (
        <div
          className="mt-16 px-6 max-w-6xl mx-auto"
          style={{ width: "100%", marginTop: "60px" }}
        >
          <h2 className="text-2xl font-bold mb-4">🎥 Suggested Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="rounded overflow-hidden shadow-lg bg-[#1f1f1f] text-white"
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full"
                />
                <div className="px-4 py-2">
                  <div className="font-bold text-md mb-1">{movie.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIRecommend;
