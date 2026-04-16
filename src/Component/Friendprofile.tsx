import { useTheme } from '../Context/ToggleTheme.tsx';
import { useNavigate } from "react-router-dom"
export default function Friendprofile() {
  const { colors } = useTheme()
  return(
    <div>
      {/*Head*/}
    <div className="flex justify-between items-center fixed top-0 left-0 w-full
    z-100 h-[60px] p-3" style={{
      background: colors.background,
    }}>
      
      <div className="h-full items-center flex gap-2">
        <button className="w-[50px] h-[50px] rounded-full border-none
        outline-none text-lg font-semibold"
        style={{
          color: colors.accentText,
        }}
        onClick={()=>{
          navigate(-1)
        }}>
         <i className="fas fa-chevron-left"></i> 
        </button>
      <span className="text-lg font-base"
      style={{
        color: colors.text,
      }}>
        About
      </span>
      </div>
    </div>
    
    {/*Image*/}
      <div className="w-full grid items-center place-items-center pt-[80px]">
        
        <div className="relative w-[110px] h-[110px] rounded-[50%] bg-red-500">
           <img
        src="https://avatars.githubusercontent.com/u/119232065?v=4"
        alt="profile image"
      className="object-cover w-full h-full rounded-[50%]"
        />
        </div>
        
      <div className="flex flex-col justufy-center items-center gap-0.5">
        <h2 className="text-lg font-semibold"
        style={{
          color: colors.text,
        }}>Erinola Hamzat</h2>
        <span className="text-sm font-normal"
        style={{
          color: colors.textSecondary,
        }}>@furqooncode</span>
      </div>
      </div>
  {/*Boxes*/}
  <div className="flex flex-1 items-center justify-between w-full mt-[10px] px-6">
    
    <div className="w-[49%] h-[90px] rounded-lg flex flex-col
    items-center gap-1 justify-center"
    style={{
      background: colors.surface
    }}>
      <div className="w-full text-center">
     <span className="text-lg font-semibold"
     style={{
       color: colors.text,
     }}>
       <i className="fas fa-user"></i>
     </span>
    <p className="text-xl font-bold"
    style={{
      color: colors.textSecondary,
    }}>230</p>
    </div>
    </div>
    
    {/*share*/}
    <div className="w-[49%] h-[90px] rounded-lg flex flex-col
    items-center gap-1 justify-center"
    style={{
      background: colors.surface
    }}>
      <div className="w-full text-center">
     <span className="text-lg font-semibold"
     style={{
       color: colors.text,
     }}>
       <i className="fas fa-share"></i>
     </span>
    <p className="text-xl font-bold"
    style={{
      color: colors.textSecondary,
    }}>share</p>
    </div>
    </div>
    
  </div>
  {/*About fields*/}
  <div className="grid gap-2 w-full mt-[10px] p-3 overflow-hidden">
    
    <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>Occupation</h3>
      <span className="text-sm font-base"
      style={{
        color: colors.textSecondary,
      }}>Software engineer</span>
    </div>
    
    
     <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>Country</h3>
      <span className="text-sm font-base"
      style={{
        color: colors.textSecondary,
      }}>Nigeria</span>
    </div>
    
    
    <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>State</h3>
      <span className="text-sm font-base"
      style={{
        color: colors.textSecondary,
      }}>Lagos</span>
    </div>
    
    
     <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>Gender</h3>
      <span className="text-sm font-base"
      style={{
        color: colors.textSecondary,
      }}>Male</span>
    </div>
    
    
     <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>About</h3>
      <span className="text-sm font-base"
      style={{
        color: colors.textSecondary,
      }}>I love to code always that is why im called furqooncode</span>
    </div>
    
     <div className="flex flex-col gap-0.5 rounded-lg p-2"
    style={{
      background: colors.surface,
    }}>
      <h3 className="text-sm font-semibold"
      style={{
        color: colors.textPrimary,
      }}>Block furqooncode</h3>
    </div>
    
  </div>
  
  
    </div>
    )
}