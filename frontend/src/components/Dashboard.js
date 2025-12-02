import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.courses.list();
        setCourses(data);
      } catch (e) {
        setErr(e.message || 'Failed to load courses');
      }
    })();
  }, []);

  async function createCourse(e) {
    e.preventDefault();
    try {
      const c = await api.courses.create({ title: newTitle, description: newDesc });
      setCourses([c, ...courses]);
      setNewTitle(''); setNewDesc('');
    } catch (e) {
      setErr(e.message || 'Create failed');
    }
  }

  async function enroll(id) {
    try {
      await api.courses.enroll(id);
      alert('Enrolled successfully');
    } catch (e) {
      setErr(e.message || 'Enroll failed');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>{user.name}</strong> ({user.role})
        </div>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <h3>Courses</h3>
      {err && <div style={{ color: 'red' }}>{err}</div>}

      {user.role === 'teacher' && (
        <form onSubmit={createCourse}>
          <h4>Create Course</h4>
          <div>
            <input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
          </div>
          <div>
            <input placeholder="Description" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
          </div>
          <button type="submit">Create</button>
        </form>
      )}

      <ul>
        {courses.map(c => (
          <li key={c._id}>
            <strong>{c.title}</strong> — {c.description || 'No description'}<br />
            Teacher: {c.teacher?.name || 'Unknown'}
            {user.role === 'student' && <button onClick={() => enroll(c._id)} style={{ marginLeft: 8 }}>Enroll</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}