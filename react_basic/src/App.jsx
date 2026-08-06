import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import Header from './components/Header'
import Greeting from './components/ Greeting'
import Counter from './components/Counter'
import InputState from './components/InputState'
import ListRending from './components/ListRending'
import ConditionalRending from './components/ConditionalRending'
import UseEffectRender from './components/UseEffectRender'
import OllamaChat from './components/OllamaChat'

function App() {
  

  return (
    <>
      <h1>안녕 리액트</h1>
      <Header />
      <Greeting name="학습자" />
      <Counter />
      <InputState />
      <ListRending />
      <ConditionalRending />
      <UseEffectRender />
      <OllamaChat />

    </>
  )
}

export default App
