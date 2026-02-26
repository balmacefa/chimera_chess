import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Lobby from './pages/Lobby'
import Variants from './pages/Variants'
import CreateRoom from './pages/CreateRoom'
import GameRoom from './pages/GameRoom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lobby />} />
          <Route path="variants" element={<Variants />} />
          <Route path="create-room" element={<CreateRoom />} />
          <Route path="room/:roomId" element={<GameRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
