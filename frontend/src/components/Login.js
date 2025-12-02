import React, { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [err, setErr] = useState(null);

  async function submit(e) {
    e.preventDefault();
    try {
      let res;
      if (isRegister) {
        res = await api.auth.register({ name, email, password, role });
      } else {
        res = await api.auth.login({ email, password });
      }
      api.setToken(res.token);
      onLogin(res);
    } catch (error) {
      setErr(error.message || 'Error');
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={submit}>
        {isRegister && (
          <>
            <div>
              <label>Name</label><br />
              <input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label>Role</label><br />
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <hr />
      <button onClick={() => { setIsRegister(v => !v); setErr(null); }}>
        {isRegister ? 'Have an account? Login' : 'No account? Register'}
      </button>
    </div>
  );
}