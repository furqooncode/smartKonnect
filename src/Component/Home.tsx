
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../Context/ToggleTheme.tsx';
import Addchat from './Addchat.tsx';
import Chatting from './Chatting.tsx';

export default function Home() {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(!!friendId);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Update desktop check on resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync isOpen with friendId from URL
  // If user navigates directly to /Add/:friendId, open the chat
  useEffect(() => {
    if(friendId) setIsOpen(true)
    else setIsOpen(false)
  }, [friendId])

  // Handle phone back button on mobile
  // When back is pressed, close the chat and show friend list
  useEffect(() => {
    const handlePopState = () => {
      if(isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen])

  // Open chat — navigate to friend route and push history
  // so phone back button has somewhere to go back to
  function openChat(friendId: string) {
    navigate(`/Add/${friendId}`)
    setIsOpen(true)
    window.history.pushState(null, '', window.location.href)
  }

  // Close chat — go back in history and reset state
  function closeChat() {
    navigate(-1)
    setIsOpen(false)
  }

  // ── DESKTOP: Side by side layout ──
  if(isDesktop) {
    return (
      <div className="flex w-full" style={{ height: '100dvh' }}>

        {/* Friend list — fixed width on desktop */}
        <div className="shrink-0 h-full overflow-y-auto w-[35%] border-r"
        style={{ borderColor: colors.border }}>
          <Addchat handleClick={(id: string) => openChat(id)} />
        </div>

        {/* Chat area — takes remaining width */}
        <div className="flex flex-col h-full flex-1">
          <Chatting onBack={closeChat} />
        </div>

      </div>
    );
  }

  // ── MOBILE: Slide in/out animation ──
  return (
    <div className="fixed inset-0 overflow-hidden"
    style={{ height: '100dvh' }}>

      {/* Friend list — slides out to the left when chat opens */}
      <div
        className="absolute inset-0 w-full"
        style={{
          transform: isOpen ? 'translateX(-100%)' : 'translateX(0%)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Addchat handleClick={(id: string) => openChat(id)} />
      </div>

      {/* Chat area — slides in from the right when chat opens */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-out',
          zIndex: 30,
        }}
      >
        <Chatting onBack={closeChat} />
      </div>

    </div>
  );
}
