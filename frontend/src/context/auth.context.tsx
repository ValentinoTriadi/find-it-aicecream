import { getUser, signInWithEmail, signOut, signUpNewUser } from '@/api/auth';
import { LoginBody, RegisterBody } from '@/api/schema';
import { User } from '@supabase/supabase-js';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (body: LoginBody) => void;
  register: (body: RegisterBody) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.user) {
          setUser(res.user);
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [navigate]);

  const login = async (body: LoginBody) => {
    try {
      const res = await signInWithEmail(body);

      // Set user
      setUser(res.user);

      navigate('/profile');
    } catch (error) {
      console.error('Error signing in:', error);
      return;
    }
  };

  const register = async (body: RegisterBody) => {
    try {
      const res = await signUpNewUser(body);

      // Set user
      setUser(res.user);
      navigate('/profile');
    } catch (error) {
      console.error('Error signing in:', error);
      return;
    }
  };

  const logout = async () => {
    setUser(null);

    await signOut();

    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
