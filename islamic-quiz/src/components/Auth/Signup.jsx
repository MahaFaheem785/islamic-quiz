import { useState } from "react";
import { signup } from "../../services/authService";

export default function Signup({ onSignup, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) return;

  try {
    const res = await signup({ name, email, password });
    console.log("Signup response:", res);

    // Flexible check
    if (res.msg && res.msg.toLowerCase().includes("signup")) {
      console.log("Calling onSignup...");
      alert("Signup successful! Please login.");
      resetForm();
      onSignup();
    } else {
      alert(res.msg || "Signup failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong");
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f3d2e, #1b5e20)",
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
        <h4 className="text-center fw-bold mb-1">Create Account</h4>
        <p className="text-center text-muted mb-4">
          Join Islamic Knowledge 🌙
        </p>

        {/* 🔒 Disable browser autofill */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* 🔥 Chrome autofill hack */}
          <input type="text" name="fakeuser" style={{ display: "none" }} />
          <input type="password" name="fakepass" style={{ display: "none" }} />

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control py-2"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
              required
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                style={{
                  borderRadius: "12px",
                  paddingRight: "42px",
                }}
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
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-100 mt-3 py-2 fw-semibold"
            style={{
              border: "none",
              borderRadius: "14px",
              background: "#2563eb",
              color: "white",
              fontSize: "0.95rem",
            }}
          >
            SIGN UP
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center mt-3" style={{ fontSize: "0.85rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => {
              resetForm(); // ✅ clear on switch
              onSwitch();
            }}
            style={{ color: "#2563eb", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
