import { createContext, useContext, useEffect, useState, FC } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
interface AuthContextInterface {
  user: object | null;
  setUser: any;
}

const initialContext = {
  user: null,
  setUser: null,
};

const AuthContext = createContext<AuthContextInterface>(initialContext);

export const AuthProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user', {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (user !== null) return;
    fetchUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
