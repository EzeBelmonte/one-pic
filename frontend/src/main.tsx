import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { ProfileProvider } from './app/providers/ProfileProvider.tsx'
import { PostsProvider } from './app/providers/PostsProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </PostsProvider>
    </AuthProvider>
  </StrictMode>,
)
