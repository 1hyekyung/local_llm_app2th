import MessageBubble from './MessageBubble'
import '../styles/components/MessageBubble.css'

function MessageList({ messages, isSending }) {
  if (messages.length === 0) {
    return (
      <section className="message-list empty">
        <div className="empty-state">
          <h3>무엇이 궁금하신가요?</h3>
          <p>질문을 입력하면 로컬 LLM이 답변을 생성해 드립니다.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="message-list">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          isError={message.error}
        />
      ))}

      {isSending ? <div className="typing-indicator">응답 생성 중...</div> : null}
    </section>
  )
}

export default MessageList
