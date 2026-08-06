//rafce 눌러서 자동 완성
// rafce  : react arrow function comfonent export
// rfce   : react function comfonent export

import React from 'react'
//배열데이터
const messages = [ 
    { id: 1, role: "user", content: "안녕하세요." }, 
    { id: 2, role: "assistant", content: "무엇을 도와드릴까요?" }, 
    { id: 3, role: "user", content: "Local LLM 에 대해 알려줘" }, 
    { id: 4, role: "assistant", content: "Local LLM 은 ~~~~" },
  ]; 

const ListRending = () => {
  return (
    <main> 
      <h1>메시지 목록</h1> 
      {messages.map((message) => ( 
        <div key={message.id}> 
          <strong>{message.role}</strong> 
          <p>{message.content}</p> 
        </div> 
      ))} 
    </main>
  )
}

export default ListRending
