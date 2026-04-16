import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from ''
import Addchat from './Addchat.tsx';
import Chatting from './Chatting.tsx';
import db from '../lib/util.jsx';
import { useQuery } from '@tanstack/react-query';

function useIsDesktop() {
  return window.innerWidth >= 1024;
}


export default function Home() {
const { friendId } = useParams();
const navigate = useNavigate();



  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 450);

  // Update desktop check on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop: Side by side (no change)
  if (isDesktop) {
    return (
      <div className="flex h-full w-full">

        {/* ── FRIEND LIST ── */}
        <div
          className="shrink-0 h-full overflow-y-auto w-full lg:w-[35%]"
        >
    <Addchat handleClick={(friendId) => {
    navigate(`/Add/${friendId}`)
   setIsOpen(true)
  }} />
        </div>

        {/* ── CHAT AREA ── */}
        <div
          className="shrink-0 h-full overflow-y-auto w-full lg:w-[65%]"
        >
          <Chatting onBack={() => {
          navigate(-1)
          setIsOpen(false)
          }}
          />
        </div>

      </div>
    );
  }

  // Mobile: Click only (No swipe)
  return (
    <div className="fixed inset-0 overflow-hidden">

    {/* ── FRIEND LIST ── */}
<div
  className="absolute inset-0 overflow-hidden w-full"
  style={{
    transform: isOpen ? 'translateX(-100%)' : 'translateX(0%)',
    transition: 'transform 0.3s ease-out',
  }}
>
  <Addchat handleClick={(friendId) => {
    navigate(`/Add/${friendId}`)
   setIsOpen(true)
  }} />
</div>


      {/* ── CHAT AREA ── */}
      <div
        className="absolute inset-0  overflow-hidden"
        style={{
          transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-out',
          zIndex: 30,
        }}
      >
        <Chatting
        onBack={() => {
        navigate("/Add")
        setIsOpen(false)
        }} />
      </div>

    </div>
  );
}