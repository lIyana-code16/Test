import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setMessage("Creating account...");
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: name.trim() });
      navigate("/form");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="card auth-card">
      <p className="eyebrow">Firebase Authentication</p>
      <h1>Create account</h1>
      <p className="muted">This creates a user in Firebase Authentication.</p>
      <form onSubmit={submit}>
        <label>Name<input value={name} onChange={e => setName(e.target.value)} required /></label>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        <button>Register</button>
      </form>
      <p className="switch">Already registered? <Link to="/login">Login</Link></p>
      <p className="message">{message}</p>
    </section>
  );
}
