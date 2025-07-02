import { useState } from "react";

function AIRecommend() {
  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    setRecommendation("");
    try {
      const res = await fetch("https://web-production-94cb.up.railway.app/api/recommend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px", // pushes content below navbar
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
          style={{
            width: "100%",
            padding: "14px",
            background: "#00FFD1",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#000",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>

        {recommendation && (
          <div
            style={{
              marginTop: "30px",
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
  );
}

export default AIRecommend;
