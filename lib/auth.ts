import { User } from "./types";
import { api } from "./api";

const USER_KEY = "auth_user";

export function saveUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  api.clearToken();
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!api.getToken() && !!getStoredUser();
}

export function getRoleRedirect(role: User["role"]): string {
  switch (role) {
    case "superadmin":
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    default:
      return "/login";
  }
}
