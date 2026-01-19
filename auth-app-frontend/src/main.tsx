import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Services from './pages/Services.tsx';
import About from './pages/About.tsx';
import Userhome from './pages/users/Userhome.js';
import RootLayout from './pages/RootLayout.tsx';
import Userlayout from './pages/users/Userlayout.tsx';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
          <Route index element={<App />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/Services" element={<Services />}/>
          <Route path="/About" element={<About />}/>
          <Route path="/dashboard" element={<Userlayout />}/>
      </Route>
    </Routes>
  </BrowserRouter>,
)
