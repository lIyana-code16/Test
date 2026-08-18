import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("Loading submissions...");

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, "formSubmissions"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setRows(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setMessage(`${snapshot.size} submission(s) loaded.`);
      } catch (error) {
        setMessage(error.message);
      }
    }
    load();
  }, []);

  return (
    <section className="card">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Cloud Firestore</p>
          <h1>Admin Dashboard</h1>
          <p className="muted">Submitted form information.</p>
        </div>
        <Link to="/form"><button className="secondary">Back to Form</button></Link>
      </div>

      <p className="message">{message}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Contact</th><th>Course</th><th>Message</th><th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan="6">No submissions yet.</td></tr>
            ) : rows.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.contactNumber}</td>
                <td>{row.course}</td>
                <td>{row.message}</td>
                <td>{row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString() : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
