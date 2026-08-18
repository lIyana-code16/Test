import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, ADMIN_EMAIL } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function logout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <header className="topbar">
      <Link to={user ? "/form" : "/login"} className="brand">Firebase Student Demo</Link>
      {user && (
        <div className="nav-actions">
          <span>{user.email}</span>
          {user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && <Link to="/admin">Admin</Link>}
          <button className="secondary" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}
