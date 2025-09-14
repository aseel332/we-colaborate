import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'  
import Signup from './pages/Signup'
import Project from './pages/Project'
import './App.css'
import Settings from './pages/Settings'
import JoinProject from './pages/JoinProject'
import Members from './pages/Members'
import Branch from './pages/Branch'

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" 
        element={
          localStorage.getItem("token") ? <Navigate to="/home" replace/> : <Navigate to="/login" replace/>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />  
        <Route path="/project/:id"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route path="/project/:id/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/join-project" element={
          <ProtectedRoute>
          <JoinProject />
          </ProtectedRoute>
        } />
        <Route path="/project/:id/members" element={
          <ProtectedRoute>
          <Members />
          </ProtectedRoute>
        } />
        <Route path="/project/:id/branch/:branchId" element={
          <ProtectedRoute>
             <Branch />
          </ProtectedRoute>
        } />
      </Routes>
    </Router> 
  )
}

export default App
