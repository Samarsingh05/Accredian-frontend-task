import React, { useState } from "react";
import "./App.css";
import {
  FaCopy,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function App() {
  const [referralCode] = useState("SAMAR143");
  const [copied, setCopied] = useState(false);
  const [refereeName, setRefereeName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleReferral = async () => {
    if (!refereeName || !refereeEmail) {
      setMessage("Please enter the referee's name and email.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerName: "Samar",
          referrerEmail: "samar@example.com",
          refereeName,
          refereeEmail,
          course: "AI & ML",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Referral sent successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to send referral. Please try again.");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    setIsLoginOpen(false);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {}
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {}
      <button className="login-button" onClick={() => setIsLoginOpen(true)}>
        Login
      </button>

      {}
      {isLoginOpen && (
        <div className="login-modal" onClick={() => setIsLoginOpen(false)}>
          <div className="login-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setIsLoginOpen(false)}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      <header className="header">
        <h1>Refer & Earn</h1>
        <p>Invite your friends and earn rewards!</p>
      </header>

      <div className="referral-box">
        <h2>Your Referral Code</h2>
        <div className="code-container">
          <span className="referral-code">{referralCode}</span>
          <button className="copy-button" onClick={copyToClipboard}>
            <FaCopy /> {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">👥 Invite your friends with your code.</div>
          <div className="step">🎁 They sign up and complete an action.</div>
          <div className="step">💰 You earn exciting rewards!</div>
        </div>
      </section>

      <div className="referral-form">
        <h2>Refer a Friend</h2>
        <input
          type="text"
          placeholder="Friend's Name"
          value={refereeName}
          onChange={(e) => setRefereeName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Friend's Email"
          value={refereeEmail}
          onChange={(e) => setRefereeEmail(e.target.value)}
        />
        <button className="refer-now" onClick={handleReferral}>
          Refer Now
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="share-buttons">
        <h3>Share on</h3>
        <FaFacebook className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaLinkedin className="social-icon" />
      </div>
    </div>
  );
}

export default App;
