import Head from '../Navigation/Head.tsx';
import db from '../lib/util.jsx';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../Context/ToggleTheme.tsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatHometime } from './FormatHometime.tsx'

interface filter {
  name: string,
  value: null | number
}

const FILTERS:filter[] = [
  { name: 'All', value: 123 },
  { name:'Unread', value: 3 },
  { name:'Groups', value:1 },
  { name:'Favourites', value: null },
];

function ChatListSkeleton({ count = 10 }: { count?: number }) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col h-full w-full animate-pulse"
    style={{ background: colors.background }}>

      {/* Search bar skeleton */}
      <div className="px-4 pt-[85px] pb-3">
        <div className="h-[48px] w-full rounded-2xl"
        style={{ background: colors.skeleton }} />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2 px-4 pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[32px] w-[70px] rounded-xl shrink-0"
          style={{ background: colors.skeleton }} />
        ))}
      </div>

      {/* Chat items skeleton */}
      <div className="flex flex-col gap-1 px-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl"
          style={{ background: colors.skeleton + '40' }}>

            {/* Avatar */}
            <div className="shrink-0 w-[52px] h-[52px] rounded-full"
            style={{ background: colors.skeleton }} />

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                <div className="h-4 rounded-lg w-[140px]"
                style={{ background: colors.skeleton }} />
                <div className="h-3 rounded-lg w-[40px] shrink-0"
                style={{ background: colors.skeleton }} />
              </div>
              <div className="h-3 rounded-lg w-[80%]"
              style={{ background: colors.skeleton }} />
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export function Filter() {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  return (
    <div className="flex flex-col gap-3 px-4 pt-2 pb-2 w-full">
      {/* Search bar */}
      <div className="relative flex items-center w-full">
        <i className="fa fa-at absolute left-4 text-base" style={{ color: colors.textSecondary }} />
        <input
          type="text"
          value={search}
          placeholder="Search.."
          className="w-full h-[48px] pl-10 pr-12 rounded-2xl text-sm font-normal outline-none"
          style={{
            background: colors.surface,
            color: colors.textPrimary,
            border: `1.5px solid ${colors.border}`,
          }}
          onChange={(e) => setSearch(e.target.value)}
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
      <div className="flex gap-2 items-center overflow-x-auto no-scrollbar w-full">
        {FILTERS.map((f) => (
          <button
            key={f.name}
            onClick={() => setActiveFilter(f.name)}
            className="shrink-0 text-xs font-semibold rounded-xl px-4 h-[32px] transition-all"
            style={{
              background: activeFilter === f.name ? colors.accent : colors.surface,
              color: activeFilter === f.name ? colors.accentText : colors.textSecondary,
              border: `1.5px solid ${activeFilter === f.name ? colors.accent : colors.border}`,
            }}
          >
            {f.name} {f.value && (f.value > 99 ? "99+" : f.value)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChatList({name, text, time, num, Imgsrc, isOnline, isAction, sent, handleClick, id}) {
  const { colors } = useTheme();

  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-1.5 w-full"
      style={{ background: colors.chatItemBg }}
      onClick={handleClick}
      key={id}
    >
      {/* Avatar */}
      <div className="relative shrink-0 w-[48px] h-[48px] rounded-full overflow-hidden"
           style={{ background: colors.avatarBg }}>
        <img
          src={Imgsrc}
          alt="avatar"
          className="w-full h-full object-cover"
          onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
        />
        <span 
          className="absolute bottom-3 right-0 w-[13px] h-[13px] rounded-full border-2"
          style={{
            background: isOnline ? '#22C55E' : 'gray',
            borderColor: colors.chatItemBg,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-[15px] font-semibold truncate" style={{ color: colors.textPrimary }}>
            {name}
          </h3>
          <span className="text-xs shrink-0" style={{ color: colors.time }}>{time}</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm truncate" style={{ color: colors.textSecondary }}>{text}</p>
          
          {isAction === 'receive' ? (
            <span className="shrink-0 flex items-center justify-center text-xs h-[22px] w-[22px] rounded-full"
                  style={{ background: colors.unreadBadge, color: colors.unreadBadgeText }}>
              {num > 99 ? "99+" : num}
            </span>
          ) : (
            <span className="text-xs" style={{ color: colors.textSecondary }}>{sent}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Addchat({ handleClick }) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const userId = db.auth.getUser().id;

  const { data, isError, isPending, error } = useQuery({
    queryKey: ['Dms'],
    queryFn: async () => {
     const friends = await db.auth.listUsers();
      const friendDp = await db.listDocuments("Details")
      const userConvo = await db.listDocuments("convo")
      return { friends, friendDp, userConvo }
    },
  });
  
  const friends = data?.friends
const friendDp = data?.friendDp
const userConvo = data?.userConvo
console.log(friends)
console.log("userConvo", userConvo)
console.log("friendDp", friendDp)
  // Loading state
  if (isPending) {
    return <ChatListSkeleton />
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center" 
           style={{ background: colors.background }}>
        <p style={{ color: colors.text }}>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">

      <Head title="SmartKonnect" icon=":" />

      <div className="flex-1 overflow-y-auto w-full">
        <Filter />

        <div className="flex flex-col gap-1 px-4 pb-24 w-full">
          {!friends || friends.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <p style={{ color: colors.textSecondary }}>No users found</p>
            </div>
          ) : (
  friends.data.map((users) => {
  
  const userProfile = friendDp?.find((dp) => dp.data.user_id === users.id)
  console.log("userProfile", userProfile)
  
  const lastDm = userConvo?.find((dm) => dm.data.user1_id === users.id)
  console.log("lastDm", lastDm)
  
  return (
    <ChatList 
      key={users.id}
      id={users.id}
      name={userId === users.id 
        ? `${users.data.username} (yourself)` 
        : users.data.username}
      text={lastDm?.data?.last_message || "Start a conversation"}
      time={
      FormatHometime(lastDm?.data?.last_messageTime) || ""}
      num={lastDm?.data?.last_sender !== userId 
  ? lastDm?.data?.unread_count 
  : 0}
      isOnline={true}
      isAction="send"
      Imgsrc={userProfile?.data?.userimg || ''}
      sent="sent"
      handleClick={() => handleClick(users.id)}
    />
  )
})
)}
        </div>
      </div>

      {/* Floating Add Button - Mobile Only */}
      <div 
        className="fixed right-6 bottom-10 h-[65px] w-[65px] rounded-2xl
        text-2xl flex items-center justify-center shadow-lg z-50 lg:hidden"
        style={{
          background: colors.accent,
          color: colors.accentText,
        }}
        onClick={() => navigate("/Addfriend")}
      >
        <i className="fas fa-pen-to-square"></i>
      </div>

    </div>
  );
}