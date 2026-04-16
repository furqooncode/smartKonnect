
import { useTheme } from '../Context/ToggleTheme.tsx';
import Switch from './Switch.tsx';
import { useNavigate } from 'react-router-dom';

export default function Setting(){
  const { colors } = useTheme();
  const navigate = useNavigate();

  const glassActiveStyle = {
    background: 'rgba(59, 130, 246, 0.12)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    color: colors.accent,
  }

  interface SettingItem {
    icon: string,
    iconBg: string,
    iconColor: string,
    title: string,
    subtitle: string,
    right?: React.ReactNode,
  }

  const items: SettingItem[] = [
    {
      icon: 'fas fa-calendar-alt',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#6366F1',
      title: 'Member since',
      subtitle: '23, April 2025',
    },
    {
      icon: 'fas fa-user-friends',
      iconBg: 'rgba(34, 197, 94, 0.15)',
      iconColor: '#22C55E',
      title: 'Friends Konnected',
      subtitle: '+230 friends konnected',
    },
    {
      icon: 'fas fa-id-card',
      iconBg: 'rgba(59, 130, 246, 0.15)',
      iconColor: '#3B82F6',
      title: 'Fullname',
      subtitle: 'Erinola Hamzat Furqoon',
    },
    {
      icon: 'fas fa-at',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#F59E0B',
      title: 'Username',
      subtitle: 'furqooncode',
      right: (
        <div className="w-[30px] h-[30px] rounded-full flex items-center
        justify-center cursor-pointer"
        style={{ background: colors.avatarBg }}
        onClick={() => navigator.clipboard.writeText('furqooncode')}>
          <i className="fas fa-copy text-sm"
          style={{ color: colors.textSecondary }} />
        </div>
      ),
    },
    {
      icon: 'fas fa-fingerprint',
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#EF4444',
      title: 'Unique Id (UID)',
      subtitle: '7282heke92j29s82ojs928b',
      right: (
        <div className="w-[30px] h-[30px] rounded-full flex items-center
        justify-center cursor-pointer"
        style={{ background: colors.avatarBg }}
        onClick={() => navigator.clipboard.writeText('7282heke92j29s82ojs928b')}>
          <i className="fas fa-copy text-sm"
          style={{ color: colors.textSecondary }} />
        </div>
      ),
    },
    {
      icon: 'fas fa-globe-africa',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: '#10B981',
      title: 'Country',
      subtitle: 'Nigeria',
    },
    {
      icon: 'fas fa-map-marker-alt',
      iconBg: 'rgba(236, 72, 153, 0.15)',
      iconColor: '#EC4899',
      title: 'State',
      subtitle: 'Lagos',
    },
    {
      icon: 'fas fa-briefcase',
      iconBg: 'rgba(251, 191, 36, 0.15)',
      iconColor: '#FBBF24',
      title: 'Occupation',
      subtitle: 'Software Engineer',
    },
    {
      icon: 'fas fa-venus-mars',
      iconBg: 'rgba(139, 92, 246, 0.15)',
      iconColor: '#8B5CF6',
      title: 'Gender',
      subtitle: 'Male',
    },
    {
      icon: 'fas fa-info-circle',
      iconBg: 'rgba(59, 130, 246, 0.15)',
      iconColor: '#3B82F6',
      title: 'About',
      subtitle: "I'm a frontend developer i build beautiful and eyecatching websites for people customers and friends lets konnect on SmartKonnect",
    },
    {
      icon: 'fas fa-adjust',
      iconBg: 'rgba(107, 114, 128, 0.15)',
      iconColor: '#6B7280',
      title: 'Switch Theme',
      subtitle: 'Change to light mode',
      right: <Switch />,
    },
    {
      icon: 'fas fa-sign-out-alt',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#F59E0B',
      title: 'Logout',
      subtitle: 'You will have to login again to use SmartKonnect',
    },
    {
      icon: 'fas fa-trash-alt',
      iconBg: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#EF4444',
      title: 'Delete Account',
      subtitle: 'This account will be permanently deactivated',
    },
  ]

  return(
    <div className="min-h-screen pb-6"
    style={{ background: colors.background }}>

      {/* Header */}
      <div className="flex items-center fixed top-0 left-0 w-full
      z-[50] h-[60px] p-3 gap-2"
      style={{
        background: colors.background,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <button className="w-[40px] h-[40px] rounded-full border-none
        outline-none text-lg flex items-center justify-center"
        style={{ color: colors.text }}
        onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <span className="text-lg font-semibold"
        style={{ color: colors.text }}>Settings</span>
      </div>

      {/* Profile card */}
      <div className="p-3 pt-[70px]">
        <div className="w-full rounded-2xl flex gap-3 p-3 items-center"
        style={{ background: colors.surface }}>

          <div className="relative shrink-0 w-[60px] h-[60px] rounded-full overflow-hidden"
          style={{ background: colors.avatarBg }}>
            <img 
            src="https://avatars.githubusercontent.com/u/119232065?v=4"
            alt="avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
            />
          </div>

          <div className="flex flex-col flex-1 gap-1 min-w-0">
            <h3 className="text-base font-semibold truncate"
            style={{ color: colors.textPrimary }}>@furqooncode</h3>
            <div className="flex justify-start">
              <button className="text-xs font-semibold px-2 py-0.5 border-none
              outline-none rounded-full"
              style={glassActiveStyle}>• Busy</button>
            </div>
          </div>

          <i className="fas fa-chevron-right shrink-0"
          style={{ color: colors.textSecondary }} />
        </div>
      </div>

      {/* Settings list */}
      <div className="grid gap-1 px-3">
        {items.map((item, index) => (
          <div key={index}
          className="flex gap-3 w-full overflow-hidden items-center rounded-xl p-3"
          style={{ background: colors.surface }}>

            <div className="w-[34px] h-[34px] shrink-0 rounded-full flex items-center
            justify-center"
            style={{ background: item.iconBg }}>
              <i className={`${item.icon} text-sm`}
              style={{ color: item.iconColor }} />
            </div>

            <div className="flex flex-col flex-1 gap-[2px] min-w-0">
              <h3 className="text-[13px] font-semibold"
              style={{ color: colors.textPrimary }}>{item.title}</h3>
              <span className="text-xs font-normal truncate"
              style={{ color: colors.textSecondary }}>{item.subtitle}</span>
            </div>

            {item.right && item.right}
          </div>
        ))}
      </div>

    </div>
  )
}
