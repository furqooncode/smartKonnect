import { useTheme } from '../Context/ToggleTheme.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileOptions = [
  { name: "Add Friends", path: "/Addfriend", icon: "fa fa-user-plus" },
  { name: "Create Group", path: "/Creategroup", icon: "fa fa-users" },
  { name: "Settings", path: "/Settings", icon: "fa fa-cog" },
];

export default function Head({ title, icon }: { title: string; icon?: string | null }) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <nav
        className="shrink-0 flex justify-between items-center px-4 h-[70px] w-full z-10"
        style={{ background: colors.background }}
      >
        <h3 className="text-3xl font-bold" style={{ color: colors.welcome }}>
          {title}
        </h3>
        <button
          className="w-[42px] h-[42px] rounded-full border-none outline-none
          flex items-center justify-center text-base"
          style={{ background: colors.surface, color: colors.textPrimary }}
          onClick={() => setOpen(true)}
        >
          {icon && <i className={icon} />}
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[100]"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="fixed top-[70px] right-0 z-[200] flex flex-col py-2 rounded-bl-2xl rounded-tl-2xl overflow-hidden transition-all duration-300"
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          minWidth: '200px',
          transform: open ? 'translateX(0)' : 'translateX(110%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {MobileOptions.map((option) => (
          <button
            key={option.path}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition-all"
            style={{ color: colors.textPrimary }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')
            }
            onClick={() => {
              setOpen(false);
              navigate(option.path);
            }}
          >
            <i className={`${option.icon} w-4 text-center`} style={{ color: colors.accent }} />
            {option.name}
          </button>
        ))}
      </div>
    </>
  );
}