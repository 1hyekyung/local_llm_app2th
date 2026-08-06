import '../styles/components/MessageBubble.css'

function MessageBubble({ role, content, isError }) {
  const isUser = role === 'user'

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'} ${isError ? 'error' : ''}`}>
      <div className="message-role">{isUser ? '나' : 'AI'}</div>
      <div className="message-content">{content}</div>
    </div>
  )
}

export default MessageBubble
