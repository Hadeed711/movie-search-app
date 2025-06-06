import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        await fetch("https://web-production-94cb.up.railway.app/auth/jwt/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setLoading(false); // Stop loader
        alert("Successfully logged out!");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setLoading(false); // Stop loader
        alert("You have been logged out (even if API failed).");
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading && <p>Logging you out...</p>}
    </div>
  );
};

export default Logout;
