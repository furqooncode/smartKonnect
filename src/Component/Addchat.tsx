import Head from '../Navigation/Head.tsx';
import db from '../lib/util.jsx';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../Context/ToggleTheme.tsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const { data: fetched, isError, isPending, error } = useQuery({
    queryKey: ['Chat'],
    queryFn: async () => {
      const res = await db.auth.listUsers();
      return res;
    },
  });

  // Loading state
  if (isPending) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center" 
           style={{ background: colors.background }}>
        <p style={{ color: colors.text }}>Loading chats...</p>
      </div>
    );
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
          {!fetched || fetched.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <p style={{ color: colors.textSecondary }}>No users found</p>
            </div>
          ) : (
            fetched.data.map((users) => (
              <ChatList 
                key={users.id}
                id={users.id}
                name={userId === users.id 
                  ? `${users.data.username} (yourself)` 
                  : users.data.username}
                text="Hey whatsup bro..."
                time="Today"
                num={2}
                isOnline={true}
                isAction="send"
                Imgsrc="https://avatars.githubusercontent.com/u/216797756?s=96&v=4"
                sent="sent"
                handleClick={() => handleClick(users.id)}
              />
            ))
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