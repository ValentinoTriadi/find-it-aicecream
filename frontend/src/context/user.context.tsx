import { User } from "@supabase/supabase-js";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth.context";
import { getUserExperience } from "@/api/user";

interface UserContextType {
  user: User | null;
  experience: number | null;
  setUser: (user: User | null) => void;
  setExperience: (experience: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [experience, setExperience] = useState<number | null>(null);

  const auth = useAuth();

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);
  useEffect(() => {
    if (user) {
      getUserExperience(user.id)
        .then((data) => {
          const fetchedExperience = data.experience;
          console.log("Fetched experience:", fetchedExperience);
          setExperience(fetchedExperience);
        })
        .catch((error) => {
          console.error("Error fetching user experience:", error);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, experience, setUser, setExperience }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
