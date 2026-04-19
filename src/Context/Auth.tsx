import { useContext, createContext } from 'react';
import db from '../lib/util.tsx';
import { useState, useEffect } from 'react';
import { Uploadimage } from '../CloudStorage/Uploadimage.ts';

const AuthContext = createContext()
export function AuthProvider({children} : {children: React.ReactNode}){
 interface SignupAuth {
   username: string,
   fullname: string,
   email: string,
   password: string,
 }
 
 interface LoginAuth {
   email: string,
   password: string,
 }
 
 interface moreData {
   occupation: string,
 country: string,
 state:string,
 gender: string,
 about: string,
 status : string,
 }
 
 const defaultImg =
 "https://res.cloudinary.com/dlijiq0w3/image/upload/v1775963049/ldqbwxn1zpgxqoutdszh.jpg";
 
 const [user, setUser] = useState<null | string>(null);
 const [loading, setLoading] = useState<boolean>(true);
 
  const [selectedPics, setSelectedPics] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<null | string>(defaultImg);
  const [profileSize, setProfileSize] = useState<null | string>(null);
 
   // Call initAuth ONCE on mount
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
        
        // If user suddenly becomes null, token expired
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

    // Start checking every 30 seconds
    const interval = setInterval(checkAuth, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [user]);


  // Format file size
  function formatFileSize(bytes: string | number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Handle profile picture selection
  function handleImgChange(e : React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("This file isn't accepted");
      return;
    }

    setSelectedPics(file);
    const preview = URL.createObjectURL(file);
    setProfileUrl(preview);
    let space = formatFileSize(file.size);
    setProfileSize(space);
  }
  
  
 //signup user
 const register = async(email, password, username, fullname): Promise<void> =>{
   setLoading(true)
  //first list users
const past = await db.auth.listUsers();
console.log(past)
const taken = past.data.some((user) => user.data.username.trim().toLowerCase()
=== username.trim().toLowerCase())

if(taken){
  throw new Error("username already taken!!")
  setLoading(false)
  return;
}else{
   const signup: SignupAuth = await db.auth.register({
     email, password,
     data:{
      username, 
     fullname,
     }
   })
   setUser(db.auth.user || null)
   setLoading(false)
}
 }
 
 //login
 const login = async(email, password): Promise<void> =>{
   setLoading(true)
   const Log : LoginAuth = await db.auth.login({email, password})
   setUser(db.auth.user || null)
   setLoading(false)
 }
 
  // Logout
  const logout = async () => {
      await db.auth.logout();
      setUser(null)
  };
  
  //Add more info
  async function Addinfo(occupation, country,
 state,
 gender,
 about,
 status) : Promise<void>{
   setLoading(true)
 // declare outside so both blocks can access
  let url = defaultImg;
  let publicId = "";

  if (selectedPics !== null) {
    console.log("uploading avatar");
  try{
    const result = await Uploadimage(selectedPics);
    url = result.url;
    publicId = result.publicId;
  }catch(error){
    console.log(error.message)
    alert("error")
  }
}

  console.log("saving to db")
   const details : moreData = await db.createDocument("details", {
     occupation,
     country,
     state,
     gender,
     status,
     about,
    userimg: url,
    imgId: publicId,
     user_id: db.auth.getUser().id,
   })
 }
 
  return(
    <AuthContext.Provider value={{
      register,
      login,
      user,
        loading,
        isAuthenticated: !!user,
        selectedPics,
        profileUrl,
        profileSize,
        Addinfo,
        logout,
        handleImgChange,
        setLoading,
    }}>
     {children} 
    </AuthContext.Provider>
    )
}

export function useAuth(){
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth must be used within ChatProvider")
  }
    return context;
}