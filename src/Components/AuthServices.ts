import axios from 'axios';

const API_URL = 'https://backendjango.ddns.net/api/';

interface User {
  username: string;
  access: string;
  refresh: string;
}

const authService = {
  login: async (username: string, password: string): Promise<User> => {
    const response = await axios.post<User>(API_URL + 'token/', { username, password });
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: (): void => {
    localStorage.removeItem('user');
  },
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
  refreshToken: async (): Promise<string | null> => {
    const user = authService.getCurrentUser();
    if (user && user.refresh) {
      const response = await axios.post<{ access: string }>(API_URL + 'token/refresh/', { refresh: user.refresh });
      if (response.data.access) {
        user.access = response.data.access;
        localStorage.setItem('user', JSON.stringify(user));
        return response.data.access;
      }
    }
    return null;
  },
};

export default authService;