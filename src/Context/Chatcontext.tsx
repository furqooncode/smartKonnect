import { useState, useContext, createContext } from 'react'

interface MediaFile {
  file: File,
  previewUrl: string,
  type: 'image' | 'video' | 'audio' | 'docs'
}

interface ChatContextType {
  message: string,
  setMessage: (val: string) => void,
  selectedMedia: MediaFile[],
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>('')
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([])

const MAX_SIZE_MB = 40;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

function handleSelectMedia(files: FileList, type: MediaFile['type']) : void{
  const fileArray = Array.from(files)
  const remaining = 5 - selectedMedia.length

  if (remaining <= 0) {
    alert('Maximum 5 files allowed')
    return
  }

  // check size before anything
  const oversized = fileArray.filter(file => file.size > MAX_SIZE_BYTES)
  if (oversized.length > 0) {
    alert(`Some files exceed the ${MAX_SIZE_MB}MB limit and were removed`)
  }

  const validFiles = fileArray
    .filter(file => file.size <= MAX_SIZE_BYTES)
    .slice(0, remaining)

  if (validFiles.length === 0) return

  const newMedia: MediaFile[] = validFiles.map(file => ({
    file,
    previewUrl: URL.createObjectURL(file),
    type,
  }))

  setSelectedMedia(prev => [...prev, ...newMedia])
}


  function removeMedia(index: number):void {
    URL.revokeObjectURL(selectedMedia[index].previewUrl)
    setSelectedMedia(prev => prev.filter((_, i) => i !== index))
  }

  function clearAll() :void{
    selectedMedia.forEach(m => URL.revokeObjectURL(m.previewUrl))
    setSelectedMedia([])
    setMessage('')
  }

  return(
    <ChatContext.Provider value={{
      message,
      setMessage,
      selectedMedia,
      handleSelectMedia,
      removeMedia,
      clearAll,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
}