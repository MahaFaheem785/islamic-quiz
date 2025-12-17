import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome/Welcome";
import QuizEngine from "./components/data/QuizEngine";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Results from "./components/Results/Results";
import questionBank from "./components/data/questionBank";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [category, setCategory] = useState(null);

  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setScreen("welcome");
  };

 const handleStartQuiz = () => {
  if (!category) return alert("Select category");
  setScreen("quiz");
};


  const handleQuizComplete = async (score) => {
    const total = questionBank[category].length;

    try {
      await axios.post("http://localhost:5000/api/auth/save-result", {
        email: user.email,
        name: user.name,
        category,
        score,
        total,
      });
    } catch (err) {
      console.log("Error saving result:", err);
      alert("Failed to save result!");
    }

    setCategory(null);
    setScreen("results");
  };

  return (
    <>
      <Navbar
        title="🕌 Islamic Knowledge"
        menuItems={["Home", "Results"]}
        onMenuClick={(item) => {
          if (!user) return alert("Login first");
          if (item === "Home") setScreen("welcome");
          if (item === "Results") setScreen("results");
        }}
      />

      {screen === "login" && (
        <Login
  onLogin={handleLogin}
  onSwitch={() => setScreen("signup")}
 />

      )}

      {screen === "signup" && (
        <Signup
          onSignup={() => setScreen("login")} // 🔹 after signup, go login
          onSwitch={() => setScreen("login")} // 🔹 switch manually
        />
      )}

      {screen === "welcome" && (
        <Welcome
          selectedCategory={category}
          onCategorySelect={setCategory}
          onStart={handleStartQuiz}
        />
      )}

      

      {screen === "quiz" && (
        <QuizEngine category={category} onExit={handleQuizComplete} />
      )}

      {screen === "results" && user && <Results user={user} />}

      <Footer />
    </>
  );
}
