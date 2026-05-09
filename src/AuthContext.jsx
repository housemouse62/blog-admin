import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const token = localStorage.getItem("token");

  const [tokenState, setTokenState] = useState(token || "");
  const [userState, setUserState] = useState(
    token ? jwtDecode(token).tokenUser : "",
  );

  return (
    <AuthContext.Provider
      value={{ tokenState, setTokenState, userState, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;
