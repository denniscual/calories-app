import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useMemo,
} from "react";

interface LoggedUserType {
  id: string;
  roles: string[];
}

type AuthContextType = [
  LoggedUserType,
  Dispatch<SetStateAction<LoggedUserType>>
];

const initLoggedUser: LoggedUserType = {
  id: "",
  roles: [],
};
export const AuthContext = createContext<AuthContextType>([
  initLoggedUser,
  () => {},
]);

export const AuthContextProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState(initLoggedUser);

  useEffect(() => {
    try {
      const loggedUser = localStorage.getItem("user");
      if (loggedUser !== null) {
        const parsed = JSON.parse(loggedUser);
        setAuth({
          id: parsed.id,
          roles: parsed.roles,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const value = useMemo(() => [auth, setAuth] as AuthContextType, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useLogoutUser() {
  const [, setAuth] = useContext(AuthContext);
  function logout() {
    setAuth(initLoggedUser);
    // Remote the token.
    localStorage.removeItem("user");
  }
  return logout;
}
