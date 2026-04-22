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
  const inputStyle = {
    width: "100%",
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  };

  const buttonStyle = {
    width: "100%",
    background: "#4a6cf7",
    color: "white",
    border: "none",
    padding: 12,
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "500",
    marginTop: 5
  };

  const linkStyle = {
    cursor: "pointer",
    marginTop: 12,
    fontSize: 14,
    color: "#4a6cf7",
    textAlign: "center"
  };

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
          width: 380,
          maxWidth: "90%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Manora</h2>

        {isRegistering ? (
          <>
            <h3 style={{ marginBottom: 15 }}>Register</h3>

            <input
              style={inputStyle}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={inputStyle}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={buttonStyle} onClick={handleRegister}>
              Register
            </button>

            <p
              style={linkStyle}
              onClick={() => setIsRegistering(false)}
            >
              Already have account? Login
            </p>
          </>
        ) : (
          <>
            <h3 style={{ marginBottom: 15 }}>Login</h3>

            <input
              style={inputStyle}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={buttonStyle} onClick={handleLogin}>
              Login
            </button>

            <p
              style={linkStyle}
              onClick={() => setIsRegistering(true)}
            >
              Don't have account? Register
            </p>
          </>
        )}

        {message && (
          <p style={{ color: "red", marginTop: 10, fontSize: 14, textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;