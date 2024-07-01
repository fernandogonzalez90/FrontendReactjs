import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://18.231.219.84:8000/api/';

interface User {
  access: string;
  refresh: string;
}

interface DecodedToken {
  exp: number;
}

const authService = {
  login: async (username: string, password: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(API_URL + 'token/', { username, password });
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

  isTokenValid: (): boolean => {
    const user = authService.getCurrentUser();
    if (user && user.access) {
      const decodedToken: DecodedToken = jwtDecode(user.access);
      return decodedToken.exp * 1000 > Date.now();
    }
    return false;
  },
};

export default authService;