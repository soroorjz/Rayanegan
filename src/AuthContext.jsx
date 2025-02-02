import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // بررسی ورود کاربر هنگام بارگذاری صفحه
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ورود کاربر
  const login = (username) => {
    const userData = { username, avatar: "/assets/images/user-avatar.png" };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوک اختصاصی برای استفاده راحت‌تر از AuthContext
export const useAuth = () => useContext(AuthContext);
