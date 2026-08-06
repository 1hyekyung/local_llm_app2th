import '../styles/components/ChatHeader.css'

function ChatHeader({ title, model, models, isLoadingModels, onModelChange }) {
  return (
    <header className="chat-header">
      <div>
        <p className="header-eyebrow">초보자 친화형 채팅</p>
        <h1>{title}</h1>
      </div>

      <label className="model-picker">
        <span>모델</span>
        <select
          value={model || ''}
          onChange={(event) => onModelChange(event.target.value)}
          disabled={isLoadingModels || models.length === 0}
          aria-label="사용할 모델 선택"
        >
          {isLoadingModels ? (
            <option value="">모델 불러오는 중...</option>
          ) : models.length === 0 ? (
            <option value="">모델이 없습니다</option>
          ) : (
            models.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          )}
        </select>
      </label>
    </header>
  )
}

export default ChatHeader
