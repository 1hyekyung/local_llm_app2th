import SettingsPanel from './SettingsPanel'
import '../styles/components/Sidebar.css'

function Sidebar({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  systemPrompt,
  temperature,
  topP,
  numPredict,
  onSystemPromptChange,
  onTemperatureChange,
  onTopPChange,
  onNumPredictChange,
}) {
  return (
    <aside className="sidebar-panel">
      <div className="sidebar-top">
        <div>
          <p className="sidebar-label">대화</p>
          <h2>로컬 LLM 채팅</h2>
        </div>
        <button type="button" className="new-chat-button" onClick={onNewConversation}>
          + 새 대화
        </button>
      </div>

      <div className="conversation-list" role="list">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            className={`conversation-item ${conversation.id === activeConversationId ? 'active' : ''}`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <span className="conversation-title">{conversation.title}</span>
            <span className="conversation-meta">
              {conversation.messages.length > 0 ? `${conversation.messages.length}개 메시지` : '새 대화'}
            </span>
          </button>
        ))}
      </div>

      <SettingsPanel
        systemPrompt={systemPrompt}
        temperature={temperature}
        topP={topP}
        numPredict={numPredict}
        onSystemPromptChange={onSystemPromptChange}
        onTemperatureChange={onTemperatureChange}
        onTopPChange={onTopPChange}
        onNumPredictChange={onNumPredictChange}
      />
    </aside>
  )
}

export default Sidebar
