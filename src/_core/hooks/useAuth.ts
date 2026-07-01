export function useAuth() {
  return {
    user: {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
    },
    loading: false,
    isAuthenticated: true,
  };
}
