import { useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ChatComposer from './ChatComposer'
import { fetchModels, sendChatMessage } from '../api/chatApi'
import '../styles/chat.css'

const DEFAULT_SYSTEM_PROMPT = '너는 초보자를 돕는 친절한 AI 강사다.'

function createConversation(title = '새 대화') {
  return {
    id: Date.now().toString(),
    title,
    messages: [],
  }
}

function ChatPage() {
  const [conversations, setConversations] = useState([createConversation('오늘의 대화')])
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id)
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)
  const [temperature, setTemperature] = useState(0.5)
  const [topP, setTopP] = useState(0.9)
  const [numPredict, setNumPredict] = useState(512)
  const [isLoadingModels, setIsLoadingModels] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) || conversations[0],
    [activeConversationId, conversations],
  )

  useEffect(() => {
    const loadModels = async () => {
      try {
        const fetchedModels = await fetchModels()
        setModels(fetchedModels)

        if (fetchedModels.length > 0) {
          setSelectedModel((current) => {
            if (current && fetchedModels.includes(current)) {
              return current
            }
            return fetchedModels[0]
          })
        } else {
          setSelectedModel('')
        }
      } catch (error) {
        setErrorMessage(error.message || '모델 목록을 불러오지 못했습니다.')
        setModels([])
        setSelectedModel('')
      } finally {
        setIsLoadingModels(false)
      }
    }

    loadModels()
  }, [])

  const updateActiveConversation = (updater) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversationId
          ? updater(conversation)
          : conversation,
      ),
    )
  }

  const handleSendMessage = async (rawMessage) => {
    const message = rawMessage.trim()
    if (!message) {
      setErrorMessage('질문을 입력한 뒤 전송해주세요.')
      return
    }

    const activeModel = selectedModel || models[0] || ''
    if (!activeModel) {
      setErrorMessage('사용 가능한 모델이 없습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setIsSending(true)
    setErrorMessage('')

    updateActiveConversation((conversation) => ({
      ...conversation,
      messages: [
        ...conversation.messages,
        { id: `${conversation.id}-user-${Date.now()}`, role: 'user', content: message },
      ],
    }))

    try {
      const response = await sendChatMessage({
        message,
        model: activeModel,
        systemPrompt,
        temperature,
        topP,
        numPredict,
      })

      updateActiveConversation((conversation) => ({
        ...conversation,
        title: conversation.title === '새 대화' ? message.slice(0, 18) : conversation.title,
        messages: [
          ...conversation.messages,
          {
            id: `${conversation.id}-assistant-${Date.now()}`,
            role: 'assistant',
            content: response.message || '응답이 비어 있습니다.',
          },
        ],
      }))
    } catch (error) {
      updateActiveConversation((conversation) => ({
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            id: `${conversation.id}-error-${Date.now()}`,
            role: 'assistant',
            content: '응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.',
            error: true,
          },
        ],
      }))
      setErrorMessage(error.message || '응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSending(false)
    }
  }

  const handleNewConversation = () => {
    const nextConversation = createConversation('새 대화')
    setConversations((current) => [nextConversation, ...current])
    setActiveConversationId(nextConversation.id)
    setErrorMessage('')
  }

  return (
    <div className="chat-shell">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={handleNewConversation}
        onSelectConversation={setActiveConversationId}
        systemPrompt={systemPrompt}
        temperature={temperature}
        topP={topP}
        numPredict={numPredict}
        onSystemPromptChange={setSystemPrompt}
        onTemperatureChange={setTemperature}
        onTopPChange={setTopP}
        onNumPredictChange={setNumPredict}
      />

      <main className="chat-main">
        <ChatHeader
          title="로컬 LLM 도우미"
          model={selectedModel || models[0] || ''}
          models={models}
          isLoadingModels={isLoadingModels}
          onModelChange={setSelectedModel}
        />

        <div className="chat-content">
          <MessageList messages={activeConversation?.messages || []} isSending={isSending} />
          {errorMessage ? <div className="status-banner error">{errorMessage}</div> : null}
        </div>

        <ChatComposer
          onSend={handleSendMessage}
          isSending={isSending}
          placeholder="질문을 입력해보세요. 예: 파이썬으로 파일을 읽는 법을 알려줘"
        />
      </main>
    </div>
  )
}

export default ChatPage
