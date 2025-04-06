

export function getAuthToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
        
      return token; // ou "access_token" dependendo do seu backend
    }
    return null;
  }
  