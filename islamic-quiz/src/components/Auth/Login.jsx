import { useState } from "react";
import { login as loginService } from "../../services/authService"; // adjust path

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (email && password) {
    try {
      const res = await loginService({ email, password });
      console.log("📥 Backend response:", res);

      if (res.user) {
        alert(`Welcome ${res.user.name}!`);

        setEmail("");
        setPassword("");

        onLogin(res.user);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Something went wrong");
    }
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #063e06ff, #bcd8c1ff)",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          padding: "32px",
          borderRadius: "22px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h4 className="text-center fw-bold mb-1">Islamic Knowledge</h4>
        <p className="text-center text-muted mb-4">Login to continue</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden dummy input to prevent autofill */}
          <input type="text" style={{ display: "none" }} />

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control py-2"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "12px" }}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <label className="form-label fw-semibold">Password</label>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#4f46e5",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </span>
            </div>

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: "12px", paddingRight: "42px" }}
                autoComplete="new-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  color: "#6c757d",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-100 mt-4 py-2 fw-semibold"
            style={{
              border: "none",
              borderRadius: "14px",
              background: "#6366f1",
              color: "white",
              fontSize: "0.95rem",
            }}
          >
            LOG IN
          </button>
        </form>

        {/* Signup */}
        <p className="text-center mt-3" style={{ fontSize: "0.85rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={onSwitch}
            style={{ color: "#6366f1", cursor: "pointer" }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
