import { useTheme } from '../Context/ToggleTheme.tsx';
import { useState, useEffect } from 'react';
import { useChat } from '../Context/Chatcontext.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react'
import db from '../lib/util.jsx';
import { useQuery , useQueryClient} from '@tanstack/react-query';
import { FormatTime } from './FormatTime.tsx'

interface Chatoption {
  name: string,
  action: () => void,
  icon: string,
}

interface InputProps {
  add: boolean,
  setAdd: (val: boolean) => void,
  inputRef: React.RefObject<HTMLDivElement>,
  handleSendText: () => void,
}

interface AddOption {
  name: string,
  action: () => void,
  icon: string,
}

interface ContextMenu {
  visible: boolean,
  x: number,
  y: number,
  type: 'sender' | 'receiver',
  msg: string,
}

// ── SKELETON LOADING ──
function ChatSkeleton() {
  const { colors } = useTheme();
  return (
    <div className="flex flex-col h-full" style={{ background: colors.background }}>
      <nav className="shrink-0 flex justify-between p-3 items-center h-[60px]
      animate-pulse"
        style={{ background: colors.background, borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full" style={{ background: colors.skeleton }} />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded" style={{ background: colors.skeleton }} />
            <div className="h-3 w-28 rounded" style={{ background: colors.skeleton }} />
          </div>
        </div>
        <div className="w-10 h-10 rounded-full" style={{ background: colors.skeleton }} />
      </nav>

      <div className="flex-1 p-4 space-y-6 overflow-hidden">
        <div className="flex justify-end">
          <div className="h-16 w-64 rounded-3xl" style={{ background: colors.skeleton }} />
        </div>
        <div className="flex justify-start">
          <div className="h-12 w-56 rounded-3xl" style={{ background: colors.skeleton }} />
        </div>
        <div className="flex justify-end">
          <div className="h-20 w-72 rounded-3xl" style={{ background: colors.skeleton }} />
        </div>
      </div>

      <div className="shrink-0 p-3" style={{ background: colors.background }}>
        <div className="h-14 rounded-3xl w-full" style={{ background: colors.skeleton }} />
      </div>
    </div>
  );
}



// ── MODERN EMPTY STATE ──
function EmptyChatState() {
  const { colors } = useTheme();
  return (
    <div className="flex flex-col h-full items-center justify-center text-center px-6"
         style={{ background: colors.background }}>
      <div className="w-28 h-28 mb-8 rounded-3xl flex items-center justify-center"
           style={{ background: colors.surface }}>
        <i className="fas fa-comments text-6xl" style={{ color: colors.accent }} />
      </div>
      <h2 className="text-3xl font-semibold mb-3" style={{ color: colors.textPrimary }}>
        No chat here yet
      </h2>
      <p className="text-base max-w-xs" style={{ color: colors.textSecondary }}>
        Select a conversation from the left to start messaging
      </p>
    </div>
  );
}

export function Head({onBack, name, active}:{
  onBack: ()=> void,
  name: string,
  active: string,
}){
  const [open, setOpen] = useState<boolean>(false);
  const { colors } = useTheme();
  const navigate = useNavigate()
 
  const ChatOption: Chatoption[] = [
    {
      name: "View profile",
      action: () => navigate("/About"),
      icon: "fas fa-user"
    },
    { 
      name: "Clear Chat",
      action: () => alert("Sudo clear chats"),
      icon: "fas fa-trash" 
    },
    { 
      name: "Block",
      action: () => alert("Block am straight"), 
      icon: "fas fa-user-slash",
    },
  ] 

  return(
    <nav className="shrink-0 flex justify-between p-3 items-center h-[60px] text-white w-full z-10"
    style={{
      background: colors.background,
      borderBottom: `1px solid ${colors.border}`
    }}>
      <div className="flex gap-2 h-[50px]">
        <div className="flex h-full">
          <button className="border-none outline-none text-xl font-semibold
          w-[30px] h-full flex items-center justify-center"
          style={{ color: colors.text }}
          onClick={onBack}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>

        <div className="w-[50px] h-[50px] rounded-full overflow-hidden"
        style={{ background: colors.avatarBg }}>
          <img 
          src="?"
          alt="user"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
          />
        </div>
     
        <div className="grid gap-[1px] w-[60%] cursor-pointer"
        onClick={() => navigate("/About")}>
          <h3 className="text-lg font-semibold truncate"
          style={{ color: colors.textPrimary }}>{name}</h3>
          <span className="text-sm font-normal mt-[-5px]"
          style={{ color: colors.textSecondary }}>{active}</span>
        </div>
      </div>
     
      <button className="w-[42px] h-[42px] rounded-full text-lg
      font-semibold border-none outline-none flex items-center justify-center"
      style={{ color: colors.text, background: colors.border }}
      onClick={() => setOpen((prev) => !prev)}>
        <i className="fa fa-ellipsis-v text-base" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[100]"
          onClick={() => setOpen(false)}
        />
      )}
      
      <div
        className="fixed top-[60px] right-0 z-[200] flex flex-col py-2
        rounded-bl-2xl rounded-tl-2xl overflow-hidden transition-all duration-300"
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          minWidth: '200px',
          transform: open ? 'translateX(0)' : 'translateX(110%)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {ChatOption.map((option) => (
          <button
            key={option.name}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium
            text-left transition-all"
            style={{ color: colors.textPrimary }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')
            }
            onClick={() => {
              setOpen(false);
              option.action();
            }}
          >
            <i className={`${option.icon} w-4 text-center`}
            style={{ color: colors.accent }} />
            {option.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export function Sender({msg, time, status, onLongPress}: {
  msg: string,
  time: string,
  status: string,
  onLongPress: (e: React.MouseEvent, type: 'sender', msg: string) => void,
}){
  const { colors } = useTheme();
  return(
    <div className="flex justify-end"
    onContextMenu={(e) => {
      e.preventDefault()
      onLongPress(e, 'sender', msg)
    }}>
      <div className="relative grid p-2 gap-1 min-w-[180px] max-w-[300px] pb-[5px]"
      style={{
        background: colors.messageSent,
        borderRadius: "16px 0 16px 16px"
      }}>
        <span className="text-sm pb-[18px]"
        style={{ color: colors.text }}>{msg}</span>
        <div className="absolute bottom-1 flex justify-between w-full px-2">
          <span className="text-xs font-normal"
          style={{ color: colors.sent }}>{status}</span>
          <span className="text-xs font-normal"
          style={{ color: colors.sent }}>{time}</span>
        </div>
      </div>
    </div>
  )
}

export function Receiver({msg, time, onLongPress}: {
  msg: string,
  time: string,
  onLongPress: (e: React.MouseEvent, type: 'receiver', msg: string) => void,
}){
  const { colors } = useTheme();
  return(
    <div className="flex justify-start"
    onContextMenu={(e) => {
      e.preventDefault()
      onLongPress(e, 'receiver', msg)
    }}>
      <div className="relative grid p-2 gap-1 min-w-[120px] max-w-[300px] pb-[5px]"
      style={{
        background: colors.messageReceived,
        borderRadius: "0 16px 16px 16px"
      }}>
        <span className="text-sm pb-[18px]"
        style={{ color: colors.text }}>{msg}</span>
        <div className="absolute bottom-1 flex justify-end w-full px-2">
          <span className="text-xs font-normal"
          style={{ color: colors.time }}>{time}</span>
        </div>
      </div>
    </div>
  )
}

function Input({setAdd, inputRef, handleSendText }: InputProps){
  const { colors } = useTheme();
  const { message, setMessage, selectedMedia, removeMedia } = useChat();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

const textareaRef = useRef<HTMLTextAreaElement>(null)

useEffect(() => {
  if(message === '' && textareaRef.current) {
    textareaRef.current.style.height = 'auto'
  }
}, [message])


  return(
    <div ref={inputRef} className="shrink-0 flex items-end justify-between p-3 gap-2 relative z-10"
    style={{ backgroundColor: colors.background }}>

      <div className="flex flex-col flex-1 rounded-3xl overflow-hidden"
      style={{
        background: colors.surface,
        border: `1.5px solid ${colors.border}`,
      }}>

        {selectedMedia.length > 0 && (
          <div className="flex gap-2 p-2 overflow-x-auto">
            {selectedMedia.map((media, index) => (
              <div key={index}
              className="relative shrink-0 w-[60px] h-[60px] rounded-xl overflow-hidden"
              style={{ background: colors.chatItemBg }}>

                {media.type === 'image' && (
                  <img src={media.previewUrl}
                  className="w-full h-full object-cover" />
                )}

                {media.type === 'video' && (
                  <video src={media.previewUrl}
                  className="w-full h-full object-cover" />
                )}

                {media.type === 'audio' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-music text-lg"
                    style={{ color: colors.accent }} />
                  </div>
                )}

                {media.type === 'docs' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-file-alt text-lg"
                    style={{ color: colors.accent }} />
                  </div>
                )}

                <button
                  className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full
                  flex items-center justify-center text-[10px]"
                  style={{ background: colors.accent, color: colors.accentText }}
                  onClick={() => removeMedia(index)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 px-3 py-2 pl-14">
          <textarea
          rows={1}
          value={message}
          ref={textareaRef}
          className="placeholder:text-gray-400 w-full text-[15px] font-normal
          outline-none resize-none overflow-y-auto bg-transparent"
          placeholder="write message"
          style={{
            color: colors.text,
            minHeight: '32px',
            maxHeight: '120px',
          }}
          onChange={handleChange}
          />
        </div>
      </div>

      <button className="absolute w-[44px] h-[44px] rounded-full left-5
      bottom-3.5 text-lg font-normal border-none outline-none flex items-center
      justify-center z-10"
      style={{ background: colors.border, color: colors.text }}
      onClick={() => setAdd(true)}>
        <i className="fas fa-plus"></i>
      </button>

      <div className="w-[55px] h-[55px] flex items-center justify-center shrink-0">
        {message.trim().length === 0 && selectedMedia.length === 0 ? (
          <button
            className="rounded-full w-[50px] h-[50px] border-none outline-none text-lg"
            style={{ background: colors.accent, color: colors.accentText }}>
            <i className="fas fa-microphone"></i>
          </button>
        ) : (
          <button
            className="rounded-full w-[50px] h-[50px] border-none outline-none text-lg"
            style={{ background: colors.accent, color: colors.accentText }}
            onClick={handleSendText}>
            <i className="fas fa-paper-plane"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default function Chatting({onBack} : {
  onBack:()=> void,
}) {
  const { colors } = useTheme()
  const { message, clearAll } = useChat();
  const queryClient = useQueryClient()
  const { handleSelectMedia } = useChat()
  const [add, setAdd] = useState<boolean>(false)
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    visible: false,
    x: 0,
    y: 0,
    type: 'sender',
    msg: '',
  })

  const inputRef = useRef<HTMLDivElement>(null)

  function handleLongPress(
    e: React.MouseEvent,
    type: 'sender' | 'receiver',
    msg: string
  ) {
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      msg,
    })
  }

  function closeMenu(): void {
    setContextMenu(prev => ({ ...prev, visible: false }))
  }

  const AddOption: AddOption[] = [
    {
      name: "Image",
      icon: "fas fa-image",
      action: () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.multiple = true
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          if (files) handleSelectMedia(files, 'image')
        }
        input.click()
      }
    },
    {
      name: "Video",
      icon: "fas fa-film",
      action: () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'video/*'
        input.multiple = true
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          if (files) handleSelectMedia(files, 'video')
        }
        input.click()
      }
    },
    {
      name: "Docs",
      icon: "fas fa-file-alt",
      action: () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.pdf,.doc,.docx,.txt'
        input.multiple = true
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          if (files) handleSelectMedia(files, 'docs')
        }
        input.click()
      }
    },
    {
      name: "Audio",
      icon: "fas fa-microphone",
      action: () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'audio/*'
        input.multiple = true
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          if (files) handleSelectMedia(files, 'audio')
        }
        input.click()
      }
    },
  ]


// scroll dowm chatting


 
  // setting up chatting konnection privacy
const { friendId } = useParams();
const UserId = db.auth.getUser()?.id;
const chatContainerRef = useRef<HTMLDivElement>(null);
  let currentUnread = 0;

const { data: conversationId} = useQuery({
  queryKey: ['conversation', friendId, UserId],
  queryFn: async()=>{
    if(!friendId || !UserId) return;
  // sort id so order dkesnt matter
  
  const [id1, id2] = [UserId, friendId].sort();
  //list from database to check if it exixt
  const exist = await db.listDocuments("convo", {
   filters:{ 
   user1_id : id1,
   user2_id : id2,
   }
 })
   
if(exist.length > 0){
  return exist[0].id
}else{
  const newConvo = await db.createDocument("convo", {
    user1_id: id1,
    user2_id: id2,
  })
  return newConvo.id
  }
},
  enabled:!!friendId &&!!UserId,
})



//list messages
const { data: chat, isPending:chatpending} = useQuery({
  queryKey: ["chat", conversationId],
  queryFn: async()=>{
    if(!conversationId && UserId) return [];

  const res = await db.listDocuments("messages", {
       filters:{
         convoId: conversationId ?? ""
       },
     })
     return res
  },
  enabled :!!friendId && !!conversationId
})


useEffect(() => {
  const watcher = db.realtime.collection("messages")

  watcher.onConnected(() => {
    console.log("realtime connected")
  })

  watcher.onCreate((payload) => {
  console.log("Oncreate", payload)
    const msgData = payload.data.data
    const currentConvoId = queryClient.getQueryData<string>(['conversation', friendId, UserId]);

    if (!currentConvoId) return;

    if(msgData.convoId === currentConvoId) {
      queryClient.setQueryData(["chat", currentConvoId], (prev: any) => {
        const newMsg = {
          id: payload.data.id,
          data: msgData
        }
        if(!prev) return [newMsg]

        const filtered = prev.filter((m: any) =>
          !(m.data.pending && m.data.text === msgData.text)
        )
        return [...filtered, newMsg]
      })
    }
  })

  watcher.connect()

  return () => {
    watcher.disconnect()
  
  }
}, [conversationId ]) // ← empty dependency array — connect ONCE only



useEffect(() => {
  if(!conversationId) return
  db.updateDocument("convo", conversationId!, {
    unread_count: 0
  })
}, [conversationId])



const { data: fetched, isError } = useQuery({
    queryKey: ['FriendsChatList'],
    queryFn: async () => {
      const res = await db.auth.listUsers();
      return res;
    },
  });

useEffect(() => {
  const timer = setTimeout(() => {
    if(chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, 100)
  return () => clearTimeout(timer)
}, [chat]);
 

//send message 
async function SendMessage() {
  const freshConvoId = queryClient.getQueryData<string>(['conversation', friendId, UserId]);
  console.log("freshConvoId:", freshConvoId) 
  
  const optimisticMsg = {
    id: crypto.randomUUID(),
    data: {
      text: message,
      senderId: UserId,
      isread: false,
      mediaurl: null,
      convoId: conversationId,
      time: new Date().toISOString(),
      pending: true,
    }
  };

  queryClient.setQueryData(["chat", conversationId], (prev: any) => {
    if (!prev) return [optimisticMsg];
    return [...prev, optimisticMsg];
  });

  clearAll();

  try {
    await db.createDocument("messages", {
      text: optimisticMsg.data.text,
      senderId: UserId,
      isread: false,
      mediaurl: null,
      convoId: conversationId,
      time: optimisticMsg.data.time,
    });


    await db.updateDocument("convo", conversationId!, {
      last_message: optimisticMsg.data.text,
      last_messageTime: optimisticMsg.data.time,
      last_sender: UserId,
      unread_count: currentUnread + 1,
    });
queryClient.invalidateQueries({ queryKey: ['Dms'] });

  } catch (error) {
    queryClient.invalidateQueries({ queryKey: ["chat", conversationId] });
    alert((error as Error).message);
  }
}




if(!friendId){
    return <EmptyChatState />
}

  if(chatpending){
    return <ChatSkeleton />;
  }
 
  if(isError || !fetched){
    return <p style={{color: colors.text}}>An error occurred</p>
  }
 
 
  const friendName = fetched.data.find(u => u.id === friendId)

  return(
    <div className="flex flex-col" style={{
    height: "100dvh",
    background: colors.background
    }}>

      <Head onBack={onBack} name={friendName?.data?.username || "Chat"} active="last seen recently" />

{/* ── MESSAGES AREA ── */}
     

<div 
  ref={chatContainerRef}
  className="flex-1 overflow-y-auto p-3 space-y-3 h-full overscroll-contain"
  style={{ 
    background: colors.background,
    overflowAnchor: 'none',
  }}
>
  {!chat || chat.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
      
      {/* Icon container */}
      <div 
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: colors.surface }}
      >
        <i className="fas fa-comment-dots text-4xl" style={{ color: colors.accent }} />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
        No messages yet
      </h3>
      <p className="text-sm max-w-[240px] leading-relaxed" style={{ color: colors.textSecondary }}>
        Be the first to say something. Send a message to get the conversation started.
      </p>

      {/* Divider hint */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-8 h-[1px]" style={{ background: colors.border }} />
        <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
          Messages are end-to-end encrypted
        </span>
        <div className="w-8 h-[1px]" style={{ background: colors.border }} />
      </div>

      {/* Lock icon */}
      <div className="mt-3">
        <i className="fas fa-lock text-xs" style={{ color: colors.textSecondary }} />
      </div>

    </div>
  ) : (
    [...chat]
      .sort((a, b) => new Date(a.data.time).getTime() - new Date(b.data.time).getTime())
      .map((msg) => (
        msg.data.senderId === UserId ? (
          <Sender
            key={msg.id}
            msg={msg.data.text}
            time={FormatTime(msg.data.time)}
            status={msg.data.pending ? 
  "fas fa-clock text-xs" 
: msg.data.isread ? 
  "seen"
 : 
  "delivered"
}
            onLongPress={handleLongPress}
          />
        ) : (
          <Receiver
            key={msg.id}
            msg={msg.data.text}
            time={FormatTime(msg.data.time)}
            onLongPress={handleLongPress}
          />
        )
      ))
  )}
</div>




      {/* ── INPUT AREA ── */}
      <Input 
      add={add} 
      setAdd={setAdd} 
      inputRef={inputRef}
      handleSendText={SendMessage}
      />

      {/* Add options menu */}
      <div
        className="fixed bottom-[70px] left-0 z-[200] flex flex-col py-2
        rounded-br-2xl rounded-tr-2xl overflow-hidden transition-all duration-300"
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          minWidth: '200px',
          transform: add ? 'translateX(0)' : 'translateX(-110%)',
          opacity: add ? 1 : 0,
          pointerEvents: add ? 'auto' : 'none',
        }}
      >
        {AddOption.map((option) => (
          <button
            key={option.name}
            className="flex items-center gap-3 px-5 py-3 text-sm font-medium
            text-left transition-all"
            style={{ color: colors.textPrimary }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')
            }
            onClick={(e) => {
              e.stopPropagation()
              setAdd(false);
              option.action();
            }}
          >
            <i className={`${option.icon} w-4 text-center`}
            style={{ color: colors.accent }} />
            {option.name}
          </button>
        ))}
      </div>

      {add && (
        <div className="fixed inset-0 bg-black/40 z-[100]"
        onClick={(e) => { e.stopPropagation(); setAdd(false); }} />
      )}

      {/* Context Menu - Only ONE block */}
      {contextMenu.visible && (
        <>
          <div className="fixed inset-0 z-[300]" onClick={closeMenu} />
          <div
            className="fixed z-[400] flex flex-col py-2 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              minWidth: '180px',
              top: Math.min(contextMenu.y, window.innerHeight - 180),
              left: Math.min(contextMenu.x, window.innerWidth - 200),
            }}
          >
            <button
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition-all"
              style={{ color: colors.textPrimary }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
              onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(contextMenu.msg); closeMenu(); }}
            >
              <i className="fas fa-copy w-4 text-center" style={{ color: colors.accent }} />
              Copy
            </button>

            {contextMenu.type === 'sender' && (
              <button
                className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition-all"
                style={{ color: colors.textPrimary }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                onClick={(e) => { e.stopPropagation(); alert('Edit: ' + contextMenu.msg); closeMenu(); }}
              >
                <i className="fas fa-pen w-4 text-center" style={{ color: colors.accent }} />
                Edit
              </button>
            )}

            <button
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-left transition-all"
              style={{ color: '#EF4444' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = colors.chatItemActive)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
              onClick={(e) => { e.stopPropagation(); alert('Delete: ' + contextMenu.msg); closeMenu(); }}
            >
              <i className="fas fa-trash w-4 text-center" />
              Delete
            </button>
          </div>
        </>
      )}

    </div>
  )
}