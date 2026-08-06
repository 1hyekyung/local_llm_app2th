import { useState } from 'react'
import '../styles/components/ChatComposer.css'

const starterPrompts = [
  '파이썬으로 파일을 읽는 법을 알려줘',
  '이 코드를 더 간단하게 정리해줘',
  '로컬 LLM을 설치하는 흐름을 요약해줘',
]

function ChatComposer({ onSend, isSending, placeholder }) {
  const [draft, setDraft] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) {
      return
    }

    onSend(trimmed)
    setDraft('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <div className="composer-card">
      <div className="starter-prompts" aria-label="예시 질문">
        {starterPrompts.map((prompt) => (
          <button key={prompt} type="button" className="starter-prompt" onClick={() => setDraft(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <form className="composer" onSubmit={handleSubmit}>
        <textarea
          className="composer-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          disabled={isSending}
          aria-label="질문 입력"
        />
        <div className="composer-actions">
          <p className="composer-hint">Shift + Enter로 줄바꿈, Enter로 전송할 수 있어요.</p>
          <button type="submit" className="send-button" disabled={isSending || !draft.trim()}>
            {isSending ? '전송 중...' : '전송'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatComposer
