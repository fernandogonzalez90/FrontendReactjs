// authServices.tsx
import axios, { AxiosInstance } from "axios";

const API_URL = "https://devgonzalezf.com.ar/backend/api/";

interface User {
  username: string;
  access: string;
  refresh: string;
}

interface TokenResponse {
  access: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });

    this.api.interceptors.request.use(
      async (config) => {
        const user = this.getCurrentUser();
        if (user && user.access) {
          config.headers["Authorization"] = `Bearer ${user.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await this.refreshToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return this.api(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(username: string, password: string): Promise<User> {
    const response = await this.api.post<User>("token/", {
      username,
      password,
    });
    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  async refreshToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (user && user.refresh) {
      const response = await this.api.post<TokenResponse>("token/refresh/", {
        refresh: user.refresh,
      });
      if (response.data.access) {
        user.access = response.data.access;
        localStorage.setItem("user", JSON.stringify(user));
        return response.data.access;
      }
    }
    return null;
  }

  getApi(): AxiosInstance {
    return this.api;
  }
}

const authService = new AuthService();
export default authService;
