import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Get refresh token from localStorage
        const refreshToken = localStorage.getItem("refresh_token");
        
        // Call Django logout endpoint
        await fetch("https://web-production-94cb.up.railway.app/auth/jwt/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken
          }),
        });

        // Clear tokens and redirect
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        // Still clear tokens even if logout API fails
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Logout;