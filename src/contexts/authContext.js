import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoreUser = JSON.parse(storedUser || '""');

    if (parsedStoreUser.token) {
      setLoggedInUser(parsedStoreUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  console.log(loggedInUser);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
