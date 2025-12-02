const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

let token = null;
const setToken = (t) => (token = t);

async function request(path, options = {}) {
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...headers } });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export default {
  setToken,
  auth: {
    login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) })
  },
  courses: {
    list: () => request('/courses'),
    create: (payload) => request('/courses', { method: 'POST', body: JSON.stringify(payload) }),
    enroll: (id) => request(`/courses/${id}/enroll`, { method: 'POST' })
  }
};