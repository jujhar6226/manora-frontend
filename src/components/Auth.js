import React from "react";

function Auth({
  isRegistering,
  setIsRegistering,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleRegister,
  message
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          width: 350,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Manora</h2>

        {isRegistering ? (
          <>
            <h3>Register</h3>
            <input
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{ width: "100%" }} onClick={handleRegister}>
              Register
            </button>
            <p
              style={{ cursor: "pointer", marginTop: 10 }}
              onClick={() => setIsRegistering(false)}
            >
              Already have account? Login
            </p>
          </>
        ) : (
          <>
            <h3>Login</h3>
            <input
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={{ width: "100%", marginBottom: 10, padding: 8 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{ width: "100%" }} onClick={handleLogin}>
              Login
            </button>
            <p
              style={{ cursor: "pointer", marginTop: 10 }}
              onClick={() => setIsRegistering(true)}
            >
              Don't have account? Register
            </p>
          </>
        )}

        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
}

export default Auth;