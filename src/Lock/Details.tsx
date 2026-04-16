import { useTheme } from '../Context/ToggleTheme.tsx';
import { useAuth } from '../Context/Auth.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
{/*import { Country, State } from 'country-state-city';
*/}
interface Details {
  occupation: string,
 country: string,
 state:string,
 gender: string,
 about: string,
 status : string,
}
export default function Details(){
  const { colors } = useTheme();
  const navigate = useNavigate()
   const { handleImgChange, profileUrl, Addinfo } = useAuth();
 const [details, setDetails] = useState<Details>({
   occupation:"",
   gender:"male",
   about:"",
   country:"nigeria",
   state:"lagos",
   status:"",
 })
 {/*const countries = Country.getAllCountries()
  const states = State.getStatesOfCountry(details.country)*/}
  
  function handleChange(e: React.EventChange<HTMLInputElement>):void{
    const { name , value } = e.target;
    setDetails((prev)=>({
      ...prev,
      [name]: value,
    }))
  }
  
  
  
async function Submit(): Promise<void>{
    if(!details.occupation || !details.about || !details.status){
      alert("please fill in all field")
      return;
    }
    
  try{
    await Addinfo(
      details.occupation,
     details.country,
     details.state,
     details.gender,
     details.about,
     details.status,)
     alert("details uploaded")
     navigate("/Add")
  }catch(error){
    alert(error.message)
  }
  
  }
  return(
    <div className="min-h-[100vh]"
    style={{
      background: colors.background,
    }}>
      {/*Head*/}
    <div className="fixed w-full flex justify-between items-center p-3 z-100
    h-[50px] top-0 left-0"
    style={{
      background: colors.background,
    }}>
      <h3 className="text-xl font-normal"
      style={{
        color: colors.text,
      }}>Setup your Profile</h3>
      <span className="text-lg font-base"
      style={{
        color: colors.accent,
      }}>Skip</span>
    </div>
    
    {/*Profiles*/}
    <div className="grid gap-3 p-3 pt-[120px] ">
      {/*Image*/}
      <div className="w-full flex items-center justify-center">
        
        <div className="relative w-[180px] h-[180px] rounded-[50%] bg-red-500">
           <img
        src={profileUrl}
        alt="profile image"
      className="object-cover w-full h-full rounded-[50%]"
        />
      <label htmlFor="file"
      className="absolute w-[45px] h-[45px] rounded-[50%] bottom-5
      right-0 flex items-center justify-center"
     style={{
       background: colors.accent,
       color: colors.accentText,
     }}
      >
       <i className="fas fa-camera"></i>
      
      </label>
        </div>
      <input 
      type="file"
      accept="image/*"
      className="hidden"
      id="file"
      onChange={handleImgChange}
      />
      </div>
      
      {/*inputs*/}
      <div className="form grid gap-5 grid-column grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full">
          {/*occupation*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>occupation:</span>
       <input 
       type="text"
       placeholder="e.g software developer"
       name="occupation"
       value={details.occupation}
       onChange={handleChange}
       className="text-sm font-semibold border-[2px]
       focus:border-blue p-[12px] rounded-xl outline-none w-[100%]"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       />
     </div>
     
       {/*about*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>about:</span>
       <input 
       type="text"
       placeholder="e.g I'm a frontend developer"
       name="about"
       value={details.about}
       onChange={handleChange}
       className="text-sm font-semibold border-[2px]
       focus:border-blue p-[12px] rounded-xl outline-none w-full"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       />
     </div>
     
     
       {/*country*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>Country:</span>
       <select
       className="text-sm font-semibold border-[2px]
       focus:border-blue p-[12px] rounded-xl outline-none w-full"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       name="country"
       value={details.country}
       onChange={handleChange}
       >
       <option>nigeria</option>
       <option>Japan</option>
       <option>UK</option>
       </select>
     </div>
     
     
       {/*state*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>state:</span>
       <select
       className="text-sm font-semibold border-[2px]
       focus:border-blue p-[12px] rounded-xl outline-none w-full"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       name="state"
       value={details.state}
       onChange={handleChange}
       >
       <option>lagos</option>
       <option>ogunstate</option>
       <option>Enugu</option>
       </select>
     </div>
     
     
       {/*state*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>gender:</span>
       <select
       className="text-sm font-semibold border-[2px]
     focus:border-blue p-[12px] rounded-xl outline-none w-full"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       name="gender"
       value={details.gender}
       onChange={handleChange}
       >
       <option>male</option>
       <option>female</option>
       <option>Rather not say</option>
       </select>
     </div>
     
     
      {/*status*/}
        <div className="grid gap-1">
       <span className="text-sm font-semibold uppercase"
       style={{
         color: colors.textPrimary,
       }}>staus:</span>
       <input 
       type="text"
       placeholder="e.g Busy"
       className="text-sm font-semibold border-[2px]
       focus:border-blue p-[12px] rounded-xl outline-none w-full"
       style={{
         background: colors.surface,
         color: colors.textPrimary,
         borderColor: colors.border,
       }}
       name="status"
       value={details.status}
       onChange={handleChange}
       />
     </div>
     
      </div>
      
      {/*submit button*/}
      <div className="flex justify-center align-center px-3 py-8">
        <button className="border-none outline-none p-[13px] rounded-xl w-full"
        style={{
          background: colors.accent,
          color: colors.accentText,
        }}
        onClick={Submit}>
          Finish Profile 
        </button>
      </div>
    </div>
    
    
    </div>
    )
}