// movie-search-app/src/pages/AIRecommend.jsx
import { useState } from "react";

function AIRecommend() {
  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://web-production-94cb.up.railway.app/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Use stored JWT
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setRecommendation(data.recommendation || "No recommendation found.");
    } catch (err) {
      setRecommendation("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎬 AI Movie Recommendation</h2>
      <input
        type="text"
        placeholder="Type a prompt like 'Suggest a movie like Inception'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: 10, width: "70%" }}
      />
      <button onClick={handleRecommend} style={{ marginLeft: 10, padding: 10 }}>
        Get Recommendation
      </button>
      <div style={{ marginTop: 20 }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            <strong>{recommendation}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default AIRecommend;
