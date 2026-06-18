import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import db from '../lib/util.tsx';
import { Uploadimage } from '../CloudStorage/Uploadimage.ts';

 
interface AppUser {
  id: string;
  data: Record<string, any>;
}


interface AuthContextType {
  register: (email: string, password: string, username: string, fullname: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
  user: AppUser | null,
  isAuthenticated: boolean,
  selectedPics: File | null,
  profileUrl: string | null,
  profileSize: string | null,
  Addinfo: (occupation: string, country: string, state: string, gender: string, about: string, status: string) => Promise<void>,
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setLoading: (val: boolean) => void,
}

const defaultImg = "https://res.cloudinary.com/dlijiq0w3/image/upload/v1775963049/ldqbwxn1zpgxqoutdszh.jpg";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [selectedPics, setSelectedPics] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(defaultImg);
  const [profileSize, setProfileSize] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await db.auth.initAuth();
        await db.auth.getCurrentUser();
        setUser(db.auth.user || null);
        setLoading(false);
      } catch (error) {
        console.error("initAuth error:", error);
        setUser(null);
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await db.auth.getCurrentUser();
        const currentUser = db.auth.user || null;
        if (!currentUser && user) {
          console.log('Token expired, logging out...');
          setUser(null);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.log('token check failed:', error);
        setUser(null);
      }
    };

    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, [user]);

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("This file isn't accepted");
      return;
    }
    setSelectedPics(file);
    setProfileUrl(URL.createObjectURL(file));
    setProfileSize(formatFileSize(file.size));
  }
function generateUID(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';
  for (let i = 0; i < 20; i++) {
    uid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uid;
}

const joinDate = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long', 
  year: 'numeric',
}).replace(/(\d+) (\w+) (\d+)/, '$1, $2 $3');


  const register = async (email: string, password: string, username: string,
  fullname: string, uid: string): Promise<void> => {
    setLoading(true);
    const past = await db.auth.listUsers();
    const taken = past.data.some((u: AppUser) =>
      String(u.data.username).trim().toLowerCase() === username.trim().toLowerCase()
    );

    if (taken) {
      setLoading(false);
      throw new Error("username already taken!!");
    }

    await db.auth.register({
      email, password,
      data: { 
        username, 
        fullname, 
        uid: generateUID,
        memberSince: joinDate,
      }
    });

    setUser(db.auth.user || null);
    setLoading(false);
  }

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    await db.auth.login({ email, password });
    setUser(db.auth.user || null);
    setLoading(false);
  }

  const logout = async (): Promise<void> => {
    await db.auth.logout();
    setUser(null);
  };

  async function Addinfo(
    occupation: string,
    country: string,
    state: string,
    gender: string,
    about: string,
    status: string
  ): Promise<void> {
    setLoading(true);
    let url = defaultImg;
    let publicId = "";

    if (selectedPics !== null) {
      try {
        const result = await Uploadimage(selectedPics);
        url = result.url;
        publicId = result.publicId;
      } catch (error) {
        console.log((error as Error).message);
        alert("error uploading image");
      }
    }

    await db.createDocument("details", {
      occupation,
      country,
      state,
      gender,
      status,
      about,
      userimg: url,
      imgId: publicId,
      user_id: db.auth.getUser()?.id,
    });

    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{
      register,
      login,
      logout,
      user,
      
      isAuthenticated: !!user,
      selectedPics,
      profileUrl,
      profileSize,
      Addinfo,
      handleImgChange,
  
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}