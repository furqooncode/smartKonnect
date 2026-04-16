import { useTheme } from '../Context/ToggleTheme.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export function Searchinput() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>('');
  return (
    <div className="fixed left-0 top-0 w-full flex items-center z-[100] gap-1 p-3"
    style={{
      background: colors.background,
    }}>
      
      {/*back buttom*/}
      
    <div className="w-[60px] h-[60px] flex items-center justify-center">
      <button className="w-[50px] h-[50px] rounded-full text-lg font-semibold
      border-none outline-none"
      style={{
        color: colors.text,
        background: colors.border,
      }}
      onClick={()=>{
        navigate(-1)
      }}>
        <i className="fas fa-chevron-left"></i>
      </button>
    </div>
      {/* Search bar */}
      
      <div className="relative flex items-center w-full">
        <i
          className="fa fa-at absolute left-4 text-base"
          style={{ color: colors.textSecondary }}
        />
        <input
          type="text"
          value={search}
          placeholder="Search with username or uid"
          className="w-full h-[48px] pl-10 pr-12 rounded-2xl text-sm font-normal outline-none"
          style={{
            background: colors.surface,
            color: colors.textPrimary,
            border: `1.5px solid ${colors.border}`,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        {search.length > 0 && (
          <button
            className="absolute right-3 flex items-center justify-center w-[30px] h-[30px] rounded-full"
            style={{ background: colors.border, color: colors.textSecondary }}
            onClick={() => setSearch('')}
          >
            <i className="fa fa-times text-sm" />
          </button>
        )}
      </div>

      {/* Filter tabs */}

    </div>
  );
}


export function Output(){
  const { colors } = useTheme();
  const about = "hello,I am a frontend developer, i build website for people that needs my service all i love is coding";
  
  const glassActiveStyle = {
  background: 'rgba(59, 130, 246, 0.12)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid rgba(59, 130, 246, 0.15)',
  color:colors.accent,
}

  return(
    <div className="pt-[80px] flex items-center justify-center">
      
      {/*card*/}
      <div className="w-[80%] lg:w-[50%] md:w-[80%] rounded-lg grid grid-col-2 gap-1 p-3"
      style={{
        background: colors.surface,
      }}>
        {/*image here*/}
      <div className="w-full min-h-[250px] rounded-xl"
        style={{
          background: colors.background,
        }}>
          <img 
          src="https://avatars.githubusercontent.com/u/119232065?v=4"
          alt="user"
          className="w-full h-full rounded-xl object-cover"
          />
    </div>
    
            {/*description*/}
      <div className="w-full rounded-xl"
      style={{
        background: colors.surface,
      }}>
      <div className="rounded-xl w-full shadow-2xl
      backdrop-blur-lg border border-white/20 grid gap-1 p-3"
      style={glassActiveStyle}>
        {/*name/about/locatiom*/}
     <div className="flex flex-col gap-0.5 w-full">
    <h3 className="text-[15px] font-semibold"
        style={{
          color:colors.text,
        }}>Hamzat Erinola</h3>
      <span className="text-xs font-normal"
      style={{
        color: colors.textSecondary,
      }}>@furqooncode</span>
    <p className="text-sm font-normal"
    style={{
      color: colors.textPrimary,
    }}>{about} {about.length}</p>
  <div className="flex gap-2 items-center flex-wrap">
   <span className="text-xs font-normal"
   style={{
     color: colors.text,
   }}>C : Nigeria</span>
   
   <span className="text-xs font-normal"
   style={{
     color: colors.textPrimary,
   }}>S : Lagos</span>
   
   <span className="text-xs font-normal"
   style={{
     color: colors.textSecondary,
   }}>St : Busy</span>
   
  </div>
  
      {/*konnect*/}
     <div className="flex items-center justify-end gap-3 p-2">
    <button className="p-[8px] min-w-[80px] rounded-lg"
    style={{
      background: colors.border,
    }}>
      <span className="text-sm font-normal flex items-center gap-3"
      style={{
        color: colors.text,
      }}>
        <i className="fas fa-user"></i>
        230
      </span>
    </button>
    
    
    <button className="p-[8px] min-w-[80px] rounded-lg pr-3"
    style={{
      background: colors.accent,
    }}>
      <span className="text-sm font-semibold flex items-center gap-2"
      style={{
        color: colors.accentText,
      }}>
        <i className="fas fa-plus"></i>
        Konnect
      </span>
    </button>
    
    
         </div>
          </div>
       </div>
   </div>
       
       
  </div>
</div>
    )
}

export function Related(){
  const { colors } = useTheme();
  return(
    <div className="flex items-center gap-3 rounded-2xl p-2 w-full
    overflow-hidden"
      style={{
      background: colors.chatItemBg 
      }}>
     {/*Image here*/} 
        <div
        className="relative shrink-0 w-[52px] h-[52px] rounded-full overflow-hidden"
        style={{ 
        background: colors.avatarBg }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/152976701?v=4"
          alt="avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      
    {/*Name and about*/}
    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
      <h3 className="text-[15px] font-semibold truncate"
      style={{
        color: colors.text,
      }}>Isreal dominic</h3>
      <span className="text-xs font-base truncate"
      style={{
        color: colors.textSecondary,
      }}>@dycoder: I'm a fullstack developer, i build website for people and
      friends lets konnect</span>
    </div>
    
    <div className="w-[100px] h-full flex items-center justify-center">
      <button className="w-full p-2 rounded-lg border-none rounded-lg
      text-sm font-semibold "
      style={{
        color: colors.accentText,
        background: colors.accent,
      }}>
        <i className="fas fa-plus"></i>
        Konnect
      </button>
    </div>
    
    </div>
    )
}



export default function Addfriend() {
  const { colors } = useTheme();
  return(
    <div className="min-h-[100vh]"
    style={{
      background: colors.background,
    }}>
     <Searchinput />
     <Output />
     <div className="mt-[10px] p-3 grid gap-2">
       <h3 className="text-lg font-semibold"
       style={{
         color: colors.textSecondary
       }}>Related Search</h3>
       
      <Related />
      <Related />
      <Related />
     </div>
    </div>
    )
}