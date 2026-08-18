import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, ADMIN_EMAIL } from "../firebase";
import { Link } from "react-router-dom";

export default function FormPage() {
  const [form, setForm] = useState({
    name: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
    contactNumber: "",
    course: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("Saving to Firestore...");
    try {
      await addDoc(collection(db, "formSubmissions"), {
        ...form,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      setForm({
        name: auth.currentUser?.displayName || "",
        email: auth.currentUser?.email || "",
        contactNumber: "",
        course: "",
        message: ""
      });
      setStatus("Submitted successfully!");
    } catch (error) {
      setStatus(error.message);
    }
  }

  const isAdmin = auth.currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <section className="card">
      <p className="eyebrow">Cloud Firestore</p>
      <h1>Student Contact Form</h1>
      <p className="muted">Fill in the form. Firebase will save it to Firestore.</p>

      <form onSubmit={submit}>
        <div className="grid">
          <label>Name<input name="name" value={form.name} onChange={change} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
          <label>Contact Number<input name="contactNumber" value={form.contactNumber} onChange={change} required /></label>
          <label>Course
            <select name="course" value={form.course} onChange={change} required>
              <option value="">Select a course</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Business</option>
              <option>Data Science</option>
              <option>Cyber Security</option>
            </select>
          </label>
        </div>
        <label>Message<textarea name="message" rows="5" value={form.message} onChange={change} required /></label>
        <button>Submit Form</button>
      </form>

      <p className="message">{status}</p>

      {isAdmin && (
        <div className="admin-panel">
          <strong>Admin access detected.</strong>
          <Link to="/admin"><button className="secondary">Open Admin Dashboard</button></Link>
        </div>
      )}
    </section>
  );
}
