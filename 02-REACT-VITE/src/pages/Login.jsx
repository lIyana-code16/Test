import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMessage("Logging in...");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/form");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="card auth-card">
      <p className="eyebrow">Firebase Authentication</p>
      <h1>Login</h1>
      <p className="muted">Sign in before accessing the form.</p>
      <form onSubmit={submit}>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        <button>Login</button>
      </form>
      <p className="switch">Don't have an account? <Link to="/register">Register</Link></p>
      <p className="message">{message}</p>
    </section>
  );
}
