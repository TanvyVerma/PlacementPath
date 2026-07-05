import API from './api';

export const registerUser = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post('/api/auth/login', userData);
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/api/auth/me');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
